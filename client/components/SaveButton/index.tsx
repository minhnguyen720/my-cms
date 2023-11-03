import { ActionIcon, Tooltip } from "@mantine/core";
import React from "react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { FieldHandler } from "../Fields/hooks/useFields";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";

interface Props {
  form: UseFormReturnType<
    Record<string, unknown>,
    (values: Record<string, unknown>) => Record<string, unknown>
  >;
  docId: string;
  fieldHandler: FieldHandler;
}

const SaveButton: React.FC<Props> = ({ form, docId, fieldHandler }) => {
  const [baseUrl] = useGetBaseUrl();

  const handleOnSave = async () => {
    try {
      const res = await axios.put(`${baseUrl}/fields/bydoc/${docId}`, form.values);
      if (res.data.isSuccess) {
        successNotification("Fields are saved");
        fieldHandler.updateFields(res.data.newData)
      } else {
        errorNotification("Fail to save");
      }
    } catch (error) {
      console.error(error);
      errorNotification("Fail to save");
    }
  };

  return (
    <Tooltip label="Save changes">
      <ActionIcon onClick={handleOnSave}>
        <IconDeviceFloppy size={28} />
      </ActionIcon>
    </Tooltip>
  );
};

export default SaveButton;
