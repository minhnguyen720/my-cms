import React from "react";
import { Divider, Navbar as MantineNavbar } from "@mantine/core";
import NavLink from "@/components/NavLink";
import { IconHome2, IconBook } from "@tabler/icons-react";
import UserFooter from "../UserFooter";

interface props {
  hidden: boolean;
  hiddenBreakpoint: string;
}

function Navbar({ hidden, hiddenBreakpoint }: props) {
  return (
    <MantineNavbar
      width={{ sm: 200, lg: 300 }}
      p="xs"
      hidden={hidden}
      hiddenBreakpoint={hiddenBreakpoint}
    >
      <MantineNavbar.Section grow mt={"md"}>
        <NavLink icon={<IconHome2 />} href="/" label="Home" />
        <NavLink icon={<IconBook />} href="/" label="Documents" />
      </MantineNavbar.Section>
      <Divider />
      <MantineNavbar.Section>
        <UserFooter
          name="Walter White"
          src="https://i.pinimg.com/564x/61/a6/a7/61a6a7a95da03f34242d3a70a73d2f4b.jpg"
          id="heisenberg"
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export default Navbar;
