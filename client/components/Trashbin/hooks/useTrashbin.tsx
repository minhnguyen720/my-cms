import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { generalNotification } from "@/hooks/notifications/notificationPreset";
import useLoading from "@/hooks/utilities/useLoading";
import { useSetAtom } from "jotai";
import { removedItemAtom } from "../atoms";
import { MESSAGES } from "@/constant";
import { useParams } from "next/navigation";

const useTrashbin = () => {
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();
  const setRemovedItems = useSetAtom(removedItemAtom);
  const params = useParams();

  const emptyTrashbin = async () => {
    try {
      showLoading();
      const res = await axios.put(`${baseUrl}/trash/empty/`);
      if (res.data.isSuccess) {
        generalNotification(MESSAGES.EMPTY_TRASH.SUCCESS, "green");
        setRemovedItems([]);
      } else {
        generalNotification(MESSAGES.EMPTY_TRASH.FAIL, "red");
      }
    } catch (error) {
      console.error(error);
      generalNotification(MESSAGES.EMPTY_TRASH.FAIL, "red");
    } finally {
      hideLoading();
    }
  };

  const restoreSelected = async (ids: string[], type: string) => {
    try {
      showLoading();

      const res = await axios.put(`${baseUrl}/trash/restore`, {
        projectId: params.projectId,
        ids: ids,
        type: type,
      });
      if (res.data.isSuccess) {
        generalNotification(MESSAGES.RESTORE_REMOVED_ITEM.SUCCESS, "green");
        setRemovedItems(res.data.newList);
      } else {
        generalNotification(MESSAGES.RESTORE_REMOVED_ITEM.FAIL, "red");
      }
    } catch (error) {
      generalNotification(MESSAGES.RESTORE_REMOVED_ITEM.FAIL, "red");
    } finally {
      hideLoading();
    }
  };

  const removeSelected = async (ids: string[]) => {
    try {
      showLoading();
    } catch (error) {
      generalNotification(MESSAGES.REMOVED_ITEM.FAIL, "red");
    } finally {
      hideLoading();
    }
  };

  return { emptyTrashbin, removeSelected, restoreSelected };
};

export default useTrashbin;
