import React from "react";
import { Divider, Navbar as MantineNavbar } from "@mantine/core";
import NavLink from "@/components/NavLink";
import { IconHome2, IconBook } from "@tabler/icons-react";

import UserFooter from "../UserFooter";

function Navbar() {
  return (
    <MantineNavbar width={{ base: 300 }} p="xs">
      <MantineNavbar.Section grow mt={"md"}>
        <NavLink icon={<IconHome2 />} href="/" label="Home" />
        <NavLink icon={<IconBook />} href="/" label="Home" />
      </MantineNavbar.Section>
      <Divider />
      <MantineNavbar.Section>
        <UserFooter
          name="Walter White"
          src="https://i.pinimg.com/564x/61/a6/a7/61a6a7a95da03f34242d3a70a73d2f4b.jpg"
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export default Navbar;
