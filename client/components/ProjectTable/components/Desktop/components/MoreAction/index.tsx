import { Menu, Burger, Modal, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFileDescription, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function MoreActions() {
  const [opened, { toggle }] = useDisclosure(false);
  const [dangerzoneOpened, dzModalHandler] = useDisclosure(false);
  const [currentSelectedRow, setCurrentSelectedRow] = useState("hello");

  const handleDelete = () => {
    toggle();
    dzModalHandler.open();
  };

  const goToDetail = () => {};

  return (
    <>
      <Modal
        opened={dangerzoneOpened}
        onClose={dzModalHandler.close}
        title="Danger zone notice"
      >
        <Text>
          This will permanently delete any data related to this page. To
          confirm, type
          <span className="font-bold mx-2.5">
            &apos;{currentSelectedRow}&apos;
          </span>
          in the box below.
        </Text>
        <TextInput className="mt-4"/>
      </Modal>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Burger opened={opened} onClick={toggle} />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<IconFileDescription size={14} />}>
            Go to page detail
          </Menu.Item>
          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            icon={<IconTrash size={14} />}
            onClick={handleDelete}
          >
            Delete this page
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
