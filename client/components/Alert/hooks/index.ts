import { activeAlertAtom } from "@/atoms";
import { useAtom } from "jotai";

const useAlert = () => {
  const [alert, setAlert] = useAtom(activeAlertAtom);

  const closeAlert = () => {
    setAlert({
      activeFlag: false,
      message: "",
    });
  };

  const openAlert = (message?: string) => {
    setAlert({
      activeFlag: true,
      message: message ? message : "Something went wrong",
    });
  };

  return { closeAlert, openAlert };
};

export default useAlert;
