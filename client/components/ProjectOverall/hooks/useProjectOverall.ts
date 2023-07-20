import { useContext } from "react";
import { ProjectTableDataContext } from "../context";
import { Project } from "@/interfaces/Project";

const useProjectOverall = () => {
  const {
    notfound,
    datasource,
    id,
  }: { notfound: boolean; datasource: Project; id: string } = useContext(
    ProjectTableDataContext
  );

  return { notfound, datasource, id };
};

export default useProjectOverall;
