"use client";

import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { TextInput, PasswordInput, Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

export const Signup = () => {
  const [baseUrl] = useGetBaseUrl();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      gender: "",
      name: "",
      email: "",
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
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
      name: (value) =>
        /^[a-zA-Z]{5,20}$/.test(value)
          ? null
          : "Invalid name. Your name has length from 5 to 20 character.",
      gender: (value) =>
        value.length === 0 ? "This field cannot be empty" : null,
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
        label="Your name"
        placeholder="What we should call you?"
        className="mb-5"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Username"
        placeholder="You will sign in with this one"
        className="mb-5"
        {...form.getInputProps("username")}
      />
      <TextInput
        label="Email"
        placeholder="Your email"
        className="mb-5"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        id="your-password"
        className="mb-5"
        {...form.getInputProps("password")}
      />
      <Select
        label="Gender"
        data={[
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
          {
            value: "other",
            label: "Other",
          },
        ]}
        className="mb-5"
        {...form.getInputProps("gender")}
      />
      <Button type="submit">Sign up</Button>
    </form>
  );
};
