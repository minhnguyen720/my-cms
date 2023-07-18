"use client";

import ProjectTable from "@/components/ProjectTable";
import { Project } from "@/interfaces/Project";
import { dummyProject } from "@/static/dummyDocs";
import { Center, Loader } from "@mantine/core";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

const ProjectOverall: React.FC<Props> = ({ params: { id } }) => {
  const [datasource, setDataSource] = useState<Project>(undefined);
  useEffect(() => {
    try {
      setDataSource(() => {
        return dummyProject.filter((item) => {
          return item.id === id;
        })[0];
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <div>
      <h2 className="py-4">Project ID: {id}</h2>
      {datasource === undefined ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <ProjectTable datasource={datasource.pages} />
      )}
    </div>
  );
};

export default ProjectOverall;
