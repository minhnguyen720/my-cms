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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const FolderCard = ({ folderName }) => {
  const [opened, handler] = useDisclosure(false);

  const handleDeleteFolder = () => {
    handler.close();
  };

  return (
    <>
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
      <div className="trasnition-all relative flex h-full w-full cursor-pointer flex-col items-center justify-around rounded-md border-2 border-solid border-white p-4 duration-150 hover:text-white">
        <Box className="absolute right-0 top-0 z-50 m-2">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon>
                <IconDots size={"2rem"} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item icon={<IconFolderSymlink size={14} />}>
                Move to folder
              </Menu.Item>
              <Menu.Item icon={<IconCursorText size={14} />}>Rename</Menu.Item>

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

        <IconFolder size={"20vmin"} />
        <p className="text-lg">{folderName}</p>
      </div>
    </>
  );
};

export default FolderCard;
