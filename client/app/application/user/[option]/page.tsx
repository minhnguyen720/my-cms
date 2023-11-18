"use client";

import React, { useMemo, useState } from "react";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { getCookie } from "cookies-next";
import {
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { errorNotification } from "@/hooks/notifications/notificationPreset";
import { useAtomValue } from "jotai";
import { loadableUserAtom } from "@/components/Navbar";
import { useForm } from "@mantine/form";

const UpdateUser = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [baseUrl] = useGetBaseUrl();
  const at = getCookie("at");
  const user = useAtomValue(loadableUserAtom);
  const form = useForm();

  const handleChangeName = () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
      errorNotification("Fail to update your new name. Please try again.");
    } finally {
      form.reset();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleChangePassword = () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
      errorNotification("Fail to update your new password. Please try again.");
    } finally {
      form.reset();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleChangeEmail = () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
      errorNotification("Fail to update your new email. Please try again.");
    } finally {
      form.reset();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const views = {
    name: (
      <Stack className="mx-auto w-1/2">
        <TextInput label="New name" {...form.getInputProps("name")} />
        <Button className="w-fit" loading={loading} onClick={handleChangeName}>
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
          onClick={handleChangePassword}
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
        <Button className="w-fit" loading={loading} onClick={handleChangeEmail}>
          Update
        </Button>
      </Stack>
    ),
  };

  return (
    <div>
      <Title className="mx-auto w-1/2 py-5">Security update</Title>
      <form>{views[params.option]}</form>
    </div>
  );
};

export default UpdateUser;
