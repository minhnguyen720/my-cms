import { useEffect, useState } from "react";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { removedItemAtom, selectedAtom } from "../atoms";
import { useAtom, useSetAtom } from "jotai";
import useCurrentProject from "@/hooks/utilities/useCurrentProject";
import { useParams } from "next/navigation";
import useLoading from "@/hooks/utilities/useLoading";
import { getCookie } from "cookies-next";

export const segmentedData = [
  // { label: "All", value: "all" },
  { label: "Pages", value: "page" },
  { label: "Folders", value: "folder" },
];

export const useSegmentedControl = () => {
  const [value, setValue] = useState<string>("page");
  const [baseUrl] = useGetBaseUrl();
  const [removedItems, setRemovedItems] = useAtom(removedItemAtom);
  const setSelected = useSetAtom(selectedAtom);

  const { projectId } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const at = getCookie("at");

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        const res = await axios.get(`${baseUrl}/trash/${projectId}/${value}`, {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        });
        setRemovedItems(res.data);
      } catch (error) {
        console.error(error);
        setRemovedItems([]);
      } finally {
        hideLoading();
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, projectId, at, value]);

  const handleSegmentChanged = (newValue: string) => {
    setValue(newValue);
    setSelected([]);
  };

  return { handleSegmentChanged, value, removedItems };
};
