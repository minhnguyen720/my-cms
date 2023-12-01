import {
  successNotification,
  errorNotification,
} from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import { Page } from "@/interfaces/Project";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";

export const useUpdateStatus = (page: Page) => {
  const [baseUrl] = useGetBaseUrl();
  const [pageStatus, setPageStatus] = useState<boolean>(
    page.active ? page.active : false,
  );
  const { showLoading, hideLoading } = useLoading();
  const at = getCookie("at");
  const [updateOpened, updateHandler] = useDisclosure(false);

  const handleUpdateStatus = async () => {
    try {
      showLoading();
      const res = await axios.put(
        `${baseUrl}/page/status`,
        {
          id: page._id,
          value: !page.active,
          projectId: page.project,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.data.isSuccess) {
        setPageStatus((prev) => {
          return !prev;
        });
        successNotification("Update status success");
      } else {
        errorNotification("Update status failed");
      }
      updateHandler.close();
    } catch (error) {
      errorNotification("Update status failed");
    } finally {
      hideLoading();
    }
  };

  return {
    pageStatus,
    updateOpened,
    updateHandler,
    handleUpdateStatus
  }
};
