"use client";

import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
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

export const Signup = () => {
  const [baseUrl] = useGetBaseUrl();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        /^[^\s]{5,20}$/.test(value)
          ? null
          : "Invalid username. Username has length from 5 to 20 character and must not have whitespace character.",
      password: (value) =>
        /^[^\s]{5,30}$/.test(value)
          ? null
          : "Invalid password. Password must has length from 5 to 30 character and can not have whitespace character.",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/signup`, values);

      if (!res.data.isSuccess) throw res.data.message;

      successNotification(
        "Sign up successfully. Please move to the sign in tab to continue.",
        3000,
      );
    } catch (error: any) {
      console.error(error);
      errorNotification(error);
    } finally {
      form.reset();
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
      <PasswordInput
        label="Password"
        placeholder="Your password"
        id="your-password"
        {...form.getInputProps("password")}
      />
      <Button type="submit" className="mt-5">
        Sign up
      </Button>
    </form>
  );
};
