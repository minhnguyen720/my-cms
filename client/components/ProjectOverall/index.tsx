"use client";

import { GeneralNotFound } from "@/components/GeneralNotFound";
import ProjectTable from "@/components/ProjectTable";
import { Center, Loader } from "@mantine/core";
import useProjectOverall from "./hooks/useProjectOverall";
import { useEffect } from "react";
import { ProjectTableItem } from "@/app/project/[projectNameId]/page";
import useCurrentProject from "@/hooks/utilities/useCurrentProject";

interface Props {
  id?: string;
  data?: ProjectTableItem[];
}

const ProjectOverall: React.FC<Props> = ({ id, data }) => {
  const { notfound, datasource } = useProjectOverall(data);
  const { updateCurrentId } = useCurrentProject();

  useEffect(() => {
    updateCurrentId(id);
  }, [id, updateCurrentId]);

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
            <ProjectTable />
          )}
        </>
      )}
    </>
  );
};

export default ProjectOverall;
