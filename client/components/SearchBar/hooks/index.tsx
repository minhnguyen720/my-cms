import { useContext } from "react";
import { SearchBarContext } from "../context";
import useProjectOverall from "@/components/ProjectOverall/hooks/useProjectOverall";

export const useSearchBar = () => {
  const { searchValue, setSearchValue } = useContext(SearchBarContext);
  const { datasource } = useProjectOverall();

  const handleSearch = () => {
    const result = datasource.pages.filter((item) => {
      return (
        item.name.includes(searchValue) ||
        item.createdUser.includes(searchValue) ||
        item.updatedUser.includes(searchValue)
      );
    });
    console.log(result);
  };

  const handleReset = () => {
    console.log("reset");
  };

  return { handleSearch, handleReset, searchValue, setSearchValue };
};
