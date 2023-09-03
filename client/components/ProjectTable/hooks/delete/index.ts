import { baseUrlAtom, datasourceAtom } from "@/atoms";
import useAlert from "@/components/Alert/hooks";
import { MESSAGES, ALERT_CODES } from "@/constant";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";

const useDelete = (
  rowId: string,
  projectId: string,
  pageId: string,
  projectName: string
) => {
  const [dangerzoneOpened, dzModalHandler] = useDisclosure(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");
  const [allowToDelete, setAllowToDelete] = useState<boolean>(false);
  const baseUrl = useAtomValue(baseUrlAtom);
  const setDatasource = useSetAtom(datasourceAtom);
  const { openAlert } = useAlert();

  useEffect(() => {
    if (deleteConfirm === rowId) setAllowToDelete(true);
    else setAllowToDelete(false);
  }, [deleteConfirm, rowId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/page/${projectId}/${pageId}`);
      const newDatasource = (await axios.get(`${baseUrl}/page/${projectName}`))
        .data;
      setDatasource(newDatasource);
      openAlert(MESSAGES.DELETE_PAGE.SUCCESS, ALERT_CODES.SUCCESS);
      dzModalHandler.close();
    } catch (error) {
      console.error(error);
      openAlert(MESSAGES.DELETE_PAGE.FAIL, ALERT_CODES.ERROR);
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
