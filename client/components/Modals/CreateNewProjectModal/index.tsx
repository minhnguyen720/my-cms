import React from "react";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { ActionIcon, Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getFormattedTime } from "@/hooks/utilities/dayjs";
import dayjs from "dayjs";
import useUserData from "@/hooks/utilities/useUser";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";

const CreateNewProjectModal = ({update}) => {
  const [opened, handler] = useDisclosure(false);
  const { getCurrentUser } = useUserData();
  const [baseUrl] = useGetBaseUrl();

  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const handleCreateNewProject = async () => {
    const body = {
      name: form.values.name,
      createdDate: dayjs(),
      updatedDate: dayjs(),
      createdUser: getCurrentUser().id,
      updatedUser: getCurrentUser().id,
      active: true,
      superAdminId: "super admin",
    };
    await axios.post(`${baseUrl}/project`, body);
    await update();
    handler.close();
  };

  const handleOnClose = () => {
    form.reset();
    handler.close();
  };

  const handleOnOpen = () => {
    handler.open();
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        size="50%"
        title="New project"
        onClose={handleOnClose}
      >
        <form>
          <TextInput
            label="Project name"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <Group className="mt-4" position="right">
            <Button onClick={handleCreateNewProject}>Confirm</Button>
            <Button color="red" onClick={handleOnClose}>
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
      <ActionIcon onClick={handleOnOpen}>
        <IconPlus />
      </ActionIcon>
    </>
  );
};

export default CreateNewProjectModal;
