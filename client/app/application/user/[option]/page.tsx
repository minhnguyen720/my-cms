"use client";

import React, { useEffect, useState } from "react";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { getCookie } from "cookies-next";
import {
  Box,
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { useForm, zodResolver } from "@mantine/form";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import { userAsyncAtom, userAtom } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { z } from "zod";

const UpdateUser = ({ params }) => {
  // const schema = z.object({
  //   name: z
  //     .string()
  //     .min(5, { message: "Name should have at least 2 letters" })
  //     .max(20, { message: "Name has at most 20 letters" }),
  //   email: z.string().email({ message: "Invalid email" }),
  //   password: z
  //     .string()
  //     .min(5, {
  //       message:
  //         "Invalid password. Password must has length from 5 to 30 character and can not have whitespace character.",
  //     })
  //     .max(30, {
  //       message:
  //         "Invalid password. Password must has length from 5 to 30 character and can not have whitespace character.",
  //     }),
  // });
  const [loading, setLoading] = useState<boolean>(false);
  const [baseUrl] = useGetBaseUrl();
  const at = getCookie("at");
  const form = useForm({
    // validate: zodResolver(schema),
  });
  const [, updateUser] = useAtom(userAsyncAtom);
  const router = useRouter();
  const [resendWait, setResendWait] = useState<boolean>(false);
  const user = useAtomValue(userAtom);
  const [viewName, setViewName] = useState(params.option);

  useEffect(() => {
    if (resendWait) {
      setTimeout(() => {
        setResendWait(false);
      }, 30 * 1000);
    }
  }, [resendWait]);

  const emailConfirmForm = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) =>
        value.trim().length === 0 ? "This field cannot be empty" : null,
    },
  });

  const handleUpdateSecurity = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${baseUrl}/users/update/${params.option}`,
        form.values,
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );

      if (res.data.isSuccess) {
        successNotification(`Update your ${params.option} success`);
        updateUser();
        router.push("/application/user");
      } else
        errorNotification(
          res.data.message.length > 0
            ? res.data.message
            : `Fail to update your new ${params.option}. Please try again.`,
        );
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleUpdateMail = async () => {
    try {
      if (typeof user === "boolean") return;
      setViewName("confirm");
      await axios.post(`${baseUrl}/auth/request-code`, {
        name: user.name,
        email: form.values.newEmail,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitCode = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${baseUrl}/auth/submit-code`, {
        code: emailConfirmForm.values.code,
        email: form.values.newEmail,
      });
      if (res.data.isSuccess) {
        await handleUpdateSecurity();
      } else {
        errorNotification("Wrong code");
      }
    } catch (error) {
      console.error(error);
      emailConfirmForm.reset();
      errorNotification("Something went wrong. Please try again");
    }
  };

  const resend = async () => {
    if (typeof user === "boolean") return;
    setResendWait(true);
    await axios.post(`${baseUrl}/auth/request-code`, {
      name: user.name,
      email: form.values.newEmail,
    });
  };

  const views = {
    name: (
      <Stack className="mx-auto w-1/2">
        <TextInput label="New name" {...form.getInputProps("name")} />
        <PasswordInput
          label="Your password"
          {...form.getInputProps("password")}
        />
        <Button
          className="w-fit"
          loading={loading}
          onClick={handleUpdateSecurity}
        >
          Update
        </Button>
      </Stack>
    ),
    password: (
      <Stack className="mx-auto w-1/2">
        <PasswordInput
          label="Current password"
          {...form.getInputProps("currentPassword")}
        />
        <PasswordInput
          label="New password"
          {...form.getInputProps("newPassword")}
        />
        <Button
          className="w-fit"
          loading={loading}
          onClick={handleUpdateSecurity}
        >
          Update
        </Button>
      </Stack>
    ),
    email: (
      <Stack className="mx-auto w-1/2">
        <TextInput
          label="Current email"
          {...form.getInputProps("currentEmail")}
        />
        <TextInput label="New email" {...form.getInputProps("newEmail")} />
        <PasswordInput
          label="Your password"
          {...form.getInputProps("password")}
        />
        <Button className="w-fit" loading={loading} onClick={handleUpdateMail}>
          Update
        </Button>
      </Stack>
    ),
    confirm: (
      <Stack className="mx-auto w-1/2">
        <Box>
          <Title className="mb-2">Last step!</Title>
          <p>Please check your email to get confirmation code</p>
        </Box>
        <form>
          <Stack>
            <TextInput
              placeholder="Confirmation code"
              {...emailConfirmForm.getInputProps("code")}
            />
            <Button onClick={handleSubmitCode} className="w-[40%]">
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

  return (
    <div>
      <Title className="mx-auto w-1/2 py-5">Security update</Title>
      <form>{views[viewName]}</form>
    </div>
  );
};

export default UpdateUser;
