import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import useAlert from "@/components/Alert/hooks";
import { Checkbox } from "@mantine/core";
import React from "react";

const useMoveToFolderModal = (pageId: string) => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [fetchedFolders, setFetchedFolder] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [selection, setSelection] = useState<string[]>([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [baseUrl] = useGetBaseUrl();
  const { openAlert } = useAlert();

  const toggleRow = (id: string) => {
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };

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

      const formatedRows = res.data.map((item) => {
        return (
          <tr key={item.id}>
            <td>
              <Checkbox
                onChange={() => {
                  toggleRow(item.id);
                }}
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
    const formatedRows = filteredResult.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <Checkbox />
          </td>
          <td>{item.name}</td>
          <td>{item.page}</td>
          <td>{item.project}</td>
          <td>{item.updatedDate}</td>
        </tr>
      );
    });

    setSearchResult(formatedRows);
  };

  const move2FolderResetSearch = () => {
    setSearchValue("");
    setSearchResult([]);
  };

  return {
    opened,
    handleCloseModal,
    handleOpenModal,
    selection,
    rows,
    handleMove,
    move2FolderSearch,
    setSearchValue,
    searchValue,
    move2FolderResetSearch,
    searchResult,
  };
};

export default useMoveToFolderModal;
