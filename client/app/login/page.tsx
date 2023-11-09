"use client";

import { errorNotification } from "@/hooks/notifications/notificationPreset";
import useTokens from "@/hooks/tokens/useTokens";
import { useUser } from "@/hooks/user/useUser";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  Group,
  Anchor,
  PasswordInput,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const [baseUrl] = useGetBaseUrl();
  const userHanlder = useUser();
  const tokenHandler = useTokens();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/signin`, values);
      tokenHandler.assignAt(res.data.access_token);
      tokenHandler.assignRt(res.data.refresh_token);

      if (res.data.isFalse) throw res.data.message;

      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${res.data.access_token}`,
      };

      let reqOptions = {
        url: `${baseUrl}/auth/profile`,
        method: "GET",
        headers: headersList,
      };

      const user = await axios.request(reqOptions);
      if (user.data.isFalse) throw user.data.message;

      userHanlder.asignUser(user.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      errorNotification(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <div
        className="absolute left-1/2 top-1/2 w-[30%]"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
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

            <Anchor
              href="#"
              onClick={(event) => event.preventDefault()}
              pt={2}
              fw={500}
              fz="xs"
            >
              Forgot your password?
            </Anchor>
          </Group>
          <PasswordInput
            placeholder="Your password"
            id="your-password"
            {...form.getInputProps("password")}
          />
        </div>
        <Button type="submit" className="mt-5">
          Log in
        </Button>
      </div>
    </form>
  );
};

export default Login;
