import { useEffect } from "react";
import { useAtom } from "jotai";
import { datasourceAtom, notFoundAtom } from "@/atoms";
import { ProjectTableItem } from "@/app/application/project/[projectNameId]/page";

const useProjectOverall = (data: ProjectTableItem[] | undefined) => {
  const [datasource, setDataSource] = useAtom(datasourceAtom);
  const [notfound, setNotfound] = useAtom(notFoundAtom);

  useEffect(() => {
    try {
      setDataSource(data === undefined ? [] : data);
    } catch (error) {
      console.error(error);
    }
  }, [data, setDataSource]);

  return { notfound, datasource, setDataSource };
};

export default useProjectOverall;
