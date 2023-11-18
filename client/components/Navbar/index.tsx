"use client";

import { SetStateAction, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Navbar as MantineNavbar,
  Text,
} from "@mantine/core";
import NavLink from "@/components/NavLink";
import { IconHome2, IconKey, IconUser, IconLogout } from "@tabler/icons-react";
import { Navlink } from "@/interfaces/NavLink";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import { errorNotification } from "@/hooks/notifications/notificationPreset";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { atom, useAtom } from "jotai";
import { User } from "@/interfaces/User";

interface Props {
  hidden: boolean;
  handleCurrentMenu: (menu: number) => void;
  currentMenu: number;
  hiddenBreakpoint: string;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}

const navbarData: Navlink[] = [
  { icon: IconUser, href: "/application/user", label: "Account" },
  { icon: IconHome2, href: "/application/dashboard", label: "Home" },
  { icon: IconKey, href: "/application/key", label: "Key Management" },
];

export const userAtom = atom<User | boolean>(false);
export const userAsyncAtom = atom(null, async (get, set) => {
  const profileRes = await fetch(`http://localhost:4000/auth/profile/atom`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${getCookie("at")}`,
    },
  });
  const profileObj = await profileRes.json();
  set(userAtom, profileObj);
});

const Navbar: React.FC<Props> = ({ hidden, setOpened }) => {
  const [baseUrl] = useGetBaseUrl();
  const router = useRouter();
  const at = getCookie("at");
  const [user] = useAtom(userAtom);
  const [, updateUser] = useAtom(userAsyncAtom);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  const handleSignout = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/auth/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.status === 200) {
        deleteCookie("at");
        router.push("/authenticate");
      } else {
        errorNotification("Something went wrong. Please try again");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      className="absolute z-[100] h-fit w-full bg-[#16171a] p-6"
      hidden={hidden}
    >
      {user !== null && typeof user !== "boolean" && (
        <Group className="mb-4 ml-4 w-fit">
          <Avatar src={user.avatar} />
          <Text>{user.name}</Text>
        </Group>
      )}
      {navbarData.map((item, index) => {
        return (
          <NavLink
            icon={<item.icon />}
            href={item.href ? item.href : ""}
            label={item.label}
            key={index}
            setOpened={setOpened}
          >
            {item.children &&
              item.children?.length > 0 &&
              item.children.map((el) => {
                return (
                  <NavLink
                    key={el.href}
                    label={el.label}
                    href={el.href ? el.href : ""}
                    setOpened={setOpened}
                  />
                );
              })}
          </NavLink>
        );
      })}
      <Divider className="my-3" />
      <Button
        leftIcon={<IconLogout />}
        variant="subtle"
        color="red"
        onClick={handleSignout}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default Navbar;
