"use client";

import { GeneralerNotFound } from "@/components/GeneralNotFound";
import ProjectTable from "@/components/ProjectTable";
import { Center, Loader } from "@mantine/core";
import SearchBarProvider from "../SearchBar/context";
import useProjectOverall from "./hooks/useProjectOverall";

interface Props {}

const ProjectOverall: React.FC<Props> = () => {
  const { notfound, datasource, id } = useProjectOverall();

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
            <SearchBarProvider>
              <ProjectTable />
            </SearchBarProvider>
          )}
        </>
      )}
    </>
  );
};

export default ProjectOverall;
