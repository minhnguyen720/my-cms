import { Stack, Box, Kbd, Modal } from "@mantine/core";
import React from "react";

interface Props {
  opened: boolean;
  close: () => void;
}

export const Tips: React.FC<Props> = ({ opened, close }) => {
  return (
    <Modal
      size={"lg"}
      centered
      opened={opened}
      onClose={close}
      title="Search bar hotkeys manual"
    >
      <Stack p={16}>
        <Box>
          <Kbd>Shift</Kbd> + <Kbd>S</Kbd>: focus search bar
        </Box>
        <Box>
          <Kbd>Shift</Kbd> + <Kbd>B</Kbd>: out focus search bar
        </Box>
        <Box>
          <Kbd>Shift</Kbd> + <Kbd>R</Kbd>: reset search result
        </Box>
        <Box>
          <Kbd>Enter</Kbd>: search
        </Box>
      </Stack>
    </Modal>
  );
};
