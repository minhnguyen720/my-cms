"use client";

import { useInputState } from "@mantine/hooks";
import { createContext } from "react";

export const SearchBarContext = createContext(null);

const SearchBarProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useInputState("");

  return (
    <SearchBarContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarProvider;
