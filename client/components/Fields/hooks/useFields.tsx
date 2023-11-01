import { useAtom } from "jotai";
import { fieldsAtom } from "../atoms";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";

const useFields = () => {
  const [fields, setFields] = useAtom(fieldsAtom);
  const params = useParams();
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const initFieldDetail = async () => {
      const res = await axios.get(`${baseUrl}/fields/${params.detailId}`);
      if (res.data.isSuccess) setFields(res.data.fieldData);
    };

    initFieldDetail();
  }, [baseUrl, params.detailId, setFields]);

  const getFields = () => {
    return fields;
  };

  const updateFields = (newValue) => {
    setFields(newValue);
  };

  const updateFieldConfig = async (
    config: {
      active: boolean;
      required: boolean;
    },
    fieldId: string,
  ) => {
    try {
      showLoading();

      const res = await axios.put(`${baseUrl}/fields/update-config`, {
        config,
        fieldId,
        doc: params.detailId,
      });
      if (res.data.isSuccess) {
        successNotification("Update config successully");
        setFields(res.data.fieldData);
      } else {
        errorNotification("Fail to update field config");
      }
    } catch (error) {
      errorNotification("Fail to update field config");
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  return { getFields, updateFields, updateFieldConfig };
};

export default useFields;
