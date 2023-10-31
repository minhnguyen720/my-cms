"use client";

import { Text, Modal, Group, Button, Title, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import React from "react";
import useTrashbin from "../../hooks/useTrashbin";

const TrashbinHeader = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { emptyTrashbin } = useTrashbin();

  return (
    <>
      <Modal
        title="Empty trash bin notice"
        centered
        opened={opened}
        onClose={close}
      >
        <Text>
          All data will be delete permanent. Do you want to continue this
          process.
        </Text>
        <Group position="right" className="mt-4">
          <Button onClick={emptyTrashbin}>Confirm</Button>
          <Button color="red" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Title order={2} className="pb-6 pt-3">
        Trash bin
      </Title>
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        color="cyan"
        className="mb-4"
      >
        <div className="block">
          <div>Trash bin will be empty automatically in 30 days</div>
          <div
            className="mr-6 w-fit cursor-pointer font-semibold"
            onClick={open}
          >
            Empty trash
          </div>
        </div>
      </Alert>
    </>
  );
};

export default TrashbinHeader;
