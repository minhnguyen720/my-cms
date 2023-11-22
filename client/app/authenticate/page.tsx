"use client";

import ForgetPassword from "@/components/Authenticate/ForgetPassword";
import { Signin } from "@/components/Authenticate/Signin";
import { Signup } from "@/components/Authenticate/Signup";
import SignupConfirm from "@/components/Authenticate/SignupConfirm";
import { Box, Center, Loader, SegmentedControl, Title } from "@mantine/core";
import React, { useState } from "react";

export type AuthenticateView =
  | "signin"
  | "forget"
  | "signup"
  | "confirm"
  | "loading";

const Authenticate = () => {
  const [viewName, setViewName] = useState<AuthenticateView>("signin");
  const [signupData, setSignupData] = useState();

  const view = {
    signin: <Signin setView={setViewName} />,
    forget: <ForgetPassword setView={setViewName} />,
    signup: <Signup setView={setViewName} setSignupData={setSignupData} />,
    confirm: <SignupConfirm signupData={signupData} setView={setViewName} />,
    loading: (
      <Center className="h-screen">
        <Loader variant="bars" />
      </Center>
    ),
  };

  const rotateSigninSignup = (value: AuthenticateView) => {
    setViewName(value);
  };

  return (
    <Box
      className="absolute left-1/2 top-1/2 w-[80%] md:w-[60%] lg:w-[40%]"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {viewName === "signup" ||
        (viewName === "signin" && (
          <>
            <Title className="mb-5 animate-textFadeIn">Welcome to myCMS</Title>
            <SegmentedControl
              value={viewName}
              className="mb-2 w-full"
              onChange={(value: AuthenticateView) => rotateSigninSignup(value)}
              data={[
                { label: "Sign in", value: "signin" },
                { label: "Sign up", value: "signup" },
              ]}
            />
          </>
        ))}
      {view[viewName]}
    </Box>
  );
};

export default Authenticate;
