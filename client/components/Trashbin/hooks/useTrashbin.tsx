import { useAtom } from "jotai";
import { removedItemAtom } from "../atoms";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useNotificationPreset from "@/hooks/notifications";

const useTrashbin = () => {
  const [removedItems, setRemovedItems] = useAtom(removedItemAtom);
  const [baseUrl] = useGetBaseUrl();
  const noti = useNotificationPreset();

  const getRemoved = () => {
    return removedItems;
  };

  const emptyTrashbin = async () => {
    noti.loadingNotification(
      "empty_trash_loading",
      "Empty trash bin done",
      async () => {
        await axios.put(`${baseUrl}/trash/empty`, { removedItems });
        setRemovedItems([]);
      },
    );
  };

  return { getRemoved, emptyTrashbin };
};

export default useTrashbin;
