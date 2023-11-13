import { SetStateAction, useEffect, useState } from "react";
import { Divider, Navbar as MantineNavbar } from "@mantine/core";
import NavLink from "@/components/NavLink";
import { IconHome2, IconKey } from "@tabler/icons-react";
import UserFooter from "../UserFooter";
import { Navlink } from "@/interfaces/NavLink";
import { userData } from "@/static/dummyUser";
import { useLocalStorage } from "@mantine/hooks";

interface Props {
  hidden: boolean;
  hiddenBreakpoint: string;
  handleCurrentMenu: (menu: number) => void;
  currentMenu: number;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}

const navbarData: Navlink[] = [
  { icon: IconHome2, href: "/application/dashboard", label: "Dashboard" },
  { icon: IconKey, href: "/application/key", label: "Key Management" },
];

const Navbar: React.FC<Props> = ({ hidden, hiddenBreakpoint }) => {
  return (
    <MantineNavbar
      width={{ sm: 200, lg: 250 }}
      p="xs"
      hidden={hidden}
      hiddenBreakpoint={hiddenBreakpoint}
    >
      <MantineNavbar.Section grow mt={"md"}>
        {navbarData.map((item, index) => {
          return (
            <NavLink
              icon={<item.icon />}
              href={item.href ? item.href : ""}
              label={item.label}
              key={index}
            >
              {item.children &&
                item.children?.length > 0 &&
                item.children.map((el) => {
                  return (
                    <NavLink
                      key={el.href}
                      label={el.label}
                      href={el.href ? el.href : ""}
                    />
                  );
                })}
            </NavLink>
          );
        })}
      </MantineNavbar.Section>
      <Divider />
      <MantineNavbar.Section>
        <UserFooter userData={userData} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
