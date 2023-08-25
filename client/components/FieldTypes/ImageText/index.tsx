import UpdatableImage from "@/components/UpdatableImage";
import { Group } from "@mantine/core";
import React from "react";
import LongText from "../LongText";
import Text from "../Text";

interface Props {
  src: string;
  alt: string;
  fieldId: string;
  form: any;
  label?: string;
  required: boolean;
  active: boolean;
  isUseEditor?: boolean;
}

const ImageText: React.FC<Props> = ({
  src,
  alt,
  isUseEditor,
  fieldId,
  form,
  label,
  required,
  active,
}) => {
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
            active={!active}
          />
        ) : (
          <Text
            fieldId={fieldId}
            form={form}
            label={label}
            required={required}
            active={!active}
          />
        )}
      </Group>
    </div>
  );
};

export default ImageText;
