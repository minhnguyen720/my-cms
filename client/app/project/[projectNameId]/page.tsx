import { GeneralNotFound } from "@/components/GeneralNotFound";
import ProjectOverall from "@/components/ProjectOverall";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const revalidate = 10;

async function getProjectData(id: string) {
  const cookieJar = cookies();
  try {
    const at = cookieJar.get("at")?.value;

    if (at === undefined || at?.length === 0) redirect("/authenticate");

    const res = await fetch(`http://localhost:4000/page/${id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${at}`,
      },
    });

    if (res.status === 401) redirect("authenticate");
    else if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface Props {
  params: {
    projectNameId: string;
  };
}

export interface ProjectTableItem {
  _id?: string;
  name?: string;
  createdDate?: string;
  updatedDate?: string;
  createdUser: {
    username: string;
  };
  updatedUser: {
    username: string;
  };
  project?: string;
  active?: boolean;
}

const ProjectOverallPage: React.FC<Props> = async ({
  params: { projectNameId },
}) => {
  try {
    const data: ProjectTableItem[] = await getProjectData(projectNameId);
    return <ProjectOverall id={projectNameId} data={data} />;
  } catch (error) {
    console.error(error);
    return <GeneralNotFound />;
  }
};

export default ProjectOverallPage;
