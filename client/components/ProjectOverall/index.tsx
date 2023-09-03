"use client";

import { GeneralerNotFound } from "@/components/GeneralNotFound";
import ProjectTable from "@/components/ProjectTable";
import { Center, Loader } from "@mantine/core";
import useProjectOverall from "./hooks/useProjectOverall";
import { projectIdAtom } from "@/atoms";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

interface Props {
  id: string;
  data: any;
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
          <GeneralerNotFound />
        </Center>
      ) : (
        <>
          <h2 className="py-4">Project ID: {id}</h2>
          {!datasource ? (
            <Center>
              <Loader py={"10%"} variant="bars" />
            </Center>
          ) : (
            <ProjectTable />
          )}
        </>
      )}
    </>
  );
};

export default ProjectOverall;
