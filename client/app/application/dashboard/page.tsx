import { Dashboard } from "@/components/Dashboard";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const getActiveProjectLength = async () => {
  revalidatePath("/application/dashboard");
  const cookieJar = cookies();
  try {
    const at = cookieJar.get("at")?.value;
    const res = await fetch("http://localhost:4000/project/dashboard-stat", {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${at}`,
      },
    });
    if (res.status === 401) redirect("/authenticate");
    else if (!res.ok && res.status !== 401)
      throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
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
