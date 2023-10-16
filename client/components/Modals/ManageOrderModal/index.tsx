import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import DetailDraggable from "@/components/DetailDraggable";
import { AiOutlineUnorderedList } from "react-icons/ai";

const ManageOrderModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleOnClose = () => {
    close();
  };

  const handleOnOpen = () => {
    open();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleOnClose} size={"90%"}>
        <DetailDraggable />
      </Modal>
      <Tooltip label="Manage field order">
        <ActionIcon onClick={handleOnOpen} color="blue">
          <AiOutlineUnorderedList />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default ManageOrderModal;
