"use client";

import { GeneralerNotFound } from "@/components/GeneralNotFound";
import ProjectTable from "@/components/ProjectTable";
import { Center, Loader } from "@mantine/core";
import useProjectOverall from "./hooks";

interface Props {
  id: string;
}

const ProjectOverall: React.FC<Props> = ({ id }) => {
  const { notfound, datasource } = useProjectOverall(id);

  return (
    <>
      {notfound ? (
        <Center className="h-full">
          <GeneralerNotFound />
        </Center>
      ) : (
        <>
          <h2 className="py-4">Project ID: {id}</h2>
          {datasource === undefined ? (
            <Center>
              <Loader py={"10%"} variant="bars" />
            </Center>
          ) : (
            <ProjectTable datasource={datasource.pages} projectId={id}/>
          )}
        </>
      )}
    </>
  );
};

export default ProjectOverall;
