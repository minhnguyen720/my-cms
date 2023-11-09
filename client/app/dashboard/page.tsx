import { Dashboard } from "@/components/Dashboard";
import { redirect } from "next/navigation";

export const revalidate = 10;

const getActiveProjectLength = async () => {
  try {
    console.log(localStorage.getItem("at"));
    const res = await fetch("http://localhost:4000/project/dashboard-stat", {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem("at")}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    redirect("/authenticate");
  }
};

export default async function Home() {
  const res = await getActiveProjectLength();
  const data = [
    { title: "Active project", value: res.activeLength.toString() },
    { title: "Deactive project", value: res.deactiveLength.toString() },
  ];
  return <Dashboard data={data} projects={res.projects} />;
}
