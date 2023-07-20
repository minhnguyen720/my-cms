import { Page } from "@/interfaces/Project";
import ProjectTableMobile from "./components/Mobile";
import useProjectTable from "./hooks";
import ProjectTableDesktop from "./components/Desktop";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  datasource: Page[];
  projectId: string;
}

const ProjectTable: React.FC<Props> = ({ datasource, projectId }) => {
  const {rows, items } = useProjectTable(
    datasource,
    projectId
  );
  const mobileTableMatches = useMediaQuery("(max-width: 512px)");

  return (
    <>
      <h4 className="mt-5 mb-3">Current active pages</h4>
      {mobileTableMatches ? (
        <ProjectTableMobile items={items} />
      ) : (
        <ProjectTableDesktop rows={rows} />
      )}
    </>
  );
};

export default ProjectTable;
