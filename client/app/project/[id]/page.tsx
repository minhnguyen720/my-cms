import ProjectOverall from "@/components/ProjectOverall";

interface Props {
  params: {
    id: string;
  };
}

const ProjectOverallPage: React.FC<Props> = ({ params: { id } }) => {
  return <ProjectOverall id={id}/>;
};

export default ProjectOverallPage;
