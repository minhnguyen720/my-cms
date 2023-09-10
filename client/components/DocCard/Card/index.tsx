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

interface Props {
  doc: {
    id?: string;
    name?: string;
    createdDate?: string;
    updatedDate?: string;
    createdUser?: string;
    updatedUser?: string;
    fields?: string[];
    active?: boolean;
    page?: string;
    description?: string;
  };
}

const Card: React.FC<Props> = ({ doc }) => {
  const [opened, handler] = useDisclosure(false);

  const handleDeleteDocument = () => {
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
          Every data relate to this document will be detele, do you want to
          continue
        </Text>
        <Group className="mt-4" position="right">
          <Button>Cancel</Button>
          <Button color="red" onClick={handleDeleteDocument}>
            Process
          </Button>
        </Group>
      </Modal>
      <div className="relative">
        <Box className="absolute right-0 top-0 m-2 z-50">
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
            <DetailItem label="Number of fields" content={doc.fields.length} />
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
