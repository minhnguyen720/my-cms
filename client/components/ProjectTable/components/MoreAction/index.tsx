import {
  Menu,
  Burger,
  Modal,
  Text,
  TextInput,
  Button,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowNarrowRight,
  IconFileDescription,
  IconTrash,
} from "@tabler/icons-react";
import useDelete from "@/components/ProjectTable/hooks/delete";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  rowId: string;
  projectId: string;
  pageId: string;
  projectName: string;
  isMobile: boolean;
}

const MoreActions: React.FC<Props> = ({
  rowId,
  projectId,
  pageId,
  projectName,
  isMobile,
}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const {
    handleDelete,
    allowToDelete,
    dangerzoneOpened,
    dzModalHandler,
    handleDeleteConfirm,
  } = useDelete(rowId, projectId, pageId, projectName);
  const router = useRouter();
  const pathname = usePathname();

  const goToDetail = () => {
    router.push(`${pathname}/${pageId}`);
  };

  return (
    <>
      <Modal
        centered
        opened={dangerzoneOpened}
        onClose={dzModalHandler.close}
        title="Danger zone notice"
      >
        <Text>
          This will permanently delete any data related to this page. To
          confirm, type
          <span className="font-bold mx-2.5">&apos;{rowId}&apos;</span>
          in the box below.
        </Text>
        <TextInput className="mt-4" onChange={handleDeleteConfirm} />
        <Button
          variant="outline"
          color="red"
          className={`w-full mt-4 ${isMobile ? "text-[3.25vmin]" : "text-md"}`}
          disabled={!allowToDelete}
          onClick={handleDelete}
        >
          I understand and want to delete this page
        </Button>
      </Modal>
      {isMobile ? (
        <Grid className="mt-2">
          <Grid.Col span={6}>
            <ActionIcon
              variant="filled"
              color="blue"
              onClick={goToDetail}
              className="w-full py-5"
            >
              <IconArrowNarrowRight />
            </ActionIcon>
          </Grid.Col>
          <Grid.Col span={6}>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => dzModalHandler.open()}
              className="w-full py-5"
            >
              <IconTrash />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      ) : (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Burger opened={opened} onClick={toggle} />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              icon={<IconFileDescription size={14} />}
              onClick={goToDetail}
            >
              Go to page detail
            </Menu.Item>
            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              color="red"
              icon={<IconTrash size={14} />}
              onClick={() => {
                dzModalHandler.open();
              }}
            >
              Delete this page
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
};

export default MoreActions;
