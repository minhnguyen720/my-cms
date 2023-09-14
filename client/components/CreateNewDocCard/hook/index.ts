import { baseUrlAtom } from "@/atoms";
import axios from "axios";
import { useAtomValue } from "jotai";
import { useState } from "react";

const useCreateNewCardAction = (docs) => {
  const [docList, setDocList] = useState(docs);
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

  const rename = async (targetData: any, value: string) => {
    const res = await axios.put(`${baseUrl}/doc/rename`, { targetData, value });
    if (typeof res.data !== "string" && res.data?.length > 0)
      setDocList(res.data);
  };

  const handler = {
    remove,
    add,
    rename,
  };

  return { docList, handler };
};

export default useCreateNewCardAction;
