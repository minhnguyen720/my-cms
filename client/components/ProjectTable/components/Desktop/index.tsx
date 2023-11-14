"use client";

import { Table } from "@mantine/core";
import { useState } from "react";

interface Props {
  rows: JSX.Element | JSX.Element[];
}

const ProjectTableDesktop: React.FC<Props> = ({ rows }) => {
  const [columns, setColumns] = useState([
    "Name",
    "Page ID",
    "Created date",
    "Updated date",
    "Created user",
    "Updated user",
    "Status",
    // empty item is for setting button
    "",
  ]);

  return (
    <Table highlightOnHover verticalSpacing="md">
      <thead>
        <tr>
          {columns.map((item) => {
            return <th key={item}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ProjectTableDesktop;
