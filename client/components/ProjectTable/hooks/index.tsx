"use client";

import React, { useMemo } from "react";
import { Button, List, Accordion, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { datasourceAtom, projectIdAtom } from "@/atoms";
import MoreActions from "../components/MoreAction";

const { Item, Panel, Control } = Accordion;

const useProjectTable = () => {
  const DATE_FORMAT = "DD/MM/YYYY";
  const router = useRouter();
  const projectId = useAtomValue(projectIdAtom);
  const datasource = useAtomValue(datasourceAtom);

  const rows = useMemo(() => {
    try {
      return (
        typeof datasource !== "boolean" &&
        datasource.pages.map((element) => (
          <tr
            key={element.id}
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
            <td>
              <MoreActions
                isMobile={false}
                rowId={`${datasource.id}/${element.name}`}
                projectId={element.project}
                pageId={element.id}
                projectName={datasource.id}
              />
            </td>
          </tr>
        ))
      );
    } catch (error) {
      return <></>;
    }
  }, [datasource, projectId, router]);

  const items = useMemo(() => {
    try {
      return (
        typeof datasource !== "boolean" &&
        datasource.pages.map((el) => {
          return (
            <Item value={el.id} key={el.id}>
              <Control>
                <Stack spacing={"xs"}>
                  <Title order={3}>{el.name}</Title>
                  <Text size={"sm"}>Created by: {el.createdUser}</Text>
                  <Text size={"sm"}>Updated by: {el.updatedUser}</Text>
                </Stack>
              </Control>
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
                <MoreActions
                  isMobile={true}
                  rowId={`${datasource.id}/${el.name}`}
                  projectId={el.project}
                  pageId={el.id}
                  projectName={datasource.id}
                />
              </Panel>
            </Item>
          );
        })
      );
    } catch (error) {
      return <></>;
    }
  }, [datasource]);

  return { rows, items };
};

export default useProjectTable;
