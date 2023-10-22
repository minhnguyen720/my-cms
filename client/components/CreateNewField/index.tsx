import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Modal,
  Select,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { IconPlus } from "@tabler/icons-react";

const CreateNewField = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      type: "",
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleOnClose}
        size="50%"
        title="Create new field"
        centered
      >
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
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
                  { label: "image", value: "image" },
                  { label: "imageText", value: "imageText" },
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
          </Grid>
          <Group position="right" className="mt-8">
            <Button type="submit">Create</Button>
            <Button color="red" onClick={handleOnClose}>Cancel</Button>
          </Group>
        </form>
      </Modal>
      <Tooltip label="Create new field">
        <ActionIcon onClick={handleOnOpen} color="blue">
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default CreateNewField;
