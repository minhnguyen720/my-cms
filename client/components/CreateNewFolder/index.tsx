import { baseUrlAtom } from "@/atoms";
import { ALERT_CODES } from "@/constant";
import {
  Modal,
  TextInput,
  Group,
  Button,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconFolderPlus } from "@tabler/icons-react";
import axios from "axios";
import { useAtomValue } from "jotai";
import React from "react";
import useAlert from "../Alert/hooks";

const CreateNewFolder = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const baseUrl = useAtomValue(baseUrlAtom);
  const { openAlert } = useAlert();

  const initialValues: {
    folderName: string;
  } = {
    folderName: "",
  };
  const form = useForm({
    initialValues,
  });

  const handleCreateNewFolder = async (values: { folderName: string }) => {
    try {
      const res = await axios.post(`${baseUrl}/folder`, values);
      if (res.data.isSuccess) {
        openAlert("Create new folder successfully", ALERT_CODES.SUCCESS);
      } else {
        openAlert("Fail to create new folder", ALERT_CODES.ERROR);
      }
    } catch (error) {
      openAlert(error, ALERT_CODES.ERROR);
    }
  };

  const handleCancel = () => {
    close();
    form.reset();
  };

  return (
    <>
      <Modal title="Create new folder" opened={opened} onClose={close} centered>
        <form
          onSubmit={form.onSubmit((values) => {
            handleCreateNewFolder(values);
          })}
        >
          <TextInput label="Folder name" />
          <Group position="right" className="mt-4">
            <Button type="submit">Create</Button>
            <Button color="red" onClick={handleCancel}>
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
      <Tooltip label="Create new folder">
        <ActionIcon onClick={open}>
          <IconFolderPlus />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default CreateNewFolder;
