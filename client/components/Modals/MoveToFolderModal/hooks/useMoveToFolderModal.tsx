import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { getCookie } from "cookies-next";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";

const useMoveToFolderModal = (pageId: string) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [fetchedFolders, setFetchedFolder] = useState<any[]>([]);
  const [selection, setSelection] = useState<string[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [baseUrl] = useGetBaseUrl();
  const [localFetchedFolders, setLocalFetchedFolders] = useLocalStorage<any[]>({
    key: "localFetchedFolders",
  });
  const [localSelection, setLocalSelection] = useLocalStorage<string[]>({
    key: "localSelection",
  });
  const [loadingOverlayVisible, loadingOverlayHanlder] = useDisclosure(false);
  const at = getCookie("at");

  const toggleRow = (id: string) => {
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [id];
    });
  };

  const backToRoot = (targetId: string, type: string) => {
    axios.put(
      `${baseUrl}/folder/move`,
      {
        movingId: pageId,
        targetId: targetId,
        type: type,
      },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      },
    );
  };

  const handleCloseModal = () => {
    setFetchedFolder([]);
    setSelection([]);
    setLocalFetchedFolders([]);
    setLocalSelection([]);
    close();
  };

  const handleOpenModal = async (targetId: string, type: string) => {
    try {
      open();
      loadingOverlayHanlder.open();

      const param = `${targetId}&&${pageId}&&${type}`;
      const res = await axios.get(
        `${baseUrl}/folder/getMoveToFolderData/${param}`,
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res === undefined) return;

      if (type === "folder") {
        if (targetId === undefined) return;
        const filteredResult = res.data.folders.filter((item) => {
          return item.id !== targetId;
        });
        setFetchedFolder(filteredResult);
        setLocalFetchedFolders(filteredResult);
        setLocalSelection(res.data.selection);
        setSelection(res.data.selection);
      } else {
        setFetchedFolder(res.data.folders);
        setSelection(res.data.selection);
        setLocalFetchedFolders(res.data.folders);
        setLocalSelection(res.data.selection);
      }
    } catch (error) {
      console.error(error);
      loadingOverlayHanlder.close();
      handleCloseModal();
    } finally {
      loadingOverlayHanlder.close();
    }
  };

  const handleMove = async (targetId: string, type: string) => {
    const res = await axios.put(
      `${baseUrl}/folder/move`,
      {
        movingId: selection[0],
        type,
        targetId,
      },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      },
    );
    if (res.data.success) {
      successNotification("Move files successfully");
      if (type === "folder") {
        // update folder list
      }
    } else {
      errorNotification("Move files failed");
    }
    handleCloseModal();
  };

  const move2FolderSearch = () => {
    const filteredResult = fetchedFolders.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.page.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.project.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFetchedFolder(filteredResult);
  };

  const move2FolderResetSearch = () => {
    setFetchedFolder(localFetchedFolders);
    setSelection(localSelection);
    setSearchValue("");
  };

  return {
    opened,
    handleCloseModal,
    handleOpenModal,
    selection,
    handleMove,
    move2FolderSearch,
    setSearchValue,
    searchValue,
    move2FolderResetSearch,
    fetchedFolders,
    toggleRow,
    loadingOverlayVisible,
    loadingOverlayHanlder,
    backToRoot,
  };
};

export default useMoveToFolderModal;
