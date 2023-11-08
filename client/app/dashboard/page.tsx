import { Dashboard } from "@/components/Dashboard";
import { redirect } from "next/navigation";

export const revalidate = 10;

const authenticate = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${refreshToken}`,
    };

    let response = await fetch("http://localhost:4000/auth/authenticate", {
      method: "POST",
      headers: headersList,
    });

    return response.json();
  } catch (error) {}
};

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
  const data = await authenticate();
  console.log(data);
  if (!data.isAuth) redirect("/login");
  else {
    const res = await getActiveProjectLength();
    const data = [
      { title: "Active project", value: res.activeLength.toString() },
      { title: "Deactive project", value: res.deactiveLength.toString() },
    ];
    return <Dashboard data={data} projects={res.projects} />;
  }
}
