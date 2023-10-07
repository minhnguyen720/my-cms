import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import useAlert from "@/components/Alert/hooks";

const useMoveToFolderModal = (pageId: string) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [fetchedFolders, setFetchedFolder] = useState<any[]>([]);
  const [selection, setSelection] = useState<string[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [baseUrl] = useGetBaseUrl();

  const toggleRow = (id: string) => {
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };

  const toggleAll = () =>
    setSelection((current) => (current.length === fetchedFolders.length ? [] : fetchedFolders.map((item) => item.id)));

  const handleCloseModal = () => {
    setFetchedFolder([]);
    setSelection([]);
    close();
  };

  const handleOpenModal = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/folder/getMoveToFolderData/${pageId}`,
      );
      if (res === undefined) return;

      setFetchedFolder(res.data);
      open();
    } catch (error) {
      console.error(error);
      handleCloseModal();
    }
  };

  const handleMove = async () => {
    console.log(selection);
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

  const move2FolderResetSearch = async () => {
    const res = await axios.get(
      `${baseUrl}/folder/getMoveToFolderData/${pageId}`,
    );
    if (res === undefined) return;

    setFetchedFolder(res.data);
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
    toggleAll
  };
};

export default useMoveToFolderModal;
