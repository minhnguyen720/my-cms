import { baseUrlAtom } from "@/atoms";
import { Document } from "@/interfaces/Project";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useState } from "react";

const useCardAction = (docs) => {
  const [docList, setDocList] = useState<Document[]>(docs);
  const baseUrl = useAtomValue(baseUrlAtom);

  const add = (doc) => {
    setDocList((prev) => [...prev, doc]);
  };

  const remove = (docId: string) => {
    setDocList((prev) => {
      return prev.filter((item) => {
        return item._id !== docId;
      });
    });
  };

  const update = (newDocList: Document[]) => {
    setDocList(newDocList);
  };

  const getDocList = () => {
    return docList;
  };

  const rename = async (targetData: any, value: string) => {
    const res = await axios.put(`${baseUrl}/doc/rename`, { targetData, value });
    if (typeof res.data !== "string" && res.data?.length > 0)
      setDocList(res.data);
  };

  const handler = {
    remove,
    add,
    rename,
    update,
    getDocList
  };

  return { docList, handler };
};

export default useCardAction;
