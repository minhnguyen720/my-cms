import { Avatar, Box, NavLink } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

interface props {
  src: string;
  name: string;
}

function UserFooter({ src, name }: props) {
  return (
    <Box py={"sm"}>
      <NavLink
        icon={<Avatar src={src} alt="user footer avatar" radius={"xl"} />}
        label={name}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      />
    </Box>
  );
}

export default UserFooter;
