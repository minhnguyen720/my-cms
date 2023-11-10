"use client";

import { StandardSchema } from "@/interfaces/StandardSchema";
import { useForm } from "@mantine/form";
import React from "react";
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useAtomValue, useSetAtom } from "jotai";
import { baseUrlAtom, datasourceAtom } from "@/atoms";
import axios from "axios";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { MESSAGES } from "@/constant";
import { ProjectTableItem } from "../page";
import useCurrentProject from "@/hooks/utilities/useCurrentProject";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { getCookie } from "cookies-next";

interface PageFormValues extends StandardSchema {
  project?: string;
  docs: any[];
  docSchema?: any;
  name: string;
  active?: boolean;
}

const CreatingPage = ({ params: { projectNameId } }) => {
  const initialValues: PageFormValues = {
    docs: [],
    project: projectNameId,
    name: "",
    active: true,
  };
  const form = useForm({
    initialValues,
  });
  const baseUrl = useAtomValue(baseUrlAtom);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const setDatasource = useSetAtom(datasourceAtom);
  const params = useParams();

  const backToHome = () => {
    router.push(`/project/${params.projectNameId}`);
  };

  const handleSubmit = async (values: PageFormValues) => {
    try {
      const res: {
        data: {
          success: boolean;
          message: string;
          newProjectData: ProjectTableItem[];
        };
      } = await axios.post(`${baseUrl}/page`, values, {
        headers: {
          Authorization: `Bearer ${getCookie("at")}`,
        },
      });
      if (res.data.success) {
        setDatasource(res.data.newProjectData);
        successNotification(MESSAGES.CREATE_NEW_PAGE.SUCCESS);
        backToHome();
      } else errorNotification(MESSAGES.CREATE_NEW_PAGE.FAIL);
    } catch (error) {
      console.error(error);
      errorNotification(MESSAGES.CREATE_NEW_PAGE.FAIL);
    }
  };

  const handleCancel = () => {
    close();
    backToHome();
  };

  return (
    <div className="p-6">
      <p className="text-[1.5rem] font-bold sm:text-[2.25rem]">
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
            {...form.getInputProps("project")}
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
