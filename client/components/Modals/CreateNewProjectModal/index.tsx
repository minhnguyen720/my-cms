/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { ActionIcon, Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import useLoading from "@/hooks/utilities/useLoading";
import { getCookie } from "cookies-next";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";

interface Props {
  updateNewList: () => Promise<void>;
}

type Ref = HTMLDivElement;

const CreateNewProjectModal = forwardRef<Ref, Props>((props, ref) => {
  const { updateNewList } = props;
  const [opened, handler] = useDisclosure(false);
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();

  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const handleCreateNewProject = async () => {
    try {
      showLoading();
      const headers = {
        Accept: "*/*",
        Authorization: `Bearer ${getCookie("at")}`,
      };
      const body = {
        name: form.values.name,
        active: true,
      };
      await axios.post(`${baseUrl}/project`, body, {
        headers: headers,
      });
      await updateNewList();
      handler.close();
      form.reset();
      successNotification("Create new project success");
    } catch (error) {
      handler.close();
      form.reset();
      errorNotification("Create new project failed");
    } finally {
      hideLoading();
    }
  };

  const handleOnClose = () => {
    form.reset();
    handler.close();
  };

  const handleOnOpen = () => {
    handler.open();
  };

  return (
    <div ref={ref}>
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
    </div>
  );
});

export default CreateNewProjectModal;
