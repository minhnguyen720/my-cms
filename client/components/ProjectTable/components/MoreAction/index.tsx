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
  IconZzz,
} from "@tabler/icons-react";
import useDelete from "@/components/ProjectTable/hooks/delete";
import { usePathname, useRouter } from "next/navigation";
import { TbPlugConnected } from "react-icons/tb";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import { MESSAGES } from "@/constant";
import { useSetAtom } from "jotai";
import { datasourceAtom } from "@/atoms";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";

interface Props {
  rowId: string;
  projectId: string;
  pageId: string;
  projectName: string;
  isMobile: boolean;
  pageStatus: boolean;
}

const MoreActions: React.FC<Props> = ({
  rowId,
  projectId,
  pageId,
  projectName,
  isMobile,
  pageStatus,
}) => {
  const [opened, { toggle, close: closeBurger }] = useDisclosure(false);
  const {
    handleDelete,
    allowToDelete,
    dangerzoneOpened,
    dzModalHandler,
    handleDeleteConfirm,
  } = useDelete(rowId, projectId, pageId);
  const router = useRouter();
  const pathname = usePathname();
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();
  const setDatasource = useSetAtom(datasourceAtom);

  const goToDetail = () => {
    router.push(`${pathname}/${pageId}`);
  };

  const toggleStatus = async () => {
    try {
      showLoading();
      const res = await axios.put(`${baseUrl}/page/status`, {
        id: pageId,
        value: !pageStatus,
        projectId: projectId,
      });
      if (res.data.isSuccess) {
        successNotification(MESSAGES.UPDATE_STATUS.SUCCESS);
        setDatasource(res.data.latest);
      } else {
        errorNotification(MESSAGES.UPDATE_STATUS.FAIL);
      }
    } catch (error) {
      errorNotification(MESSAGES.UPDATE_STATUS.FAIL);
    } finally {
      hideLoading();
    }
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
          <span className="mx-2.5 font-bold">{rowId}</span>
          in the box below.
        </Text>
        <TextInput className="mt-4" onChange={handleDeleteConfirm} />
        <Button
          variant="outline"
          color="red"
          className={`mt-4 w-full ${isMobile ? "text-[3.25vmin]" : "text-md"}`}
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
        <Menu shadow="md" width={200} onClose={closeBurger}>
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
            <Menu.Item
              icon={
                pageStatus ? (
                  <IconZzz size={14} />
                ) : (
                  <TbPlugConnected size={14} />
                )
              }
              onClick={toggleStatus}
            >
              {pageStatus ? "Deactive this page" : "Active this page"}
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
