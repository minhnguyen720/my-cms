import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useNotificationPreset from "@/hooks/notifications";
import { useState } from "react";

const useTrashbin = () => {
  const [baseUrl] = useGetBaseUrl();
  const noti = useNotificationPreset();

  const emptyTrashbin = async () => {
    noti.loadingNotification(
      "empty_trash_loading",
      "Empty trash bin done",
      async () => {
        await axios.put(`${baseUrl}/trash/empty`);
      },
    );
  };

  const removeSelected = async (ids: string[]) => {

  };

  return { emptyTrashbin, removeSelected };
};

export default useTrashbin;
