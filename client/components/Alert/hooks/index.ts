import { activeAlertAtom } from "@/atoms";
import { useAtom } from "jotai";

const useAlert = () => {
  const [alert, setAlert] = useAtom(activeAlertAtom);

  const closeAlert = () => {
    setAlert({
      activeFlag: false,
      message: "",
      type: "",
    });
  };

  const openAlert = (message?: string, type?: string) => {
    setAlert({
      activeFlag: true,
      message: message ? message : "Something went wrong",
      type: type ? type : "info",
    });
  };

  return { closeAlert, openAlert };
};

export default useAlert;
