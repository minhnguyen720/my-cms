import { ActionIcon } from "@mantine/core";
import React, { useState } from "react";
import Checkmark from "./Checkmark/index";
import { IconDeviceFloppy } from "@tabler/icons-react";

const SaveButton = () => {
  const [isClick, setIsClick] = useState<boolean>(false);

  return (
    // <ActionIcon
    //   variant="transparent"
    //   onClick={() => {
    //     if (!isClick) setIsClick(true);
    //   }}
    //   className={`${isClick ? "cursor-default" : "cursor-pointer"}`}
    // >
    //   {isClick ? (
    //     <Checkmark isClick={isClick} setIsClick={setIsClick} />
    //   ) : (
    //     <IconDeviceFloppy size={28} />
    //   )}
    // </ActionIcon>
    <ActionIcon>
      <IconDeviceFloppy size={28} />
    </ActionIcon>
  );
};

export default SaveButton;
