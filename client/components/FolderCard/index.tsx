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
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useParams } from "next/navigation";
import useAlert from "../Alert/hooks";
import { ALERT_CODES } from "@/constant";
import { Folder } from "@/interfaces/Project";
import { useForm } from "@mantine/form";
import MoveToFolderModal from "../MoveToFolderModal";
import useMoveToFolderModal from "../MoveToFolderModal/hooks/useMoveToFolderModal";

const FolderCard = ({ folderName, updateFolderList, folderId }) => {
  const [opened, handler] = useDisclosure(false);
  const [baseUrl] = useGetBaseUrl();
  const { docId } = useParams();
  const { openAlert } = useAlert();
  const [renameOpened, renameHandler] = useDisclosure(false);
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
    toggleAll,
    loadingOverlayVisible
  } = useMoveToFolderModal(docId);

  const moveToFolderModalProps = {
    opened: move2FolderOpened,
    handleCloseModal,
    fetchedFolders,
    selection,
    handleMove,
    searchValue,
    setSearchValue,
    handleSearch: move2FolderSearch,
    handleReset: move2FolderResetSearch,
    toggleRow,
    toggleAll,
    moveType: "folder",
    targetId: folderId,
    loadingOverlayVisible
  };

  const handleDeleteFolder = async () => {
    try {
      const res: {
        data: { isSuccess: boolean; latestFolderList: Folder[] | undefined };
      } = await axios.delete(`${baseUrl}/folder/${folderId}/${docId}`);
      if (res.data.isSuccess) {
        openAlert("Delete folder success", ALERT_CODES.SUCCESS);
        updateFolderList(res.data.latestFolderList);
        handler.close();
      } else {
        openAlert("Delete folder fail", ALERT_CODES.ERROR);
        handler.close();
      }
    } catch (error) {
      console.error(error);
      openAlert("Delete folder fail", ALERT_CODES.ERROR);
      handler.close();
    }
  };

  const handleRenameFolder = async (values) => {
    try {
      const body = {
        folderId: folderId,
        name: values.renameValue,
        pageId: docId,
      };
      const res: {
        data: { isSuccess: boolean; latestFolderList: Folder[] | undefined };
      } = await axios.put(`${baseUrl}/folder/rename`, body);
      if (res.data.isSuccess) {
        openAlert("Rename folder success", ALERT_CODES.SUCCESS);
        await updateFolderList(res.data.latestFolderList);
        renameHandler.close();
      } else {
        openAlert("Rename folder fail", ALERT_CODES.ERROR);
        renameHandler.close();
      }
    } catch (error) {
      console.error(error);
      openAlert("Rename folder fail", ALERT_CODES.ERROR);
      renameHandler.close();
    }
  };

  return (
    <>
      <MoveToFolderModal {...moveToFolderModalProps} />
      <Modal
        centered
        opened={renameOpened}
        onClose={renameHandler.close}
        title="System notice"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            handleRenameFolder(values);
          })}
        >
          <TextInput {...form.getInputProps("renameValue")} />
          <Group className="mt-4" position="right">
            <Button onClick={renameHandler.close}>Cancel</Button>
            <Button type="submit" color="blue">
              Process
            </Button>
          </Group>
        </form>
      </Modal>
      <Modal
        centered
        opened={opened}
        onClose={handler.close}
        title="System notice"
      >
        <Text>
          Every data relate to this folder will be detele, do you want to
          continue
        </Text>
        <Group className="mt-4" position="right">
          <Button onClick={handler.close}>Cancel</Button>
          <Button color="red" onClick={handleDeleteFolder}>
            Process
          </Button>
        </Group>
      </Modal>
      <div className="trasnition-all relative flex h-full w-full cursor-pointer flex-col items-center justify-around rounded-md border-2 border-solid border-white p-5 duration-150 hover:text-white">
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
                icon={<IconFolderSymlink size={14} />}
                onClick={() => handleOpenModal(folderId, "folder")}
              >
                Move to folder
              </Menu.Item>
              <Menu.Item
                icon={<IconCursorText size={14} />}
                onClick={renameHandler.open}
              >
                Rename
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                icon={<IconTrash size={14} />}
                onClick={handler.open}
              >
                Delete this folder
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>

        <IconFolder size={"13vmin"} />
        <p className="text-md">{folderName}</p>
      </div>
    </>
  );
};

export default FolderCard;
