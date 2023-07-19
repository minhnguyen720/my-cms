"use client";

import { useMemo } from "react";
import { Button, List, Tooltip, Accordion } from "@mantine/core";
import dayjs from "dayjs";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { Page } from "@/interfaces/Project";

const { Item, Panel, Control } = Accordion;

const useProjectTable = (datasource: Page[], projectId: string) => {
  const DATE_FORMAT = "DD/MM/YYYY";
  const router = useRouter();
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
            router.push(`/project/${projectId}/${element.id}`);
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
        <Item value={el.id} key={el.id}>
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
            <Button
              mt={16}
              onClick={() => {
                router.push(`/project/${projectId}/${el.id}`);
              }}
            >
              View detail
            </Button>
          </Panel>
        </Item>
      );
    });
  }, [datasource]);
  const mobileTableMatches = useMediaQuery("(max-width: 512px)");

  return { mobileTableMatches, rows, items };
};

export default useProjectTable;
