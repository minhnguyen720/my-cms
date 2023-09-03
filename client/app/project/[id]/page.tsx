import ProjectOverall from "@/components/ProjectOverall";

async function getProjectData(id: string) {
  const res = await fetch(`http://localhost:4000/page/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Props {
  params: {
    id: string;
  };
}

const ProjectOverallPage: React.FC<Props> = async ({ params: { id } }) => {
  const data = await getProjectData(id);
  return <ProjectOverall id={id} data={data}/>;
};

export default ProjectOverallPage;
