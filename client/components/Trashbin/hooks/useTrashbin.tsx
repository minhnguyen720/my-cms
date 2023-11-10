import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import useLoading from "@/hooks/utilities/useLoading";
import { useSetAtom } from "jotai";
import { removedItemAtom } from "../atoms";
import { MESSAGES } from "@/constant";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";

const useTrashbin = () => {
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();
  const setRemovedItems = useSetAtom(removedItemAtom);
  const params = useParams();
  const at = getCookie("at");

  const emptyTrashbin = async () => {
    try {
      showLoading();
      const res = await axios.put(
        `${baseUrl}/trash/empty/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.data.isSuccess) {
        successNotification(MESSAGES.EMPTY_TRASH.SUCCESS);
        setRemovedItems([]);
      } else {
        errorNotification(MESSAGES.EMPTY_TRASH.FAIL);
      }
    } catch (error) {
      console.error(error);
      errorNotification(MESSAGES.EMPTY_TRASH.FAIL);
    } finally {
      hideLoading();
    }
  };

  const restoreSelected = async (ids: string[], type: string) => {
    try {
      showLoading();

      const res = await axios.put(
        `${baseUrl}/trash/restore`,
        {
          projectId: params.projectId,
          ids: ids,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.data.isSuccess) {
        successNotification(MESSAGES.RESTORE_REMOVED_ITEM.SUCCESS);
        setRemovedItems(res.data.newList);
      } else {
        errorNotification(MESSAGES.RESTORE_REMOVED_ITEM.FAIL);
      }
    } catch (error) {
      errorNotification(MESSAGES.RESTORE_REMOVED_ITEM.FAIL);
    } finally {
      hideLoading();
    }
  };

  const removeSelected = async (ids: string[], type: string) => {
    try {
      showLoading();

      const res = await axios.put(
        `${baseUrl}/trash/rmselected`,
        {
          projectId: params.projectId,
          ids,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );

      if (res.data.isSuccess) {
        successNotification(MESSAGES.REMOVED_ITEM.SUCCESS);
        setRemovedItems(res.data.newList);
      } else {
        errorNotification(MESSAGES.REMOVED_ITEM.FAIL);
      }
    } catch (error) {
      errorNotification(MESSAGES.REMOVED_ITEM.FAIL);
    } finally {
      hideLoading();
    }
  };

  return { emptyTrashbin, removeSelected, restoreSelected };
};

export default useTrashbin;
