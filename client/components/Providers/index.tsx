"use client";

import { Provider } from "jotai";

export default function JotaiProviders({ children }) {
  return <Provider>{children}</Provider>;
}
