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
    projectNameId: string;
  };
}

export interface ProjectTableItem {
  _id?: string;
  name?: string;
  createdDate?: string;
  updatedDate?: string;
  createdUser?: string;
  updatedUser?: string;
  project?: string;
  active?:boolean
}

const ProjectOverallPage: React.FC<Props> = async ({ params: { projectNameId } }) => {
  try {
    const data: ProjectTableItem[] = await getProjectData(projectNameId);
    return <ProjectOverall id={projectNameId} data={data} />;
  } catch (error) {
    console.error(error);
    return <GeneralNotFound />;
  }
};

export default ProjectOverallPage;
