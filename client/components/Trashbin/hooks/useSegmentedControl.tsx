import { useEffect, useState } from "react";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { removedItemAtom } from "../atoms";
import { useAtom } from "jotai";
import useCurrentProject from "@/hooks/utilities/useCurrentProject";
import { useParams } from "next/navigation";
import useLoading from "@/hooks/utilities/useLoading";

export const segmentedData = [
  // { label: "All", value: "all" },
  { label: "Pages", value: "page" },
  { label: "Folders", value: "folder" },
];

export const useSegmentedControl = () => {
  const [value, setValue] = useState<string>("page");
  const [baseUrl] = useGetBaseUrl();
  const [removedItems, setRemovedItems] = useAtom(removedItemAtom);
  const { projectId } = useParams();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${baseUrl}/trash/${projectId}/${value}`);
      setRemovedItems(res.data);
    };

    try {
      showLoading();
      getData();
    } catch (error) {
      console.error(error);
      setRemovedItems([]);
    } finally {
      hideLoading();
    }
  }, [baseUrl, hideLoading, projectId, setRemovedItems, showLoading, value]);

  const handleSegmentChanged = (newValue: string) => {
    setValue(newValue);
  };

  return { handleSegmentChanged, value, removedItems };
};
