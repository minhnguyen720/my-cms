import { Dashboard } from "@/components/Dashboard";

const getActiveProjectLength = async () => {
  const res = await fetch("http://localhost:4000/project/dashboard-stat");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default async function Home() {
  const res = await getActiveProjectLength();
  const data = [
    { title: "Active project", value: res.activeLength.toString() },
    { title: "Deactive project", value: res.deactiveLength.toString() },
  ];

  return <Dashboard data={data} />;
}
