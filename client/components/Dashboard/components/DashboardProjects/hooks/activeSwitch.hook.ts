import { statAtom } from "@/components/Dashboard/atoms";
import {
  successNotification,
  errorNotification,
} from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useSetAtom } from "jotai";

export const useDashboardActiveSwitch = () => {
  const setStatData = useSetAtom(statAtom);
  const [baseUrl] = useGetBaseUrl();

  const onChangeDashboardActiveSwitch = async (event) => {
    try {
      const res = await axios.put(
        `${baseUrl}/project/active/toggle`,
        {
          id: event.currentTarget.id,
          value: event.currentTarget.checked,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("at")}`,
          },
        },
      );
      setStatData([
        { title: "Active project", value: res.data.activeLength.toString() },
        {
          title: "Deactive project",
          value: res.data.deactiveLength.toString(),
        },
      ]);
      if (res.data.success) {
        successNotification("Deactive successful");
      } else {
        errorNotification("Deactive failed");
      }
    } catch (error) {
      errorNotification("Deactive failed");
      console.error(error);
    }
  };

  return { onChangeDashboardActiveSwitch };
};
