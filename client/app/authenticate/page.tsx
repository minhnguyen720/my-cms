"use client";

import { Signin } from "@/components/Authenticate/Signin";
import { Signup } from "@/components/Authenticate/Signup";
import SignupConfirm from "@/components/Authenticate/SignupConfirm";
import { Box, Center, Loader, SegmentedControl, Title } from "@mantine/core";
import React, { useState } from "react";

const Authenticate = () => {
  const [value, setValue] = useState("signin");
  const [signupData, setSignupData] = useState();

  const view = {
    signin: <Signin setView={setValue} />,
    signup: <Signup setView={setValue} setSignupData={setSignupData} />,
    confirm: <SignupConfirm signupData={signupData} setView={setValue} />,
    loading: (
      <Center className="h-screen">
        <Loader variant="bars" />
      </Center>
    ),
  };

  return (
    <Box
      className="absolute left-1/2 top-1/2 w-[80%] md:w-[60%] lg:w-[40%]"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {value !== "confirm" && value !== "loading" && (
        <>
          <Title className="mb-5 animate-textFadeIn">Welcome to myCMS</Title>
          <SegmentedControl
            value={value}
            className="mb-2 w-full"
            onChange={setValue}
            data={[
              { label: "Sign in", value: "signin" },
              { label: "Sign up", value: "signup" },
            ]}
          />
        </>
      )}
      {view[value]}
    </Box>
  );
};

export default Authenticate;
