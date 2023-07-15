import { Group, Switch } from "@mantine/core";
import { ChangeEvent, useState } from "react";

interface props {
  isVisible?: boolean;
  controlFlags: {
    disabled: boolean;
    required: boolean;
  };
}

function FieldControlSwitch({ isVisible, controlFlags }: props) {
  const [flags, setFlags] = useState(controlFlags);

  const handleSwitchControlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;
    setFlags((prev) => {
      return {
        ...prev,
        [name]: checked,
      };
    });
  };

  return (
    <>
      {isVisible && (
        <Group py={4} className="switch_control">
          <Switch
            label="Required"
            name="required"
            onChange={(e) => {
              handleSwitchControlChange(e);
            }}
            color="green"
            checked={flags.required}
          />
          <Switch
            label="Disabled"
            name="disabled"
            onChange={(e) => {
              handleSwitchControlChange(e);
            }}
            color="green"
            checked={flags.disabled}
          />
        </Group>
      )}
    </>
  );
}

export default FieldControlSwitch;
