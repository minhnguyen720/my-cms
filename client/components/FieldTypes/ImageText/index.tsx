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

  required?: boolean;

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
}: props) {
  return (
    <div className="form_item">
      <Group>
        <UpdatableImage src={src} alt={alt} />
        {isUseEditor ? (
          <LongText fieldId={fieldId} form={form} label={label} />
        ) : (
          <Text
            fieldId={fieldId}
            form={form}
            label={label}
            required={required}
          />
        )}
      </Group>
    </div>
  );
}

export default ImageText;
