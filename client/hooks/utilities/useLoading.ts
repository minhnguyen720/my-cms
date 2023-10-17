import { globalLoadingAtom } from "@/atoms";
import { useAtom } from "jotai";

const useLoading = () => {
  const [loading, setLoading] = useAtom(globalLoadingAtom);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const getLoadingFlag = () => {
    return loading;
  }

  return {
    showLoading,
    hideLoading,
    getLoadingFlag
  };
};

export default useLoading;
