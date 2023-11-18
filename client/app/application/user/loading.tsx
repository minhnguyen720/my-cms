"use client";
import { Loader, Center } from "@mantine/core";
import React from "react";

function Loading() {
  return (
    <Center h={"100%"}>
      <Loader variant="bars" />
    </Center>
  );
}

export default Loading;
