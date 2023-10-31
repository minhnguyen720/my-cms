import { baseUrlAtom, datasourceAtom } from "@/atoms";
import useAlert from "@/components/Alert/hooks";
import { MESSAGES, ALERT_CODES } from "@/constant";
import { generalNotification } from "@/hooks/notifications/notificationPreset";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";

const useDelete = (rowId: string, projectId: string, pageId: string) => {
  const [dangerzoneOpened, dzModalHandler] = useDisclosure(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");
  const [allowToDelete, setAllowToDelete] = useState<boolean>(false);
  const baseUrl = useAtomValue(baseUrlAtom);
  const setDatasource = useSetAtom(datasourceAtom);

  useEffect(() => {
    if (deleteConfirm === rowId) setAllowToDelete(true);
    else setAllowToDelete(false);
  }, [deleteConfirm, rowId]);

  const handleDelete = async () => {
    try {
      const res = await axios.put(`${baseUrl}/page/movetotrash/`, {
        projectId,
        pageId,
      });
      setDatasource(res.data.newDatasource);
      generalNotification(MESSAGES.DELETE_PAGE.SUCCESS, "green");
      dzModalHandler.close();
    } catch (error) {
      console.error(error);
      generalNotification(MESSAGES.DELETE_PAGE.FAIL, "red");
      dzModalHandler.close();
    }
  };

  const handleDeleteConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setDeleteConfirm(e.currentTarget.value);
  };

  return {
    handleDelete,
    allowToDelete,
    dangerzoneOpened,
    dzModalHandler,
    handleDeleteConfirm,
  };
};

export default useDelete;
