import {
  successNotification,
  errorNotification,
} from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import axios from "axios";
import { getCookie } from "cookies-next";

export const useMoveToTrash = () => {
  const { showLoading, hideLoading } = useLoading();
  const [baseUrl] = useGetBaseUrl();
  const at = getCookie("at");

  const handleMoveToTrashBin = async () => {
    try {
      showLoading();

      const res = await axios.put(`${baseUrl}/page/movetotrash`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });

      if (res.data.isSuccess) {
        successNotification("Delete page successfully");
      } else {
        errorNotification("Fail to delete this page");
      }
    } catch (error) {
      errorNotification("Fail to delete this page");
    } finally {
      hideLoading();
    }
  };

  return {handleMoveToTrashBin}
};
