import { useEffect } from "react";
import { Project } from "@/interfaces/Project";
import { useAtom, useAtomValue } from "jotai";
import {
  baseUrlAtom,
  datasourceAtom,
  datasourceDefaultAtom,
  notFoundAtom,
  projectIdAtom,
} from "@/atoms";
import axios from "axios";

const useProjectOverall = () => {
  const [datasource, setDataSource] = useAtom(datasourceAtom);
  const [notfound, setNotfound] = useAtom(notFoundAtom);
  const [datasourceDefault, setDatasourceDefault] = useAtom(
    datasourceDefaultAtom
  );
  const baseUrl = useAtomValue(baseUrlAtom);
  const id = useAtomValue(projectIdAtom);

  useEffect(() => {
    try {
      const init = async () => {
        const res = await axios.get(`${baseUrl}/project`);
        const filteredDatasource = res.data.filter((item:Project) => {
          return item.id === id;
        })[0];
        if (filteredDatasource === undefined) {
          setNotfound(true);
        } else {
          setDataSource(filteredDatasource);
          setDatasourceDefault(filteredDatasource);
          setNotfound(false);
        }
      };

      init();
    } catch (error) {
      console.error(error);
    }
  }, [baseUrl, id, setDataSource, setDatasourceDefault, setNotfound]);

  return { notfound, datasource, id, datasourceDefault, setDataSource };
};

export default useProjectOverall;
