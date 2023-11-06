import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Modal,
  Select,
  Switch,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { IconPlus } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import useLoading from "@/hooks/utilities/useLoading";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { MESSAGES } from "@/constant";
import { FieldHandler } from "../hooks/useFields";

interface Props {
  fieldHandler: FieldHandler;
}

const CreateNewField: React.FC<Props> = ({ fieldHandler }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const params = useParams();
  const { showLoading, hideLoading } = useLoading();
  const [baseUrl] = useGetBaseUrl();

  const form = useForm({
    initialValues: {
      name: "",
      type: "",
      required: false,
      useEditor: false,
    },
    validate: {
      name: (value) =>
        (value.length === 0 ? "Name must not be empty" : null) ||
        (value.length > 150 ? "Reach maximum name length" : null),
      type: (value) =>
        value.length === 0 ? "Must select a type for this new field" : null,
    },
  });

  const handleOnClose = () => {
    close();
    form.reset();
  };

  const handleOnOpen = () => {
    open();
  };

  const handleCreateField = async (values) => {
    try {
      showLoading();
      const body = {
        ...values,
        doc: params.detailId,
      };

      const res = await axios.post(`${baseUrl}/fields/new`, body);

      if (res.data.isSuccess) {
        successNotification(MESSAGES.CREATE_ITEM.SUCCESS);
        fieldHandler.updateFields(res.data.newList);
      } else {
        errorNotification(MESSAGES.CREATE_ITEM.FAIL);
      }
    } catch (error) {
      handleOnClose();
      errorNotification(MESSAGES.CREATE_ITEM.SUCCESS);
      console.error(error);
    } finally {
      hideLoading();
      handleOnClose();
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleOnClose}
        size="60%"
        title="Create new field"
        centered
      >
        <form
          onSubmit={form.onSubmit((values) => handleCreateField(values))}
          className="pt-4"
        >
          <Grid>
            <Grid.Col span={12}>
              <TextInput label="Field name" {...form.getInputProps("name")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                {...form.getInputProps("type")}
                label="Field type"
                placeholder="Pick one"
                data={[
                  { label: "Long text", value: "longText" },
                  { label: "Short text", value: "shortText" },
                  { label: "Image", value: "image" },
                  // { label: "imageText", value: "imageText" },
                ]}
                dropdownPosition="bottom"
                nothingFound="Nobody here"
                filter={(value, item) =>
                  item.label.toLowerCase().includes(value.toLowerCase().trim())
                }
                maxDropdownHeight={400}
                searchable
              />
            </Grid.Col>
            <Grid.Col>
              <Switch
                label="Does this field is required"
                {...form.getInputProps("required")}
              />
            </Grid.Col>
            {form.values.type !== "image" && (
              <Grid.Col>
                <Switch
                  label="Use editor"
                  {...form.getInputProps("useEditor")}
                />
              </Grid.Col>
            )}
          </Grid>
          <Group position="right" className="mt-8">
            <Button variant="light" type="submit">
              Create
            </Button>
            <Button variant="light" color="red" onClick={handleOnClose}>
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
      <Tooltip label="Create new field">
        <ActionIcon onClick={handleOnOpen}>
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default CreateNewField;
