import { useContext } from "react";
import { SearchBarContext } from "../context";

export const useSearchBar = (datasource) => {
  const searchBarContext = useContext(SearchBarContext);

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleReset = () => {
    console.log("reset");
  };

  return { handleSearch, handleReset, searchBarContext };
};
