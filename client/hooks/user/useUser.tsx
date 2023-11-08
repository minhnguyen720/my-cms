"use client";

import { useLocalStorage } from "@mantine/hooks";
import { atom, useAtom, useSetAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const userAtom = atom<
  | {
      username: string;
      role: string;
    }
  | boolean
>(false);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const getUser = () => {
    return user;
  }

  return {getUser, updateUser };
};

const AuthenticateUser = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) redirect("/login");
  }, []);

  return <>{children}</>;
};

export default AuthenticateUser;
