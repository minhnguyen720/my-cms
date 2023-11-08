"use client";

import { Loader } from "@mantine/core";

function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#1A1B1E]">
      <Loader variant="bars" />
    </div>
  );
}

export default Loading;
