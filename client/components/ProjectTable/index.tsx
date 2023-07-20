import ProjectTableMobile from "./components/Mobile";
import useProjectTable from "./hooks";
import ProjectTableDesktop from "./components/Desktop";
import { useMediaQuery } from "@mantine/hooks";
import SearchBar from "../SearchBar";
import { useSearchBar } from "../SearchBar/hooks";
import useProjectOverall from "../ProjectOverall/hooks/useProjectOverall";

interface Props {}

const ProjectTable: React.FC<Props> = () => {
  const { datasource, id } = useProjectOverall();
  const { rows, items } = useProjectTable(datasource.pages, id);
  const mobileTableMatches = useMediaQuery("(max-width: 512px)");
  const { handleSearch, handleReset, searchValue, setSearchValue } =
    useSearchBar();

  return (
    <>
      <h4 className="mt-5 mb-3">Current active pages</h4>
      <SearchBar
        handleReset={handleReset}
        handleSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {mobileTableMatches ? (
        <ProjectTableMobile items={items} />
      ) : (
        <ProjectTableDesktop rows={rows} />
      )}
    </>
  );
};

export default ProjectTable;
