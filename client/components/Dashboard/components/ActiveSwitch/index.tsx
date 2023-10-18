import useAlert from "@/components/Alert/hooks";
import { ALERT_CODES } from "@/constant";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import { Navlink } from "@/interfaces/NavLink";
import { Switch, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { statAtom } from "../../atoms";

interface Props {
  element: Navlink;
  onChange?: (any?: any) => any;
}

const ActiveSwitch: React.FC<Props> = ({ element, onChange }) => {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(element.active);
  const { showLoading, hideLoading } = useLoading();
  const [baseUrl] = useGetBaseUrl();
  const { openAlert } = useAlert();
  const setStatData = useSetAtom(statAtom);

  const handleOnChange = async (event) => {
    try {
      showLoading();
      setChecked(event.currentTarget.checked);

      if (onChange) onChange();

      const res = await axios.put(`${baseUrl}/project/active/toggle`, {
        id: event.currentTarget.id,
        value: event.currentTarget.checked,
      });
      const newStat = [
        { title: "Active project", value: res.data.activeLength.toString() },
        {
          title: "Deactive project",
          value: res.data.deactiveLength.toString(),
        },
      ];
      setStatData(newStat);
      if (res.data.success) {
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
