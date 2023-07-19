import { Project } from "@/interfaces/Project";
import { dummyProject } from "@/static/dummyDocs";
import { useState, useEffect } from "react";

const useProjectOverall = (id: string) => {
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

  return { notfound, datasource };
};

export default useProjectOverall;
