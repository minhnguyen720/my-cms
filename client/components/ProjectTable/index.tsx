import { Table } from "@mantine/core";
import { Page } from "@/interfaces/Project";
import ProjectTableMobile from "./Mobile";
import useProjectTable from "./hooks";

interface Props {
  datasource: Page[];
  projectId: string;
}

const ProjectTable: React.FC<Props> = ({ datasource, projectId }) => {
  const { mobileTableMatches, rows, items } = useProjectTable(
    datasource,
    projectId
  );

  return (
    <>
      <h4 className="mt-5 mb-3">Current active pages</h4>
      {mobileTableMatches ? (
        <ProjectTableMobile items={items} />
      ) : (
        <Table highlightOnHover verticalSpacing="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created date</th>
              <th>Updated date</th>
              <th>Created user</th>
              <th>Updated user</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </>
  );
};

export default ProjectTable;
