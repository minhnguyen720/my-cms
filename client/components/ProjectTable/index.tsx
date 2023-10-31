import ProjectTableMobile from "./components/Mobile";
import useProjectTable from "./hooks";
import ProjectTableDesktop from "./components/Desktop";
import { useMediaQuery } from "@mantine/hooks";
import SearchBar from "../SearchBar";
import { useSearchBar } from "../SearchBar/hooks";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useCurrentProject from "@/hooks/utilities/useCurrentProject";
import { MdOutlineDeleteSweep } from "react-icons/md";

const ProjectTable: React.FC = () => {
  const { rows, items } = useProjectTable();
  const mobileTableMatches = useMediaQuery("(max-width: 512px)");
  const { handleSearch, handleReset, searchValue, setSearchValue } =
    useSearchBar();
  const navigator = useRouter();
  const currentPathname = usePathname();
  const { getCurrentId } = useCurrentProject();

  return (
    <>
      <h4 className="mb-3 mt-5">Current active pages</h4>
      <div>
        <SearchBar
          handleReset={handleReset}
          handleSearch={handleSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Group className="py-6">
          <Tooltip label="Create new page">
            <ActionIcon
              onClick={() => {
                navigator.push(`${currentPathname}/new-page`);
              }}
            >
              <IconPlus />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Go to trash bin">
            <ActionIcon
              onClick={() => {
                navigator.push(`/trashbin/${getCurrentId()}`);
              }}
            >
              <MdOutlineDeleteSweep size={24}/>
            </ActionIcon>
          </Tooltip>
        </Group>
      </div>
      {mobileTableMatches ? (
        <ProjectTableMobile items={items} />
      ) : (
        <ProjectTableDesktop rows={rows} />
      )}
    </>
  );
};

export default ProjectTable;
