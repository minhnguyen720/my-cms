import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import useProjectSelection from "./useProjectSelection";
import useLoading from "@/hooks/utilities/useLoading";
import useAlert from "@/components/Alert/hooks";
import { ALERT_CODES } from "@/constant";
import { getCookie } from "cookies-next";

const useToolbar = () => {
  const [baseUrl] = useGetBaseUrl();
  const { selection, updateSelection } = useProjectSelection();
  const { showLoading, hideLoading } = useLoading();
  const { openAlert } = useAlert();
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
      openAlert("Remove the selected projects succesful", ALERT_CODES.SUCCESS);
      return res.data.projects;
    } catch (error) {
      openAlert("Remove the selected projects failed", ALERT_CODES.ERROR);
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
