"use client";

import { errorNotification } from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  TextInput,
  Group,
  Anchor,
  PasswordInput,
  Button,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import Link from "next/link";

export const Signin = ({ setView }) => {
  const [baseUrl] = useGetBaseUrl();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.trim().length > 0 ? null : "This field cannot be empty",
      password: (value) =>
        value.trim().length > 0 ? null : "This field cannot be empty",
    },
  });

  const handleSubmit = async (values) => {
    try {
      setView("loading");
      const res = await axios.post(`${baseUrl}/auth/signin`, values);

      if (res.data.isFalse) throw res.data.message;
      setCookie("at", res.data.access_token);

      router.push("/application/dashboard");
    } catch (error: any) {
      console.error(error);
      deleteCookie("at");
      setView("signin");
      errorNotification("Something went wrong. Please try again");
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        label="Username"
        placeholder="Your username"
        className="mb-5"
        {...form.getInputProps("username")}
      />
      <div>
        <Group className="flex justify-between" mb={3}>
          <Text component="label" htmlFor="your-password" size="sm" fw={500}>
            Your password
          </Text>

          <Text
            className="cursor-pointer text-sm text-cyan-400"
            onClick={() => {
              setView("forget");
            }}
          >
            Forgot your password?
          </Text>
        </Group>
        <PasswordInput
          placeholder="Your password"
          id="your-password"
          {...form.getInputProps("password")}
        />
      </div>
      <Button type="submit" className="mt-5">
        Sign in
      </Button>
    </form>
  );
};
