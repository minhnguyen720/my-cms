import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import React, { useState } from "react";

const useProjectSelection = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [baseUrl] = useGetBaseUrl();

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const toggleAll = (data) =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id),
    );

  const removeSelection = async () => {
    const res = await axios.put(`${baseUrl}/project`, { ids: selection });
  };

  const deactiveSelection = async () => {

  }

  return { toggleRow, toggleAll, selection, removeSelection, deactiveSelection };
};

export default useProjectSelection;
