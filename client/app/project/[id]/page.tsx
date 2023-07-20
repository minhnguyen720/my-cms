import ProjectOverall from "@/components/ProjectOverall";
import ProjectTableDataProvider from "@/components/ProjectOverall/context";

interface Props {
  params: {
    id: string;
  };
}

const ProjectOverallPage: React.FC<Props> = ({ params: { id } }) => {
  return (
    <ProjectTableDataProvider id={id}>
      <ProjectOverall />
    </ProjectTableDataProvider>
  );
};

export default ProjectOverallPage;
