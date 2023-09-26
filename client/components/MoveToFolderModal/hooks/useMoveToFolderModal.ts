import { baseUrlAtom } from "@/atoms";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useState } from "react";

const useMoveToFolderModal = (pageId: string) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [fetchedFolders, setFetchedFolder] = useState<any[]>([]);
  const baseUrl = useAtomValue(baseUrlAtom);

  const handleCloseModal = () => {
    close();
  };

  const handleOpenModal = async () => {
    try {
      const res = await axios.get(`${baseUrl}/folder/page/${pageId}`);
      setFetchedFolder(res.data);
      open();
    } catch (error) {}
  };

  return {
    opened,
    handleCloseModal,
    handleOpenModal,
  };
};

export default useMoveToFolderModal;
