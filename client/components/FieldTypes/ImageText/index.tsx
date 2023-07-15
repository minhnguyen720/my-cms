import UpdatableImage from "@/components/UpdatableImage";
import { Group } from "@mantine/core";
import React from "react";
import LongText from "../LongText";
import Text from "../Text";

interface props {
  src: string;
  alt: string;
  fieldId: string;
  form: any;
  label?: string;
  required: boolean;
  disabled: boolean;
  isUseEditor?: boolean;
}

function ImageText({
  src,
  alt,
  isUseEditor,
  fieldId,
  form,
  label,
  required,
  disabled,
}: props) {
  return (
    <div className="form_item">
      <Group>
        <UpdatableImage src={src} alt={alt} />
        {isUseEditor ? (
          <LongText
            fieldId={fieldId}
            form={form}
            label={label}
            required={required}
            disabled={disabled}
          />
        ) : (
          <Text
            fieldId={fieldId}
            form={form}
            label={label}
            required={required}
            disabled={disabled}
          />
        )}
      </Group>
    </div>
  );
}

export default ImageText;
