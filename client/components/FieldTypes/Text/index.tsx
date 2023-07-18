"use client";

import { Stack, TextInput } from "@mantine/core";
import { ReactNode } from "react";
import { UseFormReturnType } from "@mantine/form";
import FieldControlSwitch from "@/components/FieldControlSwitch";

interface Props {
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  fieldId: string;
  form: UseFormReturnType<any>;
}

const Text: React.FC<Props> = ({
  label,
  placeholder,
  required,
  icon,
  fieldId,
  form,
  disabled,
}) => {
  return (
    <div className="form_item">
      <Stack spacing={"xs"}>
        <FieldControlSwitch
          controlFlags={{
            required: required,
            disabled: disabled,
          }}
          // isVisible
        />
        <TextInput
          label={label}
          placeholder={placeholder && placeholder}
          withAsterisk={required}
          icon={icon && icon}
          {...form.getInputProps(fieldId)}
          disabled={disabled}
        />
      </Stack>
    </div>
  );
};

export default Text;
