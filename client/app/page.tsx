"use client";

import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  const data = [
    { title: "Active project", value: "3" },
    { title: "Deactive project", value: "0" },
  ];

  return <Dashboard data={data} />;
}
