"use client";
import { Loader, Center } from "@mantine/core";

function Loading() {
  return (
    <Center h={"100%"}>
      <Loader variant="bars" />
    </Center>
  );
}

export default Loading;
