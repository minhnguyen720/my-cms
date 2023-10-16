import { Dashboard } from "@/components/Dashboard";

export const revalidate = 10;

const getActiveProjectLength = async () => {
  try {
    const res = await fetch("http://localhost:4000/project/dashboard-stat", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return {
      activeLength: 0,
      deactiveLength: 0,
    };
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
