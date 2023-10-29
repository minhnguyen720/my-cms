import { projectIdAtom } from "@/atoms";
import { useAtom } from "jotai";

const useCurrentProject = () => {
  const [currentProjectId, setCurrentProjectId] = useAtom(projectIdAtom);

  const updateCurrentId = (value: string) => {
    setCurrentProjectId(value);
  };

  const getCurrentId = () => {
    return currentProjectId;
  };

  return { updateCurrentId, getCurrentId };
};

export default useCurrentProject;
