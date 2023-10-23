import { baseUrlAtom } from "@/atoms";
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
import dayjs from "dayjs";
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
  const { pageId } = useParams();

  const handleCreateNewDoc = async (values: createNewDocDto) => {
    try {
      const res = await axios.post(`${baseUrl}/doc`, {
        ...values,
        createdDate: dayjs().toString(),
        updatedDate: dayjs().toString(),
        pageId,
        parent: pageId,
        active: true,
      });

      const {
        _id,
        name,
        updatedDate,
        createdDate,
        updatedUser,
        createdUser,
        fields,
        active,
        page,
        description,
      } = await res.data;

      addDocItem({
        id: _id,
        name,
        updatedDate,
        createdDate,
        updatedUser,
        createdUser,
        fields,
        active,
        page,
        description,
      });
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
