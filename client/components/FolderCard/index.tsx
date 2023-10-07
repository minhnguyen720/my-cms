import React from "react";
import {
  IconCursorText,
  IconDots,
  IconFolder,
  IconFolderSymlink,
  IconTrash,
} from "@tabler/icons-react";
import {
  Box,
  Menu,
  ActionIcon,
  Button,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { useForm } from "@mantine/form";
import MoveToFolderModal from "../MoveToFolderModal";
import useMoveToFolderModal from "../MoveToFolderModal/hooks/useMoveToFolderModal";

const FolderCard = ({
  folderName,
  folderId,
  actionHandler,
  renameModal,
  confirmModal
}) => {
  const { docId } = useParams();
  const form = useForm({
    initialValues: {
      renameValue: folderName,
    },
  });

  const {
    opened: move2FolderOpened,
    handleCloseModal,
    handleOpenModal,
    selection,
    handleMove,
    move2FolderSearch,
    setSearchValue,
    searchValue,
    move2FolderResetSearch,
    fetchedFolders,
    toggleRow,
    loadingOverlayVisible,
  } = useMoveToFolderModal(docId);

  //Override moving folder to folder process to update folder list
  const move = () => {
    const newFolderList = actionHandler.getFolderList().filter((item) => {
      return item._id !== folderId;
    });
    actionHandler.update(newFolderList);
    handleMove(folderId, "folder");
  };

  const moveToFolderModalProps = {
    opened: move2FolderOpened,
    handleCloseModal,
    fetchedFolders,
    selection,
    handleMove: move,
    searchValue,
    setSearchValue,
    handleSearch: move2FolderSearch,
    handleReset: move2FolderResetSearch,
    toggleRow,
    moveType: "folder",
    targetId: folderId,
    loadingOverlayVisible,
  };

  return (
    <>
      <MoveToFolderModal {...moveToFolderModalProps} />
      <Modal
        centered
        opened={renameModal.opened}
        onClose={renameModal.handler.close}
        title="System notice"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            actionHandler.rename(values, docId);
          })}
        >
          <TextInput {...form.getInputProps("renameValue")} />
          <Group className="mt-4" position="right">
            <Button onClick={renameModal.handler.close}>Cancel</Button>
            <Button type="submit" color="blue">
              Process
            </Button>
          </Group>
        </form>
      </Modal>
      <Modal
        centered
        opened={confirmModal.opened}
        onClose={confirmModal.handler.close}
        title="System notice"
      >
        <Text>
          Every data relate to this folder will be detele, do you want to
          continue
        </Text>
        <Group className="mt-4" position="right">
          <Button onClick={confirmModal.handler.close}>Cancel</Button>
          <Button
            color="red"
            onClick={() => {
              actionHandler.remove(folderId, docId);
            }}
          >
            Process
          </Button>
        </Group>
      </Modal>
      <div className="relative flex h-full w-full cursor-pointer items-center rounded-md border-2 border-solid border-white p-5 transition-all duration-150 hover:text-white">
        <Box className="absolute right-0 z-[100] mr-4">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon>
                <IconDots size={"2rem"} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                icon={<IconFolderSymlink size={14} />}
                onClick={() => handleOpenModal(folderId, "folder")}
              >
                Move to folder
              </Menu.Item>
              <Menu.Item
                icon={<IconCursorText size={14} />}
                onClick={renameModal.handler.open}
              >
                Rename
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                icon={<IconTrash size={14} />}
                onClick={confirmModal.handler.open}
              >
                Delete this folder
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>

        <IconFolder size={"2rem"} />
        <div className="px-5">
          <p className="text-md">{folderName}</p>
        </div>
      </div>
    </>
  );
};

export default FolderCard;
