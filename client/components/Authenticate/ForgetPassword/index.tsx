import { AuthenticateView } from "@/app/authenticate/page";
import { MESSAGES } from "@/constant";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import {
  Alert,
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

type LocalView = "mail" | "reset" | "confirm";

interface Props {
  setView: React.Dispatch<React.SetStateAction<AuthenticateView>>;
}

const ForgetPassword: React.FC<Props> = ({ setView }) => {
  const { showLoading, hideLoading } = useLoading();
  const at = getCookie("at");
  const [baseUrl] = useGetBaseUrl();
  const [localViewName, setLocalViewName] = useState<LocalView>("mail");
  const [resendWait, setResendWait] = useState<boolean>(false);
  const [validMail, setValidMail] = useState<string>("");
  const mailForm = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
    },
  });
  const resetPassForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      password: (value) =>
        /^\S{10,}$/.test(value)
          ? null
          : "Invalid password. Password must has at least 10 character and can not have whitespace character.",
    },
  });
  const submitCodeForm = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) =>
        value.trim().length === 0 ? "This field cannot be empty" : null,
    },
  });

  useEffect(() => {
    mailForm.reset();
    resetPassForm.reset();
    submitCodeForm.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localViewName]);

  useEffect(() => {
    if (resendWait) {
      setTimeout(() => {
        setResendWait(false);
      }, 30 * 1000);
    }
  }, [resendWait]);

  const handleSubmitCode = async (values: { code: string }) => {
    try {
      showLoading();
      console.log("first");

      const res = await axios.post(`${baseUrl}/auth/submit-code`, {
        code: values.code,
        email: validMail,
      });
      if (res.data.isSuccess) {
        successNotification("Moving to reset form...");
        setLocalViewName("reset");
      } else {
        errorNotification("Wrong code");
      }
    } catch (error) {
      console.error(error);
      mailForm.reset();
      errorNotification("Something went wrong. Please try again");
    } finally {
      hideLoading();
    }
  };

  const resend = async () => {
    setResendWait(true);
    await axios.post(`${baseUrl}/auth/forget/auth-mail`, {
      email: validMail,
    });
  };

  const checkEmail = async (values: { email: string }) => {
    try {
      showLoading();
      const res = await axios.post(`${baseUrl}/auth/forget/auth-email`, values);
      if (res.data.isValid) {
        setValidMail(values.email);
        setLocalViewName("confirm");
      } else {
        errorNotification(
          "The provided email is not match with the email you use to sign up for this account. Please check again.",
          6000,
        );
      }
    } catch (error) {
      console.error(error);
      errorNotification(MESSAGES.GENERAL_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const handleUpdatePassword = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      showLoading();
      const res = await axios.put(`${baseUrl}/auth/reset-pass`, {
        email: validMail,
        password: values.password,
      });

      if (res.data.isSuccess) {
        successNotification("Reset password success");
        setView("signin");
      } else {
        setLocalViewName("mail");
        errorNotification("Reset password failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      errorNotification(MESSAGES.GENERAL_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const localView = {
    mail: (
      <form onSubmit={mailForm.onSubmit((values) => checkEmail(values))}>
        <Stack>
          <UnstyledButton
            onClick={() => {
              setView("signin");
            }}
          >
            <Group>
              <IconArrowLeft />
              <Text>Back to authenticate page</Text>
            </Group>
          </UnstyledButton>
          <Title className="mb-2">Reset password</Title>
          <TextInput
            label={"Email"}
            {...mailForm.getInputProps("email")}
            placeholder="The email you use to signup for this account"
          />
          <Button type="submit" className="w-fit">
            Get reset password code
          </Button>
        </Stack>
      </form>
    ),
    reset: (
      <>
        <Title className="mb-2">Reset password</Title>
        <form
          onSubmit={resetPassForm.onSubmit((values) =>
            handleUpdatePassword(values),
          )}
        >
          <Stack>
            <PasswordInput
              label={"New password"}
              {...resetPassForm.getInputProps("password")}
            />
            <PasswordInput
              label={"Confirm password"}
              {...resetPassForm.getInputProps("confirmPassword")}
            />
            <Button className="w-fit" type="submit">
              Reset password
            </Button>
          </Stack>
        </form>
      </>
    ),
    confirm: (
      <Stack>
        <Box>
          <Title className="mb-2">Last step!</Title>
          <p>Please check your email to get confirmation code</p>
        </Box>
        <form
          onSubmit={submitCodeForm.onSubmit((values) =>
            handleSubmitCode(values),
          )}
        >
          <Stack>
            <TextInput
              placeholder="Confirmation code"
              {...submitCodeForm.getInputProps("code")}
            />
            <Button type="submit" className="w-[40%]">
              Submit code
            </Button>
            {resendWait ? (
              <Text>You can resend try again in 30 seconds</Text>
            ) : (
              <Text>
                Haven&apos;t receive the code yet?
                <a
                  type="button"
                  className="mx-2 text-blue-600 no-underline"
                  onClick={resend}
                >
                  Resend now
                </a>
              </Text>
            )}
          </Stack>
        </form>
      </Stack>
    ),
  };

  return <>{localView[localViewName]}</>;
};

export default ForgetPassword;
