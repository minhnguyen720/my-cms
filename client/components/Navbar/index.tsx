import React, { useEffect, useState } from "react";
import { Divider, Navbar as MantineNavbar } from "@mantine/core";
import NavLink from "@/components/NavLink";
import { IconHome2, IconBook } from "@tabler/icons-react";
import UserFooter from "../UserFooter";

interface props {
  hidden: boolean;
  hiddenBreakpoint: string;
  handleCurrentMenu: (menu: string) => void;
}

interface iNavlink {
  icon?: JSX.Element | any;
  label: string;
  href?: string;
  children?: iNavlink[];
}

const projects: iNavlink[] = [
  {
    label: "Champions",
    href: "/project/chmp",
  },
  { label: "CLV Homepage", href: "/project/clgh" },
  { label: "Asset Management", href: "/project/asm" },
];

const navbarData: iNavlink[] = [
  { icon: IconHome2, href: "/", label: "Home" },
  { icon: IconBook, label: "Projects", children: projects },
];

function Navbar({ hidden, hiddenBreakpoint, handleCurrentMenu }: props) {
  const [active, setActive] = useState<number | undefined>(0);
  const [isMenuFocus, setIsMenuFocus] = useState<boolean>(true);

  useEffect(() => {
    if (!isMenuFocus) setActive(undefined);
  }, [isMenuFocus]);

  return (
    <MantineNavbar
      width={{ sm: 200, lg: 300 }}
      p="xs"
      hidden={hidden}
      hiddenBreakpoint={hiddenBreakpoint}
    >
      <MantineNavbar.Section grow mt={"md"}>
        {navbarData.map((item, index) => {
          return (
            <NavLink
              active={index === active}
              icon={<item.icon />}
              href={item.href ? item.href : ""}
              label={item.label}
              key={index}
              handleActive={() => {
                handleCurrentMenu(item.label);
                setActive(index);
                setIsMenuFocus(true);
              }}
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
        <UserFooter
          name="Walter White"
          src="https://i.pinimg.com/564x/61/a6/a7/61a6a7a95da03f34242d3a70a73d2f4b.jpg"
          id="heisenberg"
          setIsMenuFocus={setIsMenuFocus}
          handleCurrentMenu={handleCurrentMenu}
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export default Navbar;
