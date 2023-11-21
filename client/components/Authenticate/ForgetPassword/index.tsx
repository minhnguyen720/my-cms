import { errorNotification } from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { getCookie } from "cookies-next";
import React from "react";

const ForgetPassword = ({ setView }) => {
  const { showLoading, hideLoading } = useLoading();
  const at = getCookie("at");
  const [baseUrl] = useGetBaseUrl();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
    },
  });

  const checkEmail = async (values) => {
    try {
      showLoading();
      const res = await axios.post(`${baseUrl}/auth/forget/auth-email`, values);
    } catch (error) {
      console.error(error);
      errorNotification("Something went wrong");
    } finally {
      hideLoading();
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => checkEmail(values))}>
      <TextInput />
    </form>
  );
};

export default ForgetPassword;
