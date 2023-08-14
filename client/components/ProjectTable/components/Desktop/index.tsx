"use client";

import { Table } from "@mantine/core";

interface Props {
  rows: JSX.Element | JSX.Element[];
}

const ProjectTableDesktop: React.FC<Props> = ({ rows }) => {
  return (
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
  );
};

export default ProjectTableDesktop;
