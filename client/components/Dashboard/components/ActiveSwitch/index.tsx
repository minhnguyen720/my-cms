import useLoading from "@/hooks/utilities/useLoading";
import { Navlink } from "@/interfaces/NavLink";
import { Switch, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

interface Props {
  element?: Navlink | { id: string; active: boolean };
  onChange?: (any?: any) => Promise<any>;
}

const ActiveSwitch: React.FC<Props> = ({ element, onChange }) => {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(element.active);
  const { showLoading, hideLoading } = useLoading();

  const handleOnChange = async (event) => {
    try {
      showLoading();
      setChecked(event.currentTarget.checked);

      if (onChange) await onChange();
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <Switch
      id={element.id}
      onChange={handleOnChange}
      color="teal"
      size="md"
      checked={checked}
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
