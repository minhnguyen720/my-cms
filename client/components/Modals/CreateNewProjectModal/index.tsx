/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { ActionIcon, Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import useUserData from "@/hooks/utilities/useUser";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import useLoading from "@/hooks/utilities/useLoading";
import { ALERT_CODES } from "@/constant";
import useAlert from "@/components/Alert/hooks";

interface Props {
  updateNewList: () => Promise<void>;
}

type Ref = HTMLDivElement;

const CreateNewProjectModal = forwardRef<Ref, Props>((props, ref) => {
  const { updateNewList } = props;
  const [opened, handler] = useDisclosure(false);
  const { getCurrentUser } = useUserData();
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();
  const { openAlert } = useAlert();

  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const handleCreateNewProject = async () => {
    try {
      showLoading();
      const body = {
        name: form.values.name,
        createdUser: getCurrentUser().id,
        updatedUser: getCurrentUser().id,
        active: true,
        superAdminId: "super admin",
      };
      await axios.post(`${baseUrl}/project`, body);
      await updateNewList();
      handler.close();
      form.reset();
      openAlert("Create new project success", ALERT_CODES.SUCCESS);
    } catch (error) {
      handler.close();
      form.reset();
      openAlert("Create new project failed", ALERT_CODES.ERROR);
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
