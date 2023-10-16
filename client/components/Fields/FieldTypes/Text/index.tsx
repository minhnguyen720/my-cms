"use client";

import { TextInput, Modal, ActionIcon, Group, Button } from "@mantine/core";
import { ReactNode } from "react";
import { UseFormReturnType } from "@mantine/form";
import FieldControlSwitch from "@/components/Fields/FieldControlSwitch";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings2 } from "@tabler/icons-react";
import Config from "../../Config";

interface Props {
  label: string;
  placeholder?: string;
  required?: boolean;
  active?: boolean;
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
  active,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <TextInput
      label={label}
      placeholder={placeholder && placeholder}
      withAsterisk={required}
      icon={icon && icon}
      disabled={!active}
      rightSection={<Config required={required} active={active} />}
      {...form.getInputProps(fieldId)}
    />
  );
};

export default Text;
