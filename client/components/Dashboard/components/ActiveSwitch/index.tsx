import useAlert from "@/components/Alert/hooks";
import { ALERT_CODES } from "@/constant";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import { Navlink } from "@/interfaces/NavLink";
import { Switch, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  element: Navlink;
}

const ActiveSwitch: React.FC<Props> = ({ element }) => {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(element.active);
  const { showLoading, hideLoading } = useLoading();
  const [baseUrl] = useGetBaseUrl();
  const { openAlert } = useAlert();

  const handleOnChange = async (event) => {
    try {
      showLoading();
      setChecked(event.currentTarget.checked);
      const res = await axios.put(`${baseUrl}/project/active/toggle`, {
        id: event.currentTarget.id,
        value: event.currentTarget.checked
      });
      if (res.data) {
        openAlert("Deactive successful", ALERT_CODES.SUCCESS);
      } else {
        openAlert("Deactive failed", ALERT_CODES.ERROR);
      }
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
