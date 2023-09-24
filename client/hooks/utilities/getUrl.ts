import { baseUrlAtom } from "@/atoms";
import { useAtomValue } from "jotai";

const useGetBaseUrl = () => {
  const baseUrl = useAtomValue(baseUrlAtom);

  return [baseUrl];
};

export default useGetBaseUrl;
