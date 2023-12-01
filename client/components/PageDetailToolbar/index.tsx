"use client";

import { Page } from "@/interfaces/Project";
import {
  Group,
  Tooltip,
  ActionIcon,
  Title,
  Modal,
  Text,
  Button,
  Stack,
  Box,
  UnstyledButton,
} from "@mantine/core";
import { IconZzz, IconTrash, IconArrowLeft } from "@tabler/icons-react";
import { TbPlugConnected } from "react-icons/tb";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import OnlineBadge from "../Badge";
import { useBackToPage, useMoveToTrash, useUpdateStatus } from "./hooks";

interface Props {
  page: Page;
}

const PageDetailToolbar: React.FC<Props> = ({ page }) => {
  const [deleteOpened, deleteHandler] = useDisclosure(false);
  const { pageStatus, updateOpened, updateHandler, handleUpdateStatus } =
    useUpdateStatus(page);
  const { handleMoveToTrashBin } = useMoveToTrash();
  const { backToPageOverall } = useBackToPage();

  return (
    <>
      <UnstyledButton
        className="mb-5 text-lg font-bold"
        onClick={backToPageOverall}
      >
        <Group>
          <IconArrowLeft />
          <Text>Back to page overall</Text>
        </Group>
      </UnstyledButton>
      <Modal
        centered
        title="Update status confirmation"
        opened={updateOpened}
        onClose={() => {
          updateHandler.close();
        }}
      >
        <Text>
          Do you want to {pageStatus ? "deactive" : "active"} this page
        </Text>
        <Group position="right" className="mt-6">
          <Button onClick={handleUpdateStatus}>Confirm</Button>
          <Button
            color="red"
            onClick={() => {
              updateHandler.close();
            }}
          >
            Cancel
          </Button>
        </Group>
      </Modal>
      <Modal
        centered
        title="Delete confirmation"
        opened={deleteOpened}
        onClose={() => {
          deleteHandler.close();
        }}
      >
        <Text>
          Do you want to {page.active ? "deactive" : "active"} this page
        </Text>
        <Group position="right" className="mt-6">
          <Button onClick={handleMoveToTrashBin}>Confirm</Button>
          <Button
            color="red"
            onClick={() => {
              deleteHandler.close();
            }}
          >
            Cancel
          </Button>
        </Group>
      </Modal>
      <Stack className="w-fit">
        <Box>
          <OnlineBadge flag={page.active} />
        </Box>
        <Title order={1}>Page detail</Title>
      </Stack>
      <Group className="py-8">
        {pageStatus ? (
          <Tooltip label="Deactive this page">
            <ActionIcon onClick={updateHandler.open}>
              <IconZzz size={24} />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Active this page">
            <ActionIcon onClick={updateHandler.open}>
              <TbPlugConnected size={24} />
            </ActionIcon>
          </Tooltip>
        )}
        <Tooltip label="Delete this page">
          <ActionIcon onClick={deleteHandler.open}>
            <IconTrash size={24} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </>
  );
};

export default PageDetailToolbar;
