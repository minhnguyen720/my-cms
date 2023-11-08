"use client";

import { useLocalStorage } from "@mantine/hooks";
import { atom, useAtom, useSetAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import useGetBaseUrl from "../utilities/getUrl";
import axios from "axios";

const userAtom = atom<
  | {
      userId: string;
      username: string;
      // role: string;
    }
  | boolean
>(false);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const asignUser = (newUser) => {
    setUser(newUser);
  };

  const getUser = () => {
    return user;
  };

  return { getUser, asignUser };
};

const AuthenticateUser = ({ children }) => {
  const [baseUrl] = useGetBaseUrl();

  useEffect(() => {
    const authenticateUser = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${refreshToken}`,
      };

      let reqOptions = {
        url: `${baseUrl}/auth/authenticate`,
        method: "POST",
        headers: headersList,
      };

      const res = await axios.request(reqOptions);
      if (!res.data.isAuth) redirect("/login");
    };

    authenticateUser();
  }, [baseUrl]);

  return <>{children}</>;
};

export default AuthenticateUser;
