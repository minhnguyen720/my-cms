import AuthenticateUser from "@/hooks/user/useUser";
import { Open_Sans } from "next/font/google";
import React from "react";

const opensan = Open_Sans({ subsets: ["latin"] });

const Main = () => {
  return (
    <AuthenticateUser>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#1A1B1E]">
        <div className={`mb-10 text-center text-white ${opensan.className}`}>
          <p className="mb-2 animate-pulse text-[3rem]">Welcome to myCMS</p>
          <p className="animate-pulse text-[1.25rem]">Please wait...</p>
        </div>
      </div>
    </AuthenticateUser>
  );
};

export default Main;
