import {
  Box,
  Button,
  Center,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { useState } from "react";

const SignupConfirm = ({ signupData, setView }) => {
  const [baseUrl] = useGetBaseUrl();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) =>
        value.trim().length === 0 ? "This field cannot be empty" : null,
    },
  });

  const handleSubmitCode = async (values) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${baseUrl}/auth/submit-code`, {
        code: values.code,
        email: signupData.email,
      });
      if (res.data.isSuccess) {
        const signupRes = await axios.post(
          `${baseUrl}/auth/signup`,
          signupData,
        );
        if (signupRes.data.isSuccess) {
          successNotification("Sign up successfully", 3000);
          form.reset();
          setView("signin");
        }
      } else {
        errorNotification("Wrong code");
      }
    } catch (error) {
      console.error(error);
      form.reset();
      errorNotification("Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const view = {
    form: (
      <Stack>
        <Box>
          <Title className="mb-2">Last step!</Title>
          <p>Please check your email to get confirmation code</p>
        </Box>
        <form onSubmit={form.onSubmit((values) => handleSubmitCode(values))}>
          <Stack>
            <TextInput
              placeholder="Confirmation code"
              {...form.getInputProps("code")}
            />
            <Button type="submit" className="w-[40%]">
              Submit code
            </Button>
            <Text>
              Haven&apos;t receive the code yet?
              <Link href="#" className="mx-2 text-blue-600 no-underline">
                Resend now
              </Link>
            </Text>
          </Stack>
        </form>
      </Stack>
    ),
    loading: (
      <Center className="h-screen">
        <Loader variant="bars" />
      </Center>
    ),
  };

  return <>{isLoading ? view.loading : view.form}</>;
};

export default SignupConfirm;
