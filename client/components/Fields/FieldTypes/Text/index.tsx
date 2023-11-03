"use client";

import { TextInput } from "@mantine/core";
import { ReactNode } from "react";
import { UseFormReturnType } from "@mantine/form";
import Config from "../../Config";

interface Props {
  label: string;
  placeholder?: string;
  required?: boolean;
  active?: boolean;
  icon?: ReactNode;
  fieldId: string;
  form: UseFormReturnType<any>;
  fieldHandler: any;
  value?: any;
}

const Text: React.FC<Props> = ({
  label,
  placeholder,
  required,
  icon,
  fieldId,
  form,
  active,
  fieldHandler,
  value,
}) => {
  return (
    <div className="flex">
      <TextInput
        className="basis-[90%]"
        label={label}
        placeholder={placeholder && placeholder}
        withAsterisk={required}
        icon={icon && icon}
        disabled={!active}
        defaultValue={value}
        {...form.getInputProps(fieldId)}
      />
      <div className="ml-2 flex items-end">
        <Config
          required={required}
          active={active}
          fieldId={fieldId}
          fieldHandler={fieldHandler}
        />
      </div>
    </div>
  );
};

export default Text;
