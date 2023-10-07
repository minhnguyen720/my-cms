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
import { DetailItem } from "@/components/DocDetail";
import { getFormattedTime } from "@/hooks/utilities/dayjs";
import {
  IconTrash,
  IconDots,
  IconFolderSymlink,
  IconCursorText,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useAtomValue } from "jotai";
import { baseUrlAtom } from "@/atoms";
import { Document } from "@/interfaces/Project";
import MoveToFolderModal from "@/components/MoveToFolderModal";
import useMoveToFolderModal from "@/components/MoveToFolderModal/hooks/useMoveToFolderModal";

interface Props {
  doc: Document;
  handler: {
    add: (doc: any) => void;
    remove: (docId: string) => void;
    rename: (docId: string, value: string) => void;
  };
  updateOpenerData?: any;
}

const Card: React.FC<Props> = ({ doc, handler, updateOpenerData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const baseUrl = useAtomValue(baseUrlAtom);

  const handleDeleteDocument = async () => {
    await axios.delete(`${baseUrl}/doc/${doc._id}`);
    handler.remove(doc._id);
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
    toggleAll,
    loadingOverlayVisible
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
        handleMove={handleMove}
        toggleRow={toggleRow}
        toggleAll={toggleAll}
        {...searchProps}
        targetId={doc._id}
        moveType="doc"
        loadingOverlayVisible={loadingOverlayVisible}
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
                onClick={() => {handleOpenModal(doc._id,"doc")}}
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

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Go to document detail
          </Button>
        </MantineCard>
      </div>
    </>
  );
};

export default Card;
