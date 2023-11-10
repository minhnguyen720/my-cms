import { baseUrlAtom, datasourceAtom } from "@/atoms";
import { MESSAGES } from "@/constant";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";

const useDelete = (rowId: string, projectId: string, pageId: string) => {
  const [dangerzoneOpened, dzModalHandler] = useDisclosure(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");
  const [allowToDelete, setAllowToDelete] = useState<boolean>(false);
  const baseUrl = useAtomValue(baseUrlAtom);
  const setDatasource = useSetAtom(datasourceAtom);
  const at = getCookie("at");

  useEffect(() => {
    if (deleteConfirm === rowId) setAllowToDelete(true);
    else setAllowToDelete(false);
  }, [deleteConfirm, rowId]);

  const handleDelete = async () => {
    try {
      const res = await axios.put(
        `${baseUrl}/page/movetotrash/`,
        {
          projectId,
          pageId,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      setDatasource(res.data.newDatasource);
      successNotification(MESSAGES.DELETE_PAGE.SUCCESS);
      dzModalHandler.close();
    } catch (error) {
      console.error(error);
      errorNotification(MESSAGES.DELETE_PAGE.FAIL);
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
