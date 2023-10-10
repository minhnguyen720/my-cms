"use client";

import { TextInput, Drawer, ActionIcon, Group, Button } from "@mantine/core";
import { ReactNode } from "react";
import { UseFormReturnType } from "@mantine/form";
import FieldControlSwitch from "@/components/FieldControlSwitch";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings2 } from "@tabler/icons-react";

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

  const Config = (
    <div className="w-fit">
      <Drawer opened={opened} onClose={close} title="Field controller">
        <FieldControlSwitch
          controlFlags={{
            required: required,
            active: !active,
          }}
          isVisible
        />

        <Group position="right" className="mt-8">
          <Button>Apply</Button>
          <Button color="red">Cancel</Button>
        </Group>
      </Drawer>
      <ActionIcon onClick={open}>
        <IconSettings2 />
      </ActionIcon>
    </div>
  );

  return (
      <TextInput
        label={label}
        placeholder={placeholder && placeholder}
        withAsterisk={required}
        icon={icon && icon}
        disabled={!active}
        rightSection={Config}
        {...form.getInputProps(fieldId)}
      />
  );
};

export default Text;
