import { useEffect, useState } from "react";
import { Divider, Navbar as MantineNavbar } from "@mantine/core";
import NavLink from "@/components/NavLink";
import { IconHome2, IconBook } from "@tabler/icons-react";
import UserFooter from "../UserFooter";
import { iNavlink } from "@/interfaces/NavLink";
import { userData } from "@/static/dummyUser";
import { useLocalStorage } from "@mantine/hooks";

interface Props {
  hidden: boolean;
  hiddenBreakpoint: string;
  handleCurrentMenu: (menu: string) => void;
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

const Navbar: React.FC<Props> = ({ hidden, hiddenBreakpoint, handleCurrentMenu }) => {
  const [active, setActive] = useState<number | undefined>(0);
  const [isMenuFocus, setIsMenuFocus] = useLocalStorage({
    key: "isMenuFocus",
    defaultValue: true,
  });

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
          userData={userData}
          setIsMenuFocus={setIsMenuFocus}
          handleCurrentMenu={handleCurrentMenu}
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export default Navbar;
