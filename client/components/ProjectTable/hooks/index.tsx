"use client";

import { useMemo } from "react";
import {
  Button,
  List,
  Tooltip,
  Accordion,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { datasourceAtom, projectIdAtom } from "@/atoms";

const { Item, Panel, Control } = Accordion;

const useProjectTable = () => {
  const DATE_FORMAT = "DD/MM/YYYY";
  const router = useRouter();
  const datasource = useAtomValue(datasourceAtom);
  const projectId = useAtomValue(projectIdAtom);

  const rows = useMemo(() => {
    try {
      return (
        typeof datasource !== "boolean" &&
        datasource.pages.map((element) => (
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
              <td>
                {dayjs(element.createdDate).format(DATE_FORMAT).toString()}
              </td>
              <td>
                {dayjs(element.updatedDate).format(DATE_FORMAT).toString()}
              </td>
              <td>{element.createdUser}</td>
              <td>{element.updatedUser}</td>
            </tr>
          </Tooltip>
        ))
      );
    } catch (error) {
      return <></>;
    }
  }, [datasource, projectId, router]);

  const items = useMemo(() => {
    try {
      return typeof datasource !== "boolean" && datasource.pages.map((el) => {
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
    } catch (error) {
      return <></>;
    }
  }, [datasource, projectId, router]);

  return { rows, items };
};

export default useProjectTable;
