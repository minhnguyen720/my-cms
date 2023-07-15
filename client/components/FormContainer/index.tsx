import { Group, ActionIcon } from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import React from "react";

function FormContainer({ children }: { children: any }) {
  return (
    <>
      <Group mb={16}>
        <ActionIcon type="submit" radius="xl" variant="filled" size={"lg"}>
          <IconDeviceFloppy size={"1.25rem"} />
        </ActionIcon>
        <ActionIcon radius="xl" variant="filled" size={"lg"}>
          <IconX size={"1.25rem"} />
        </ActionIcon>
      </Group>
      {children}
      <Group mt={16}>
        <ActionIcon type="submit" radius="xl" variant="filled" size={"lg"}>
          <IconDeviceFloppy size={"1.25rem"} />
        </ActionIcon>
        <ActionIcon radius="xl" variant="filled" size={"lg"}>
          <IconX size={"1.25rem"} />
        </ActionIcon>
      </Group>
    </>
  );
}

export default FormContainer;
