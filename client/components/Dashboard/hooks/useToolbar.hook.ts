import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import useProjectSelection from "./useProjectSelection.hook";
import useLoading from "@/hooks/utilities/useLoading";
import { getCookie } from "cookies-next";
import { errorNotification, successNotification } from "@/hooks/notifications/notificationPreset";

const useToolbar = () => {
  const [baseUrl] = useGetBaseUrl();
  const { selection, updateSelection } = useProjectSelection();
  const { showLoading, hideLoading } = useLoading();
  const at = getCookie("at");

  const doRemove = async () => {
    try {
      showLoading();
      const res = await axios.put(
        `${baseUrl}/project/remove`,
        {
          ids: selection,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      successNotification("Remove the selected projects succesful")
      return res.data.projects;
    } catch (error) {
      errorNotification("Remove the selected projects failed")
      const res = await axios.get(`${baseUrl}/project`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      return res.data.projects;
    } finally {
      hideLoading();
      updateSelection([]);
    }
  };

  const doDeactive = async () => {
    console.log(selection);
  };

  return {
    doRemove,
    doDeactive,
  };
};

export default useToolbar;
