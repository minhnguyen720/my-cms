"use client";

import React from "react";
import { Notifications } from "@mantine/notifications";

const RootLayoutContainer = ({ children }) => {
  return (
    <>
      <Notifications />
      {children}
    </>
  );
};

export default RootLayoutContainer;
