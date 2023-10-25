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
} from "@mantine/core";
import { IconZzz, IconTrash } from "@tabler/icons-react";
import { TbPlugConnected } from "react-icons/tb";
import React, { useState } from "react";
import useLoading from "@/hooks/utilities/useLoading";
import useAlert from "../Alert/hooks";
import { ALERT_CODES } from "@/constant";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  page: Page;
}

const PageDetailToolbar: React.FC<Props> = ({ page }) => {
  const { showLoading, hideLoading } = useLoading();
  const { openAlert } = useAlert();
  const [pageStatus, setPageStatus] = useState<boolean>(page.active);
  const [baseUrl] = useGetBaseUrl();
  const [updateOpened, updateHandler] = useDisclosure(false);
  const [deleteOpened, deleteHandler] = useDisclosure(false);

  const handleUpdateStatus = async () => {
    try {
      showLoading();
      const res = await axios.put(`${baseUrl}/page/status`, {
        id: page._id,
        value: !page.active,
        projectId: page.project,
      });
      if (res.data.isSuccess) {
        setPageStatus((prev) => {
          return !prev;
        });
        openAlert("Update status success", ALERT_CODES.SUCCESS);
      } else {
        openAlert("Update status failed", ALERT_CODES.ERROR);
      }
      updateHandler.close();
    } catch (error) {
      openAlert("Update status failed", ALERT_CODES.ERROR);
    } finally {
      hideLoading();
    }
  };

  const handleMoveToTrashBin = async () => {
    try {
      showLoading();

      const res = await axios.put(`${baseUrl}/page/movetotrash`);

      if (res.data.isSuccess) {
        openAlert("Delete page successfully", ALERT_CODES.SUCCESS);
      } else {
        openAlert("Fail to delete this page", ALERT_CODES.ERROR);
      }
    } catch (error) {
      openAlert("Fail to delete this page", ALERT_CODES.ERROR);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
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
      <Title order={1}>Page detail</Title>
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
