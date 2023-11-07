"use client";

import {
  Group,
  Anchor,
  PasswordInput,
  Text,
  TextInput,
  Button,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const Login = () => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
