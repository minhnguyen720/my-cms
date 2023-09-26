import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";

const useMoveToFolderModal = (pageId: string) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [fetchedFolders, setFetchedFolder] = useState<any[]>([]);
  const [baseUrl] = useGetBaseUrl();

  const handleCloseModal = () => {
    setFetchedFolder([]);
    close();
  };

  const handleOpenModal = async () => {
    try {
      const res = await axios.get(`${baseUrl}/folder/move2folder/${pageId}`);
      if (res === undefined) return;

      const rows = res.data.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.page}</td>
            <td>{item.updatedDate}</td>
          </tr>
        );
      });

      setFetchedFolder(rows);
      open();
    } catch (error) {}
  };

  return {
    opened,
    handleCloseModal,
    handleOpenModal,
    fetchedFolders,
  };
};

export default useMoveToFolderModal;
