import useAlert from "@/components/Alert/hooks";
import { ALERT_CODES } from "@/constant";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { Folder } from "@/interfaces/Project";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { getCookie } from "cookies-next";

const useFolderCardAction = (folders: Folder[]) => {
  const [folderList, setFolderList] = useState<Folder[]>([]);
  const { openAlert } = useAlert();
  const [baseUrl] = useGetBaseUrl();
  const [renameOpened, renameHandler] = useDisclosure(false);
  const [opened, handler] = useDisclosure(false);
  const at = getCookie("at");

  useEffect(() => {
    setTimeout(() => {
      setFolderList(folders);
    }, 200);
  }, [folders]);

  const add = (item) => {
    setFolderList((prev) => [...prev, item]);
  };

  const update = (newFolderList: Folder[]) => {
    if (newFolderList === undefined) return;
    setFolderList(newFolderList);
  };

  const remove = async (folderId: string, docId: string) => {
    try {
      const res: {
        data: { isSuccess: boolean; latestFolderList: Folder[] | undefined };
      } = await axios.delete(`${baseUrl}/folder/${folderId}/${docId}`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      if (res.data.isSuccess && res.data.latestFolderList !== undefined) {
        openAlert("Delete folder success", ALERT_CODES.SUCCESS);
        update(res.data.latestFolderList);
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

  const rename = async (values, docId) => {
    try {
      const body = {
        folderId: folders,
        name: values.renameValue,
        pageId: docId,
      };
      const res: {
        data: { isSuccess: boolean; latestFolderList: Folder[] | undefined };
      } = await axios.put(`${baseUrl}/folder/rename`, body, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      if (res.data.isSuccess && res.data.latestFolderList !== undefined) {
        openAlert("Rename folder success", ALERT_CODES.SUCCESS);
        update(res.data.latestFolderList);
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

  const getFolderList = () => {
    return folderList;
  };

  const folderHandler = {
    add,
    update,
    remove,
    rename,
    getFolderList,
  };

  return {
    folderList,
    folderHandler,
    confirmModal: {
      opened: opened,
      handler: handler,
    },
    renameModal: {
      opened: renameOpened,
      handler: renameHandler,
    },
  };
};

export default useFolderCardAction;
