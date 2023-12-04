"use client";

import { usePathname, useRouter } from "next/navigation";
import useGetBaseUrl from "../utilities/getUrl";
import axios from "axios";
import { errorNotification } from "../notifications/notificationPreset";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export type User = {
  userId: string;
  name: string;
  at: string;
  rt: string;
  avatar: string;
  // role: string;
};

const AuthenticateUser = ({ children }) => {
  const [baseUrl] = useGetBaseUrl();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        localStorage.setItem("currentPage", pathname);
        const at = getCookie("at");
        if (at?.trim().length === 0 || at === null || at === undefined) {
          router.push("/authenticate");
        }

        const headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${at}`,
        };

        const reqOptions = {
          url: `${baseUrl}/auth/authenticate`,
          method: "POST",
          headers: headersList,
        };

        const res = await axios.request(reqOptions);
        if (res.data.isAuth) {
          const currentPath = localStorage.getItem("currentPage");
          router.push(
            currentPath !== null ? currentPath : "/application/dashboard",
          );
        } else {
          errorNotification("Unauthorized");
        }
      } catch (error) {
        errorNotification("Unauthorized");
        setTimeout(() => {
          router.push("/authenticate");
        }, 2100);
      }
    };

    authenticateUser();
  }, [baseUrl, pathname, router]);

  return <>{children}</>;
};

export default AuthenticateUser;
