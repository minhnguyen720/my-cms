"use client";

import { errorNotification } from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  Group,
  Anchor,
  PasswordInput,
  Text,
  TextInput,
  Button,
  MantineProvider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

const Login = () => {
  const [baseUrl] = useGetBaseUrl();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: null,
  });

  const updateToken = (value: string) => {
    setToken(value);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/authenticate`, values);
      updateToken(res.data.access_token);

      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": `Bearer ${res.data.access_token}` 
       }
       
       let reqOptions = {
         url: `${baseUrl}/auth/profile`,
         method: "GET",
         headers: headersList,
       }
       
       let response = await axios.request(reqOptions);
       console.log(response.data);
    } catch (error) {
      console.error(error);
      errorNotification(error);
    }
  };

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
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
              <Text
                component="label"
                htmlFor="your-password"
                size="sm"
                fw={500}
              >
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
    </MantineProvider>
  );
};

export default Login;
