"use client";

import { Project } from "@/interfaces/Project";
import { dummyProject } from "@/static/dummyDocs";
import { createContext, useEffect, useState } from "react";

export const ProjectTableDataContext = createContext(null);

const ProjectTableDataProvider = ({ id, children }) => {
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
        setNotfound(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, datasource]);

  return (
    <ProjectTableDataContext.Provider value={{ notfound, datasource, id }}>
      {children}
    </ProjectTableDataContext.Provider>
  );
};

export default ProjectTableDataProvider;
