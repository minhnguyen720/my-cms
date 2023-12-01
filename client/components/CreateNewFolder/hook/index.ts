import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { Folder } from "@/interfaces/Project";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { getCookie } from "cookies-next";
import { errorNotification, successNotification } from "@/hooks/notifications/notificationPreset";

const useFolderCardAction = (folders: Folder[]) => {
  const [folderList, setFolderList] = useState<Folder[]>([]);
  const [baseUrl] = useGetBaseUrl();
  const [renameOpened, renameHandler] = useDisclosure(false);
  const [opened, handler] = useDisclosure(false);
  const at = getCookie("at");

  useEffect(() => {
    setTimeout(() => {
      setFolderList(folders);
    }, 200);
  }, [folders]);

  const add = (item: Folder) => {
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
        successNotification("Delete folder success");
        update(res.data.latestFolderList);
        handler.close();
      } else {
        errorNotification("Delete folder fail");
        handler.close();
      }
    } catch (error) {
      console.error(error);
      errorNotification("Delete folder fail");
      handler.close();
    }
  };

  const rename = async (values: {
    renameValue: string
  }, docId: string) => {
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
        successNotification("Rename folder success")
        update(res.data.latestFolderList);
        renameHandler.close();
      } else {
        errorNotification("Rename folder fail")
        renameHandler.close();
      }
    } catch (error) {
      console.error(error);
      errorNotification("Rename folder fail")
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
