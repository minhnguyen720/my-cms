import { Group, Switch } from "@mantine/core";
import { ChangeEvent, useState } from "react";

function FieldControlSwitch({ isVisible }: { isVisible?: boolean }) {
  const [controlFlags, setControlFlags] = useState({
    required: false,
    disabled: false,
  });

  const handleSwitchControlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;
    setControlFlags((prev) => {
      return {
        ...prev,
        [name]: checked,
      };
    });
  };

  return (
    <>
      {isVisible && (
        <Group>
          <Switch
            label="Required"
            name="required"
            onChange={(e) => {
              handleSwitchControlChange(e);
            }}
            color="green"
            checked={controlFlags.required}
          />
          <Switch
            label="Disabled"
            name="disabled"
            onChange={(e) => {
              handleSwitchControlChange(e);
            }}
            color="green"
            checked={controlFlags.disabled}
          />
        </Group>
      )}
    </>
  );
}

export default FieldControlSwitch;
