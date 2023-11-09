"use client";

import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useGetBaseUrl from "../utilities/getUrl";
import axios from "axios";
import { errorNotification } from "../notifications/notificationPreset";

export type User = {
  userId: string;
  username: string;
  at: string;
  rt: string;
  // role: string;
};

const userAtom = atom<User | null>(null);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const assignUser = (newUser: User) => {
    setUser(newUser);
  };

  const getUser = () => {
    return user;
  };

  return { getUser, assignUser };
};

const AuthenticateUser = ({ children }) => {
  const [baseUrl] = useGetBaseUrl();
  const userHandler = useUser();
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const user = userHandler.getUser();
        if (user === null || user === undefined) {
          router.push("/login");
        }

        const headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${user?.at}`,
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
  }, [baseUrl, router, userHandler]);

  return <>{children}</>;
};

export default AuthenticateUser;
