import { Folder } from "@/interfaces/Project";
import { useEffect, useState } from "react";

const useFolderCardAction = (folders: Folder[]) => {
  const [folderList, setFolderList] = useState<Folder[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setFolderList(folders);
    }, 200);
  }, [folders]);

  const addFolderItem = (item) => {
    setFolderList((prev) => [...prev, item]);
  };

  const updateFolderList = (newFolderList: Folder[]) => {
    if(newFolderList === undefined) return;
    setFolderList(newFolderList);
  };

  return {
    folderList,
    addFolderItem,
    updateFolderList
  };
};

export default useFolderCardAction;
