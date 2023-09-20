import { baseUrlAtom } from "@/atoms";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useAtomValue } from "jotai";

const useMoveToFolderModal = (pageId: string) => {
  const [opened, { open, close }] = useDisclosure(false);
  const baseUrl = useAtomValue(baseUrlAtom);

  const handleCloseModal = () => {
    close();
  };

  const handleOpenModal = () => {
    try {
      axios.get(`${baseUrl}/folder/page/${pageId}`);

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
