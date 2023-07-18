"use client";

import { Button, List, Table, Tooltip, Accordion } from "@mantine/core";
import dayjs from "dayjs";
import { Page } from "@/interfaces/Project";
import { useMemo } from "react";
import { useMediaQuery } from "@mantine/hooks";
import ProjectTableMobile from "./Mobile";

interface Props {
  datasource: Page[];
}

const { Item, Panel, Control } = Accordion;

const ProjectTable: React.FC<Props> = ({ datasource }) => {
  const DATE_FORMAT = "DD/MM/YYYY";
  const rows = useMemo(() => {
    return datasource.map((element) => (
      <Tooltip
        label="Double click to access to page detail"
        withArrow
        key={element.name}
        openDelay={400}
      >
        <tr
          onDoubleClick={() => {
            // code to handle routing to specific page
            console.log(`clicked ${element.id}`);
          }}
        >
          <td>
            <strong>{element.name}</strong>
          </td>
          <td>{dayjs(element.createdDate).format(DATE_FORMAT).toString()}</td>
          <td>{dayjs(element.updatedDate).format(DATE_FORMAT).toString()}</td>
          <td>{element.createdUser}</td>
          <td>{element.updatedUser}</td>
        </tr>
      </Tooltip>
    ));
  }, [datasource]);
  const items = useMemo(() => {
    return datasource.map((el) => {
      return (
        <Item value={el.id}>
          <Control>{el.name}</Control>
          <Panel>
            <List>
              <List.Item>
                <strong>Name: </strong>
                {el.name}
              </List.Item>
              <List.Item>
                <strong>Created date: </strong>
                {dayjs(el.createdDate).format(DATE_FORMAT).toString()}
              </List.Item>
              <List.Item>
                <strong>Updated date: </strong>
                {dayjs(el.updatedDate).format(DATE_FORMAT).toString()}
              </List.Item>
              <List.Item>
                <strong>Created user: </strong>
                {el.createdUser}
              </List.Item>
              <List.Item>
                <strong>Updated user: </strong>
                {el.updatedUser}
              </List.Item>
            </List>
            <Button mt={16}>View detail</Button>
          </Panel>
        </Item>
      );
    });
  }, [datasource]);
  const mobileTableMatches = useMediaQuery("(max-width: 512px)");

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
