import { useState } from "react";

const useFolderCardAction = () => {
  const [folderList, setFolderList] = useState([]);

  const addFolderItem = (item) => {
    setFolderList((prev) => [...prev, item]);
  };

  return {
    folderList, addFolderItem
  }
};

export default useFolderCardAction;
