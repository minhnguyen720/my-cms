"use client";

import { Provider } from "jotai";
import React from "react";

export default function JotaiProviders({ children }) {
  return <Provider>{children}</Provider>;
}
