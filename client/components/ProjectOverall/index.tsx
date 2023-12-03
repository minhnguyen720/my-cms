"use client";

import { GeneralNotFound } from "@/components/GeneralNotFound";
import ProjectTable from "@/components/ProjectTable";
import {
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Text,
  Title,
  Pagination
} from "@mantine/core";
import useProjectOverall from "./hooks/useProjectOverall";
import { ProjectTableItem } from "@/app/application/project/[projectNameId]/page";
import { useEffect, useState } from "react";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { getCookie } from "cookies-next";
import OnlineBadge from "../Badge";
import dayjs from "dayjs";
import { userAgent } from "next/server";
import { useAtomValue } from "jotai";
import { userAtom } from "../Navbar";

interface Props {
  id?: string;
  data?: ProjectTableItem[];
}

interface ProjectData {
  _id: string;
  name: string;
  active: boolean;
  owner: string;
  createdDate: string;
  updatedDate: string;
  createdUser: string;
  updatedUser: string;
  users: string[];
}

const ProjectOverall: React.FC<Props> = ({ id, data }) => {
  const { notfound, datasource } = useProjectOverall(data);
  const [baseUrl] = useGetBaseUrl();
  const [project, setProject] = useState<ProjectData | null>(null);
  const at = getCookie("at");
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const init = async () => {
      try {
        const projectRes: { data: ProjectData } = await axios.get(
          `${baseUrl}/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${at}`,
            },
          },
        );
        setProject(projectRes.data);
        console.log(projectRes.data);
      } catch (error) {}
    };

    init();
  }, [at, baseUrl, id]);

  return (
    <>
      {notfound ? (
        <Center className="h-full">
          <GeneralNotFound />
        </Center>
      ) : (
        <>
          {project !== null && (
            <Card
              className="w-[30%]"
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Title order={2} weight={700}>
                Project Overall
              </Title>
              <Divider className="my-3" />
              <Group position="apart" mt="md" mb="xs">
                <Title order={3} weight={500}>
                  {project.name}
                </Title>
                <OnlineBadge flag={project.active} />
              </Group>

              <Text size="sm" color="dimmed"></Text>
              <Text size="sm" color="dimmed">
                Project ID: {project._id}
              </Text>
              {typeof user !== "boolean" && (
                <Text size="sm" color="dimmed">
                  Created by: {user.name}
                </Text>
              )}
              <Text size="sm" color="dimmed">
                Created date:{" "}
                {dayjs(project.createdDate).format("DD/MM/YYYY, HH:mm")}
              </Text>
            </Card>
          )}
          {!data ? (
            <Center>
              <Loader py={"10%"} variant="bars" />
            </Center>
          ) : (
            <>
            <ProjectTable />
            <Pagination />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProjectOverall;
