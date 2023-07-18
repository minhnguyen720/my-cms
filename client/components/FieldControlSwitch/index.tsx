import { Group, Switch, Box } from "@mantine/core";
import { ChangeEvent, useState } from "react";

interface Props {
  isVisible?: boolean;
  controlFlags: {
    disabled: boolean;
    required: boolean;
  };
}

const FieldControlSwitch: React.FC<Props> = ({ isVisible, controlFlags }) => {
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
    <Box className="switch_container">
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
    </Box>
  );
};

export default FieldControlSwitch;
