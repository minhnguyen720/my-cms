import { baseUrlAtom } from "@/atoms";
import { MESSAGES } from "@/constant";
import { errorNotification } from "@/hooks/notifications/notificationPreset";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconFilePlus } from "@tabler/icons-react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";

interface Props {
  addDocItem: (doc: any) => void;
}

interface createNewDocDto {
  name: string;
  description: string;
}

const CreateNewDocCard: React.FC<Props> = ({ addDocItem }) => {
  const [opened, { open, close }] = useDisclosure();
  const baseUrl = useAtomValue(baseUrlAtom);
  const { pageId, projectNameId, folderId } = useParams();
  const at = getCookie("at");

  const handleCreateNewDoc = async (values: createNewDocDto) => {
    try {
      const parent = folderId !== null && folderId !== undefined ? folderId : pageId;
      if(parent === undefined) {
        errorNotification(MESSAGES.GENERAL_MESSAGE);
        return;
      }
      const res = await axios.post(
        `${baseUrl}/doc`,
        {
          ...values,
          pageId,
          project: projectNameId,
          parent,
          active: true,
          isRemove: false,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );

      const newDocItem = await res.data;

      addDocItem(newDocItem);
      form.reset();
      close();
    } catch (error) {
      console.error(error);
      close();
    }
  };

  const initialValues = {
    name: "",
    description: "",
  };

  const form = useForm({
    initialValues,
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Create new document"
      >
        <form
          onSubmit={form.onSubmit((values, e) => {
            e.preventDefault();
            handleCreateNewDoc(values);
          })}
        >
          <Stack>
            <TextInput {...form.getInputProps("name")} label="Document name" />
            <TextInput
              {...form.getInputProps("description")}
              label="Description"
            />
            <Group position="right" className="mt-4">
              <Button color="blue" type="submit">
                Create
              </Button>
              <Button color="red" onClick={close}>
                Cancel
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Tooltip label="Create new document">
        <ActionIcon onClick={open}>
          <IconFilePlus />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default CreateNewDocCard;
