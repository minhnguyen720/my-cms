"use client";

import React, { useMemo } from "react";
import { List, Accordion, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { datasourceAtom } from "@/atoms";
import MoreActions from "../components/MoreAction";
import useCurrentProject from "@/hooks/utilities/useCurrentProject";
import OnlineBadge from "@/components/Badge";

const { Item, Panel, Control } = Accordion;

const useProjectTable = () => {
  const DATE_FORMAT = "DD/MM/YYYY";
  const router = useRouter();
  const { getCurrentId } = useCurrentProject();
  const datasource = useAtomValue(datasourceAtom);

  const rows = useMemo(() => {
    try {
      return (
        typeof datasource !== "boolean" &&
        datasource.map((element) => (
          <tr
            key={element._id}
            onDoubleClick={() => {
              router.push(`/project/${getCurrentId()}/${element._id}`);
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
              <OnlineBadge flag={element.active} />
            </td>
            <td>
              <MoreActions
                pageStatus={element.active}
                isMobile={false}
                rowId={`${element.name}`}
                projectId={element.project}
                pageId={element._id}
                projectName={element._id}
              />
            </td>
          </tr>
        ))
      );
    } catch (error) {
      return <></>;
    }
  }, [datasource, getCurrentId, router]);

  const items = useMemo(() => {
    try {
      return (
        typeof datasource !== "boolean" &&
        datasource.map((element) => {
          return (
            <Item value={element._id} key={element._id}>
              <Control>
                <Stack spacing={"xs"}>
                  <Title order={3}>{element.name}</Title>
                  <Text size={"sm"}>Created by: {element.createdUser}</Text>
                  <Text size={"sm"}>Updated by: {element.updatedUser}</Text>
                </Stack>
              </Control>
              <Panel>
                <List>
                  <List.Item>
                    <strong>Name: </strong>
                    {element.name}
                  </List.Item>
                  <List.Item>
                    <strong>Created date: </strong>
                    {dayjs(element.createdDate).format(DATE_FORMAT).toString()}
                  </List.Item>
                  <List.Item>
                    <strong>Updated date: </strong>
                    {dayjs(element.updatedDate).format(DATE_FORMAT).toString()}
                  </List.Item>
                  <List.Item>
                    <strong>Created user: </strong>
                    {element.createdUser}
                  </List.Item>
                  <List.Item>
                    <strong>Updated user: </strong>
                    {element.updatedUser}
                  </List.Item>
                </List>
                <MoreActions
                  isMobile={true}
                  rowId={`${element._id}/${element.name}`}
                  projectId={element.project}
                  pageId={element._id}
                  projectName={element._id}
                  pageStatus={element.active}
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
