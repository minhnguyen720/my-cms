"use client";

import SearchBar from "@/components/SearchBar";
import { useDesktopSearch } from "@/components/SearchBar/hooks";
import { Table } from "@mantine/core";

interface Props {
  rows: JSX.Element[];
}

const ProjectTableDesktop: React.FC<Props> = ({ rows }) => {
  const { handleReset, handleSearch } = useDesktopSearch();

  return (
    <>
      <SearchBar handleReset={handleReset} handleSearch={handleSearch} />
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
    </>
  );
};

export default ProjectTableDesktop;
