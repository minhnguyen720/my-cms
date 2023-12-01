import { baseUrlAtom, currentUserAtom } from "@/atoms";
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
import { useParams } from "next/navigation";
import { Folder } from "@/interfaces/Project";
import { getCookie } from "cookies-next";
import { errorNotification, successNotification } from "@/hooks/notifications/notificationPreset";

const CreateNewFolder = ({ updateFolderList }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const baseUrl = useAtomValue(baseUrlAtom);
  const currentUser = useAtomValue(currentUserAtom);
  const { pageId, projectNameId } = useParams();
  const at = getCookie("at");

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
      const newFolderBody = {
        createdUser: currentUser.id,
        updatedUser: currentUser.id,
        name: values.folderName,
        page: pageId,
        project: projectNameId,
        parent: pageId,
      };
      const res: { data: { isSuccess: boolean; latestFolderList: Folder[] } } =
        await axios.post(`${baseUrl}/folder`, newFolderBody, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });

      if (res.data.isSuccess) {
        updateFolderList(res.data.latestFolderList);
        successNotification("Create new folder successfully");
        close();
      } else {
        close();
        errorNotification("Fail to create new folder");
      }
    } catch (error: any) {
      close();
      console.error(error);
      errorNotification("Fail to create new folder");
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
          <TextInput
            label="Folder name"
            {...form.getInputProps("folderName")}
          />
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
