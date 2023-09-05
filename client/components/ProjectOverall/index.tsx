"use client";

import { GeneralNotFound } from "@/components/GeneralNotFound";
import ProjectTable from "@/components/ProjectTable";
import { Center, Loader } from "@mantine/core";
import useProjectOverall from "./hooks/useProjectOverall";
import { projectIdAtom } from "@/atoms";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { ProjectTableItem } from "@/app/project/[id]/page";

interface Props {
  id?: string;
  data?: ProjectTableItem;
}

const ProjectOverall: React.FC<Props> = ({ id, data }) => {
  const { notfound, datasource } = useProjectOverall(data);

  const setProjectId = useSetAtom(projectIdAtom);
  useEffect(() => {
    setProjectId(id);
  }, [id, setProjectId]);

  return (
    <>
      {notfound ? (
        <Center className="h-full">
          <GeneralNotFound />
        </Center>
      ) : (
        <>
          <h2 className="py-4">Project ID: {id}</h2>
          {!datasource && typeof datasource !== "boolean" ? (
            <Center>
              <Loader py={"10%"} variant="bars" />
            </Center>
          ) : (
            <ProjectTable data={datasource} />
          )}
        </>
      )}
    </>
  );
};

export default ProjectOverall;
