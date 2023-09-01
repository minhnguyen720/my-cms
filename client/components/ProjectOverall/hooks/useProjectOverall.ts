import { useEffect } from "react";
import { Project } from "@/interfaces/Project";
import { useAtom, useAtomValue } from "jotai";
import {
  datasourceAtom,
  datasourceDefaultAtom,
  notFoundAtom,
  projectIdAtom,
} from "@/atoms";
import { ProjectTableItem } from "@/app/project/[id]/page";

const useProjectOverall = (data: ProjectTableItem) => {
  const [datasource, setDataSource] = useAtom(datasourceAtom);
  const [notfound, setNotfound] = useAtom(notFoundAtom);

  useEffect(() => {
    try {
      setDataSource(data);
    } catch (error) {
      console.error(error);
    }
  }, [data, setDataSource]);

  return { notfound, datasource, setDataSource };
};

export default useProjectOverall;
