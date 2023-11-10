import { useAtom } from "jotai";
import { fieldsAtom } from "../atoms";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { getCookie } from "cookies-next";

export interface FieldHandler {
  getFields: () => any[];
  updateFields: (newValue: any) => void;
  updateFieldConfig: (
    config: {
      active: boolean;
      required: boolean;
    },
    fieldId: string,
  ) => Promise<void>;
  initFieldDetail: () => Promise<void>;
}

const useFields = () => {
  const [fields, setFields] = useAtom(fieldsAtom);
  const params = useParams();
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();
  const at = getCookie("at");

  const initFieldDetail = useCallback(async () => {
    const res = await axios.get(`${baseUrl}/fields/${params.detailId}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    if (res.data.isSuccess) setFields(res.data.fieldData);
    else errorNotification("Fail to get field detail");
  }, [at, baseUrl, params.detailId, setFields]);

  useEffect(() => {
    initFieldDetail();
  }, [baseUrl, initFieldDetail, params.detailId, setFields]);

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

      const res = await axios.put(
        `${baseUrl}/fields/update-config`,
        {
          config,
          fieldId,
          doc: params.detailId,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
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

  return { getFields, updateFields, updateFieldConfig, initFieldDetail };
};

export default useFields;
