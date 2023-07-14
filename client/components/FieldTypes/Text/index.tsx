"use client";

import { Stack, TextInput } from "@mantine/core";
import { ReactNode } from "react";
import { UseFormReturnType } from "@mantine/form";
import FieldControlSwitch from "@/components/FieldControlSwitch";

interface props {
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: ReactNode;
  fieldId: string;
  form: UseFormReturnType<any>;
}

const Text = ({ label, placeholder, required, icon, fieldId, form }: props) => {
  return (
    <div className="form_item">
      <Stack spacing={"xs"}>
        <FieldControlSwitch />
        <TextInput
          label={label}
          placeholder={placeholder && placeholder}
          withAsterisk={required}
          icon={icon && icon}
          {...form.getInputProps(fieldId)}
        />
      </Stack>
    </div>
  );
};

export default Text;
