"use client";

import { Project } from "@/interfaces/Project";
import { dummyProject } from "@/static/dummyDocs";
import { createContext, useEffect, useState } from "react";

export const ProjectTableDataContext = createContext(null);

const ProjectTableDataProvider = ({ id, children }) => {
  const [datasourceDefault, setDatasourceDefault] =
    useState<Project>(undefined);
  const [datasource, setDataSource] = useState<Project>(undefined);
  const [notfound, setNotfound] = useState(false);

  useEffect(() => {
    try {
      const filteredDatasource = dummyProject.filter((item) => {
        return item.id === id;
      })[0];
      if (filteredDatasource === undefined) {
        setNotfound(true);
      } else {
        setDataSource(filteredDatasource);
        setDatasourceDefault(filteredDatasource);
        setNotfound(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <ProjectTableDataContext.Provider
      value={{ notfound, datasource, id, datasourceDefault, setDataSource }}
    >
      {children}
    </ProjectTableDataContext.Provider>
  );
};

export default ProjectTableDataProvider;
