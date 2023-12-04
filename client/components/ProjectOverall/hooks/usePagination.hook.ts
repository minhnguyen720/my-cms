import { datasourceAtom } from "@/atoms";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import { useAtom } from "jotai";
import { perPage } from "..";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import { errorNotification } from "@/hooks/notifications/notificationPreset";
import useLoading from "@/hooks/utilities/useLoading";

export const usePagination = () => {
  const [datasource, setDatasource] = useAtom(datasourceAtom);
  const [baseUrl] = useGetBaseUrl();
  const { projectNameId } = useParams();
  const at = getCookie("at");
  const { showLoading, hideLoading } = useLoading();

  const handleOnChange = async (value: number) => {
    try {
      showLoading();
      const res = await axios.get(
        `${baseUrl}/page?perPage=${perPage}&page=${value}&projectId=${projectNameId}`,
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (!res.data.isSuccess) {
        errorNotification("Fail to fetch this page");
        return;
      }
      if (typeof datasource !== "boolean") {
        setDatasource(res.data.pages);
      } else {
        errorNotification("Fail to fetch this page");
      }
    } catch (error) {
      console.error(error);
      errorNotification("Fail to fetch this page");
    } finally {
      hideLoading();
    }
  };

  return {
    handleOnChange,
  };
};
