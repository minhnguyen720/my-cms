"use client";

import React, { useMemo } from "react";
import { List, Accordion, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { datasourceAtom } from "@/atoms";
import MoreActions from "../components/MoreAction";
import OnlineBadge from "@/components/Badge";

const { Item, Panel, Control } = Accordion;

const useProjectTable = () => {
  const DATE_FORMAT = "DD/MM/YYYY";
  const router = useRouter();
  const datasource = useAtomValue(datasourceAtom);
  const params = useParams();

  const rows = useMemo(() => {
    try {
      return (
        typeof datasource !== "boolean" &&
        datasource.map((element) => {
          if (
            element.active !== undefined &&
            element.project !== undefined &&
            element._id !== undefined
          ) {
            return (
              <tr
                key={element._id}
                onDoubleClick={() => {
                  router.push(
                    `/application/project/${params.projectNameId}/${element._id}`,
                  );
                }}
              >
                <td>
                  <strong>{element.name}</strong>
                </td>
                <td>
                  {dayjs(element.createdDate).format(DATE_FORMAT).toString()}
                </td>
                <td>
                  {dayjs(element.updatedDate).format(DATE_FORMAT).toString()}
                </td>
                <td>{element.createdUser.username}</td>
                <td>{element.updatedUser.username}</td>
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
            );
          }
        })
      );
    } catch (error) {
      return <></>;
    }
  }, [datasource, params.projectNameId, router]);

  const items = useMemo(() => {
    try {
      return (
        typeof datasource !== "boolean" &&
        datasource.map((element) => {
          return (
            element._id !== undefined &&
            element.project &&
            element.active && (
              <Item value={element._id} key={element._id}>
                <Control>
                  <Stack spacing={"xs"}>
                    <Title order={3}>{element.name}</Title>
                    <Text size={"sm"}>
                      Created by: {element.createdUser.username}
                    </Text>
                    <Text size={"sm"}>
                      Updated by: {element.updatedUser.username}
                    </Text>
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
                      {dayjs(element.createdDate)
                        .format(DATE_FORMAT)
                        .toString()}
                    </List.Item>
                    <List.Item>
                      <strong>Updated date: </strong>
                      {dayjs(element.updatedDate)
                        .format(DATE_FORMAT)
                        .toString()}
                    </List.Item>
                    <List.Item>
                      <strong>Created user: </strong>
                      {element.createdUser.username}
                    </List.Item>
                    <List.Item>
                      <strong>Updated user: </strong>
                      {element.updatedUser.username}
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
            )
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
