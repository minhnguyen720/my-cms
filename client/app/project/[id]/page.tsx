import { GeneralNotFound } from "@/components/GeneralNotFound";
import ProjectOverall from "@/components/ProjectOverall";

export const revalidate = 10;

async function getProjectData(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/page/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
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
    id: string;
  };
}

export interface ProjectTableItem {
  _id?: string;
  id?: string;
  createdDate?: string;
  updatedDate?: string;
  createdUser?: string;
  updatedUser?: string;
  superAdminId?: string;
  name?: string;
  pages?: {
    id?: string;
    name?: string;
    createdDate?: string;
    updatedDate?: string;
    createdUser?: string;
    updatedUser?: string;
    project?: string;
  }[];
}

const ProjectOverallPage: React.FC<Props> = async ({ params: { id } }) => {
  try {
    const data: ProjectTableItem = await getProjectData(id);
    return <ProjectOverall id={id} data={data} />;
  } catch (error) {
    console.error(error);
    return <GeneralNotFound />;
  }
};

export default ProjectOverallPage;
