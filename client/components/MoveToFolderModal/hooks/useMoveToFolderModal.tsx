import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import useAlert from "@/components/Alert/hooks";
import { ALERT_CODES } from "@/constant";
import { useLocalStorage } from "@mantine/hooks";

const useMoveToFolderModal = (pageId: string) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [fetchedFolders, setFetchedFolder] = useState<any[]>([]);
  const [selection, setSelection] = useState<string[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [baseUrl] = useGetBaseUrl();
  const { openAlert } = useAlert();
  const [localFetchedFolders, setLocalFetchedFolders] = useLocalStorage<any[]>({
    key: "localFetchedFolders",
  });
  const [localSelection, setLocalSelection] = useLocalStorage<string[]>({
    key: "localSelection",
  });
  const [loadingOverlayVisible, loadingOverlayHanlder] = useDisclosure(false);

  const toggleRow = (id: string) => {
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };

  const toggleAll = () =>
    setSelection((current) =>
      current.length === fetchedFolders.length
        ? []
        : fetchedFolders.map((item) => item.id),
    );

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
    const res = await axios.put(`${baseUrl}/folder/move`, {
      ids: selection,
      type,
      targetId,
    });
    if (res.data.success) {
      openAlert("Move files successfully", ALERT_CODES.SUCCESS);
    } else {
      openAlert("Move files failed", ALERT_CODES.ERROR);
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
    toggleAll,
    loadingOverlayVisible,
    loadingOverlayHanlder,
  };
};

export default useMoveToFolderModal;
