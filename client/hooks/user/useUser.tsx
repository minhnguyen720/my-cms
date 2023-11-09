"use client";

import { atom, useAtom } from "jotai";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import useGetBaseUrl from "../utilities/getUrl";
import useTokens from "../tokens/useTokens";
import axios from "axios";
import { errorNotification } from "../notifications/notificationPreset";

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
  const tokenHandler = useTokens();
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const refreshToken = tokenHandler.getRt();
        if (refreshToken === null || refreshToken === undefined) {
          router.push("/login");
        }

        const headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${refreshToken}`,
        };

        const reqOptions = {
          url: `${baseUrl}/auth/authenticate`,
          method: "POST",
          headers: headersList,
        };

        await axios.request(reqOptions);
      } catch (error) {
        errorNotification("Unauthorized");
        setTimeout(() => {
          router.push("/login");
        }, 2100);
      }
    };

    authenticateUser();
  }, [baseUrl, tokenHandler]);

  return <>{children}</>;
};

export default AuthenticateUser;
