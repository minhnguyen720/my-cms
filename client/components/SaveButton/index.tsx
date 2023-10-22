import { ActionIcon } from "@mantine/core";
import React from "react";
import { IconDeviceFloppy } from "@tabler/icons-react";

const SaveButton = () => {
  return (
    <ActionIcon>
      <IconDeviceFloppy size={28} />
    </ActionIcon>
  );
};

export default SaveButton;
