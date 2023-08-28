"use client";

import { StandardSchema } from "@/interfaces/StandardSchema";
import { useForm } from "@mantine/form";
import { v4 } from "uuid";
import React from "react";
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useAtomValue } from "jotai";
import { baseUrlAtom } from "@/atoms";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import useAlert from "@/components/Alert/hooks";
import { ALERT_CODES, MESSAGES } from "@/constant";

interface PageFormValues extends StandardSchema {
  projectId: string;
  docs: any[];
  docSchema?: any;
  name: string;
}

const CreatingPage = ({ params: { id } }) => {
  const initialValues: PageFormValues = {
    id: v4(),
    createdDate: dayjs().format("DD/MM/YYYY"),
    updatedDate: dayjs().format("DD/MM/YYYY"),
    createdUser: "admin",
    updatedUser: "admin",
    docs: [],
    projectId: id,
    name: "",
  };
  const form = useForm({
    initialValues,
  });
  const baseUrl = useAtomValue(baseUrlAtom);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const { openAlert } = useAlert();

  const handleSubmit = async (values: PageFormValues) => {
    try {
      const res: { data: { success: boolean } } = await axios.post(
        `${baseUrl}/page`,
        values
      );
      if (res.data.success) {
        openAlert(MESSAGES.CREATE_NEW_PAGE.SUCCESS, ALERT_CODES.SUCCESS);
        router.back();
      } else {
        openAlert(MESSAGES.CREATE_NEW_PAGE.FAIL, ALERT_CODES.ERROR);
      }
    } catch (error) {
      console.error(error);
      openAlert(MESSAGES.CREATE_NEW_PAGE.FAIL, ALERT_CODES.ERROR);
    }
  };

  const handleCancel = () => {
    close();
    router.back();
  };

  return (
    <div className="p-6">
      <p className="font-bold text-[1.5rem] sm:text-[2.25rem]">
        Creating new page
      </p>
      <form
        onSubmit={form.onSubmit((values, e) => {
          e.preventDefault();
          handleSubmit(values);
        })}
      >
        <Stack>
          <TextInput
            label="Project ID"
            {...form.getInputProps("projectId")}
            disabled
          />
          <TextInput
            label="Created by"
            {...form.getInputProps("createdUser")}
            disabled
          />
          <TextInput
            label="Created date"
            {...form.getInputProps("createdDate")}
            disabled
          />
          <TextInput label="Page name" {...form.getInputProps("name")} />
        </Stack>

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
          <Button color="gray" onClick={open}>
            Cancel
          </Button>
        </Group>
      </form>
      <Modal centered opened={opened} onClose={close} title="Notice">
        Any unsubmit data will be delete. Do you want to continue this process.
        <Group className="py-3" position="right">
          <Button onClick={handleCancel}>Yes</Button>
          <Button color="gray" onClick={close}>
            No
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default CreatingPage;
