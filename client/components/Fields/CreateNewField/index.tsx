import {
  ActionIcon,
  Alert,
  Button,
  Grid,
  Group,
  Modal,
  Paper,
  Select,
  Switch,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
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
import { getCookie } from "cookies-next";

interface Props {
  fieldHandler: FieldHandler;
}

const CreateNewField: React.FC<Props> = ({ fieldHandler }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const params = useParams();
  const { showLoading, hideLoading } = useLoading();
  const [baseUrl] = useGetBaseUrl();
  const at = getCookie("at");

  const form = useForm({
    initialValues: {
      name: "",
      type: "",
      fieldId: "",
    },
    validate: {
      name: (value) =>
        (value.length === 0 ? "Name must not be empty" : null) ||
        (value.length > 150 ? "Reach maximum name length" : null),
      type: (value) =>
        value.length === 0 ? "Must select a type for this new field" : null,
      fieldId: (value) =>
        /^[a-zA-Z0-9_]{5,40}$/.test(value) ? null : "Invalid field id",
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
        project: params.projectNameId,
        page: params.pageId,
      };

      const res = await axios.post(`${baseUrl}/fields/new`, body, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });

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
              <Select
                {...form.getInputProps("type")}
                label="Field type"
                placeholder="Pick one"
                data={[
                  { label: "Editor", value: "longText" },
                  // { label: "Short text", value: "shortText" },
                  { label: "Image", value: "image" },
                  // { label: "imageText", value: "imageText" },
                ]}
                dropdownPosition="bottom"
                nothingFound="Nothing here"
                maxDropdownHeight={400}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput label="Field name" {...form.getInputProps("name")} />
            </Grid.Col>
            <Alert
              className="ml-2 mt-3"
              icon={<IconAlertCircle size="1rem" />}
              title="Notice for field id"
            >
              <Text>Your field id must has 5 to 30 characters</Text>
              <Text>
                The field id must follow the following structure:{" "}
                {/^[a-zA-Z0-9_]{5,20}$/.toString()}
              </Text>
              <Text className="font-semibold">Example</Text>
              <Text>❌ hello world</Text>
              <Text>✅ hello_world</Text>
            </Alert>
            <Grid.Col span={12}>
              <TextInput
                label="Field id"
                {...form.getInputProps("fieldId")}
                placeholder="The name you use to get this data at your project"
              />
            </Grid.Col>
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
