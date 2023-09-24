import { baseUrlAtom, currentUserAtom } from "@/atoms";
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
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { Folder } from "@/interfaces/Project";

const CreateNewFolder = ({ updateFolderList }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const baseUrl = useAtomValue(baseUrlAtom);
  const { openAlert } = useAlert();
  const currentUser = useAtomValue(currentUserAtom);
  const { docId, id } = useParams();

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
        createdDate: dayjs().toString(),
        updatedDate: dayjs().toString(),
        createdUser: currentUser.id,
        updatedUser: currentUser.id,
        name: values.folderName,
        page: docId,
        project: id,
      };
      const res: { data: { isSuccess: boolean; latestFolderList: Folder[] } } =
        await axios.post(`${baseUrl}/folder`, newFolderBody);

      if (res.data.isSuccess) {
        updateFolderList(res.data.latestFolderList);
        openAlert("Create new folder successfully", ALERT_CODES.SUCCESS);
        close();
      } else {
        close();
        openAlert("Fail to create new folder", ALERT_CODES.ERROR);
      }
    } catch (error) {
      close();
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
