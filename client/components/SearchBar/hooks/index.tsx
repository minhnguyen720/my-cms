import useProjectOverall from "@/components/ProjectOverall/hooks/useProjectOverall.hook";
import { useAtom } from "jotai";
import { datasourceAtom, searchAtom } from "@/atoms";

export const useSearchBar = () => {
  const [searchValue, jotaiSetSearchValue] = useAtom(searchAtom);
  // const { datasource, setDataSource } = useProjectOverall();
  const [datasource, setDatasource] = useAtom(datasourceAtom);

  const handleSearch = () => {
    if (typeof datasource === "boolean") return;
    const result = datasource.filter((item) => {
      return (
        item?.name?.includes(searchValue) ||
        item?.createdUser.username.includes(searchValue) ||
        item?.updatedUser.username.includes(searchValue)
      );
    });

    setDatasource((prev) => {
      if (typeof prev !== "boolean")
        return {
          ...prev,
          pages: result,
        };
      else return [];
    });
  };

  const handleReset = () => {
    setSearchValue("");
    // setDataSource(datasourceDefault);
  };

  const setSearchValue = (value: string) => {
    jotaiSetSearchValue(value);
  };

  return { handleSearch, handleReset, searchValue, setSearchValue };
};
