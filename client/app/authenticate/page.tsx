"use client";

import { Signin } from "@/components/Authenticate/Signin";
import { Signup } from "@/components/Authenticate/Signup";
import { Box, SegmentedControl, Title } from "@mantine/core";
import React, { useState } from "react";

const Authenticate = () => {
  const [value, setValue] = useState("signin");

  const view = {
    signin: <Signin />,
    signup: <Signup />,
  };

  return (
    <Box
      className="absolute left-1/2 top-1/2 w-[80%] md:w-[60%] lg:w-[40%]"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <Title className="animate-textFadeIn mb-5">Welcome to myCMS</Title>
      <SegmentedControl
        value={value}
        className="mb-2 w-full"
        onChange={setValue}
        data={[
          { label: "Sign in", value: "signin" },
          { label: "Sign up", value: "signup" },
        ]}
      />
      {view[value]}
    </Box>
  );
};

export default Authenticate;
