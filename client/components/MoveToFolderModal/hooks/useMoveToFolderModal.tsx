import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { Checkbox } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import classes from "../tableSelection.module.css";
import cx from "clsx";

const useMoveToFolderModal = (pageId: string) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [fetchedFolders, setFetchedFolder] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [baseUrl] = useGetBaseUrl();
  const [selection, setSelection] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    console.log(id);  
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === fetchedFolders.length
        ? []
        : fetchedFolders.map((item) => item.id),
    );
  };

  const handleCloseModal = () => {
    setFetchedFolder([]);
    close();
  };

  const handleOpenModal = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/folder/getMoveToFolderData/${pageId}`,
      );
      if (res === undefined) return;

      const formatedRows = res.data.map((item) => {
        const selected = selection.includes(item.id);
        setFetchedFolder((prev) => {
          return [...prev, { id: item.id }];
        });

        return (
          <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
            <td>
              <Checkbox
                checked={selection.includes(item.id)}
                onChange={() => toggleRow(item.id)}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.page}</td>
            <td>{item.project}</td>
            <td>{item.updatedDate}</td>
          </tr>
        );
      });

      setRows(formatedRows);
      open();
    } catch (error) {}
  };

  return {
    opened,
    handleCloseModal,
    handleOpenModal,
    fetchedFolders,
    toggleAll,
    selection,
    rows,
  };
};

export default useMoveToFolderModal;
