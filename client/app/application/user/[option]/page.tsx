"use client";

import React, { useState } from "react";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { getCookie } from "cookies-next";
import { Button, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useAtom } from "jotai";
import { userAsyncAtom } from "@/components/Navbar";
import { useRouter } from "next/navigation";

const UpdateUser = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [baseUrl] = useGetBaseUrl();
  const at = getCookie("at");
  const form = useForm();
  const [, updateUser] = useAtom(userAsyncAtom);
  const router = useRouter();

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
        <Button
          className="w-fit"
          loading={loading}
          onClick={handleUpdateSecurity}
        >
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
