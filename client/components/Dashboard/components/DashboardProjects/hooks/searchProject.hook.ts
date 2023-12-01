import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { Navlink } from "@/interfaces/NavLink";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";

export const useSearchProject = (projects: Navlink[]) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Navlink[]>(() => {
    if (projects) return projects;
    else return [];
  });
  const [baseUrl] = useGetBaseUrl();

  const updateResult = async () => {
    const res = await axios.get(`${baseUrl}/project`, {
      headers: {
        Authorization: `Bearer ${getCookie("at")}`,
      },
    });
    setSearchResult(res.data.projects);
  };

  const handleSearch = (value: string) => {
    setSearchResult(() => {
      return projects.filter((item) => {
        return item.label.toLowerCase().includes(value.toLowerCase());
      });
    });
    setSearchValue("");
  };

  const handleReset = () => {
    setSearchResult(projects);
    setSearchValue("");
  };

  const updateSearchResult = (value) => {
    setSearchResult(value);
  };

  return {
    searchResult,
    searchValue,
    handleReset,
    handleSearch,
    updateSearchResult,
    setSearchValue,
    updateResult
  };
};
