import { Modal, Group, Button, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings2, IconUpload } from "@tabler/icons-react";
import React from "react";
import FieldControlSwitch from "../FieldControlSwitch";

const Config = ({ required, active }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="w-fit">
      <Modal opened={opened} onClose={close} title="Field controller">
        <FieldControlSwitch
          controlFlags={{
            required: required,
            active: !active,
          }}
          isVisible
        />

        <Group position="right" className="mt-8">
          <Button>Apply</Button>
          <Button color="red" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <ActionIcon onClick={open}>
        <IconSettings2 />
      </ActionIcon>
    </div>
  );
};

export default Config;
