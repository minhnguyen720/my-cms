import { useAtom } from "jotai";
import { fieldsAtom } from "../atoms";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import axios from "axios";

const useFieldAction = () => {
  const [fields, setFields] = useAtom(fieldsAtom);
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();

  const getFields = () => {
    return fields;
  };

  const updateFields = (newValue) => {
    setFields(newValue);
  };

  const createNewField = async (newValue) => {
    try {
      showLoading();

      const res = await axios.post(`${baseUrl}/`)
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  return { getFields, updateFields };
};

export default useFieldAction;
