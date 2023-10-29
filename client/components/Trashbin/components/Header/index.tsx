"use client";

import useLoading from "@/hooks/utilities/useLoading";
import { Text, Modal, Group, Button, Title, Alert } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import React from "react";
import useTrashbin from "../../hooks/useTrashbin";
import useAlert from "@/components/Alert/hooks";
import { ALERT_CODES } from "@/constant";

const TrashbinHeader = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { showLoading, hideLoading } = useLoading();
  const { width } = useViewportSize();
  const { emptyTrashbin } = useTrashbin();
  const { openAlert } = useAlert();

  const handleEmptyTrashBin = async () => {
    try {
      showLoading();
      emptyTrashbin();
      close();
    } catch (error) {
      openAlert(error, ALERT_CODES.ERROR);
    } finally {
      hideLoading();
    }
  };

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
          <Button onClick={handleEmptyTrashBin}>Confirm</Button>
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
        <div className={width < 768 ? "block" : "flex justify-between"}>
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
