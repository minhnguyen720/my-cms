import React from "react";
import {
  Text,
  Button,
  Group,
  Card as MantineCard,
  Menu,
  Box,
  ActionIcon,
  Modal,
} from "@mantine/core";
import { getFormattedTime } from "@/hooks/utilities/dayjs";
import {
  IconTrash,
  IconDots,
  IconFolderSymlink,
  IconCursorText,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { Document } from "@/interfaces/Project";
import MoveToFolderModal from "@/components/Modals/MoveToFolderModal";
import useMoveToFolderModal from "@/components/Modals/MoveToFolderModal/hooks/useMoveToFolderModal";
import { BiHomeAlt } from "react-icons/bi";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IconZzz } from "@tabler/icons-react";
import { TbPlugConnected } from "react-icons/tb";
import OnlineBadge from "@/components/Badge";
import useLoading from "@/hooks/utilities/useLoading";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { errorNotification, successNotification } from "@/hooks/notifications/notificationPreset";

interface Props {
  doc: Document;
  handler: {
    add: (doc: any) => void;
    remove: (docId: string) => void;
    rename: (docId: string, value: string) => void;
    getDocList: () => Document[];
    update: (docList: Document[]) => void;
  };
  updateOpenerData?: any;
}

const DetailItem = ({ label, content }) => {
  return (
    <p>
      <span className="mr-2">{label}:</span>
      {content}
    </p>
  );
};

const Card: React.FC<Props> = ({ doc, handler, updateOpenerData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [baseUrl] = useGetBaseUrl();
  const params = useParams();
  const currentPathname = usePathname();
  const navigator = useRouter();
  const { showLoading, hideLoading } = useLoading();

  const handleDeleteDocument = async () => {
    await axios.delete(`${baseUrl}/doc/${doc._id}`);
    handler.remove(doc._id);
  };

  // Override move doc to folder process to remove moving file from the current UI
  const move = () => {
    const newDocList = handler.getDocList().filter((item) => {
      return item._id !== doc._id;
    });
    handler.update(newDocList);
    handleMove(doc._id, "doc");
  };

  const handleUpdateStatus = async () => {
    try {
      showLoading();

      const res = await axios.put(`${baseUrl}/doc/status`, {
        id: doc._id,
        value: !doc.active,
        parent: doc.parent,
      });

      if (res.data.isSuccess) {
        successNotification("Update status success");
        handler.update(res.data.newDoc);
      } else {
        errorNotification("Fail to update status");
      }
    } catch (error) {
      errorNotification("Fail to update status");
    } finally {
      hideLoading();
    }
  };

  const {
    opened: move2FolderOpened,
    handleCloseModal,
    handleOpenModal,
    fetchedFolders,
    selection,
    handleMove,
    move2FolderSearch,
    move2FolderResetSearch,
    searchValue,
    setSearchValue,
    toggleRow,
    loadingOverlayVisible,
    backToRoot,
  } = useMoveToFolderModal(doc.page);

  const searchProps = {
    searchValue,
    setSearchValue,
    handleSearch: move2FolderSearch,
    handleReset: move2FolderResetSearch,
  };

  return (
    <>
      <MoveToFolderModal
        opened={move2FolderOpened}
        handleCloseModal={handleCloseModal}
        fetchedFolders={fetchedFolders}
        selection={selection}
        handleMove={move}
        toggleRow={toggleRow}
        targetId={doc._id}
        moveType="doc"
        loadingOverlayVisible={loadingOverlayVisible}
        {...searchProps}
      />
      <Modal centered opened={opened} onClose={close} title="System notice">
        <Text>
          Every data relate to this document will be detele, do you want to
          continue
        </Text>
        <Group className="mt-4" position="right">
          <Button onClick={close}>Cancel</Button>
          <Button color="red" onClick={handleDeleteDocument}>
            Proceed
          </Button>
        </Group>
      </Modal>
      <div className="relative">
        <Box className="absolute right-0 top-0 z-50 m-2">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon>
                <IconDots size={"2rem"} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                onClick={() => {
                  handleOpenModal(doc._id, "doc");
                }}
                icon={<IconFolderSymlink size={14} />}
              >
                Move to folder
              </Menu.Item>
              <Menu.Item
                icon={<IconCursorText size={14} />}
                onClick={() => {
                  updateOpenerData(doc);
                }}
              >
                Rename
              </Menu.Item>
              <Menu.Item
                icon={
                  doc.active ? (
                    <IconZzz size={14} />
                  ) : (
                    <TbPlugConnected size={14} />
                  )
                }
                onClick={handleUpdateStatus}
              >
                {doc.active ? "Deactive this document" : "Active this document"}
              </Menu.Item>
              <Menu.Item
                icon={<BiHomeAlt size={14} />}
                onClick={() => {
                  backToRoot(doc._id, "doc");
                  const newDocList = handler.getDocList().filter((item) => {
                    return item._id !== doc._id;
                  });
                  handler.update(newDocList);
                }}
                disabled={doc.parent === params.pageId}
              >
                Move to root
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                icon={<IconTrash size={14} />}
                onClick={open}
              >
                Delete this doc
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
        <MantineCard shadow="sm" padding="lg" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500} className="text-xl">
              {doc.name}
            </Text>
            <OnlineBadge flag={doc.active} />
          </Group>

          <Text size="sm" color="dimmed">
            <DetailItem
              label="Created date"
              content={getFormattedTime(doc.createdDate)}
            />
            <DetailItem label="Created by" content={doc.createdUser} />
            <DetailItem
              label="Last update"
              content={getFormattedTime(doc.updatedDate)}
            />
            <DetailItem label="Update by" content={doc.updatedUser} />
            <DetailItem label="Number of fields" content={doc.fields?.length} />
          </Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {
              navigator.push(`${currentPathname}/detail/${doc._id}`);
            }}
          >
            Go to document detail
          </Button>
        </MantineCard>
      </div>
    </>
  );
};

export default Card;