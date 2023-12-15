"use client";

import { Paper, TextInput, Textarea } from "@mantine/core";
import { ReactNode } from "react";
import { UseFormReturnType } from "@mantine/form";
import Config from "../../Config";
import dayjs from "dayjs";
import FieldHeader from "../../FieldHeader";

interface Props {
  label?: string;
  placeholder?: string;
  required?: boolean;
  active?: boolean;
  icon?: ReactNode;
  fieldId?: string;
  form?: UseFormReturnType<any>;
  fieldHandler?: any;
  value?: any;
  updatedDate: string;
  createdDate: string;
  id: string;
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
  updatedDate,
  createdDate,
  id,
}) => {
  return (
    <>
      {form && fieldId && (
        <div>
          <FieldHeader
            fieldId={fieldId}
            label={label}
            createdDate={createdDate}
            updatedDate={updatedDate}
          />
          <div className="flex">
            {/* <TextInput
            className="basis-[90%]"
            label={label}
            placeholder={placeholder && placeholder}
            withAsterisk={required}
            icon={icon && icon}
            disabled={!active}
            defaultValue={value}
            {...form.getInputProps(fieldId)}
          /> */}
            <Textarea
              className="basis-[90%]"
              autosize
              // label={label}
              placeholder={placeholder && placeholder}
              maxRows={20}
              size="lg"
              withAsterisk={required}
              icon={icon && icon}
              disabled={!active}
              defaultValue={value}
              {...form.getInputProps(id)}
            />
            <div className="ml-2 flex items-end">
              <Config
                required={required}
                active={active}
                fieldId={fieldId}
                fieldHandler={fieldHandler}
                id={id}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Text;
