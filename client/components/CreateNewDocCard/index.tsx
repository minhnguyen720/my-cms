import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { SetStateAction } from "jotai";

interface Props {
  setDocList: React.Dispatch<SetStateAction<any>>;
}

interface createNewDocDto {
  name: string;
  description: string;
}

const CreateNewDocCard: React.FC<Props> = ({ setDocList }) => {
  const [opened, { open, close }] = useDisclosure();

  const handleCreateNewDoc = async (values: createNewDocDto) => {
    console.log(values);
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
              <Button color="red">Cancel</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <div
        className={
          "w-full h-full rounded-sm border-4 border-dashed border-gray-600"
        }
      >
        <ActionIcon className="w-full h-full" onClick={open}>
          <IconPlus size={"2.25rem"} className="text-gray-600" />
        </ActionIcon>
      </div>
    </>
  );
};

export default CreateNewDocCard;
