import { SetStateAction, useContext } from "react";
import { ProjectTableDataContext } from "../context";
import { Project } from "@/interfaces/Project";

const useProjectOverall = () => {
  const {
    notfound,
    datasource,
    id,
    datasourceDefault,
    setDataSource,
  }: {
    notfound: boolean;
    datasource: Project;
    id: string;
    datasourceDefault: Project;
    setDataSource: React.Dispatch<SetStateAction<Project>>;
  } = useContext(ProjectTableDataContext);

  return { notfound, datasource, id, datasourceDefault, setDataSource };
};

export default useProjectOverall;
