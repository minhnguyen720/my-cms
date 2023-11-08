"use client";

import React from "react";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

const RootLayoutContainer = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
};

export default RootLayoutContainer;
