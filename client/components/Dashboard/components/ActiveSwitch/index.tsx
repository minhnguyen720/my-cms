import { iNavlink } from "@/interfaces/NavLink";
import { Switch, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

interface Props {
  element: iNavlink;
  onChange?: (any?: any) => any;
}

const ActiveSwitch: React.FC<Props> = ({ element, onChange }) => {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState();
  const handleOnChange = (event) => {
    setChecked(event.currentTarget.checked);
    console.log(event.currentTarget.id);
    if (onChange) onChange();
  };

  return (
    <Switch
      id={element.id}
      onChange={handleOnChange}
      color="teal"
      size="md"
      thumbIcon={
        checked ? (
          <IconCheck
            size="0.8rem"
            color={theme.colors.teal[theme.fn.primaryShade()]}
            stroke={3}
          />
        ) : (
          <IconX
            size="0.8rem"
            color={theme.colors.red[theme.fn.primaryShade()]}
            stroke={3}
          />
        )
      }
    />
  );
};

export default ActiveSwitch;
