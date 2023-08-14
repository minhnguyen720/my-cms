import useProjectOverall from "@/components/ProjectOverall/hooks/useProjectOverall";
import { useAtom } from "jotai";
import { searchAtom } from "@/atoms";

export const useSearchBar = () => {
  const [searchValue, jotaiSetSearchValue] = useAtom(searchAtom);
  const { datasource, setDataSource, datasourceDefault } = useProjectOverall();

  const handleSearch = () => {
    const result = datasource.pages.filter((item) => {
      return (
        item.name.includes(searchValue) ||
        item.createdUser.includes(searchValue) ||
        item.updatedUser.includes(searchValue)
      );
    });

    setDataSource((prev) => {
      return {
        ...prev,
        pages: result,
      };
    });
  };

  const handleReset = () => {
    setSearchValue("");
    setDataSource(datasourceDefault);
  };

  const setSearchValue = (value: string) => {
    jotaiSetSearchValue(value);
  };

  return { handleSearch, handleReset, searchValue, setSearchValue };
};
