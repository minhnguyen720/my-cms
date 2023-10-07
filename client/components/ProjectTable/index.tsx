import ProjectTableMobile from "./components/Mobile";
import useProjectTable from "./hooks";
import ProjectTableDesktop from "./components/Desktop";
import { useMediaQuery } from "@mantine/hooks";
import SearchBar from "../SearchBar";
import { useSearchBar } from "../SearchBar/hooks";
import { ProjectTableItem } from "@/app/project/[id]/page";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useStyles from "../SearchBar/style";

interface Props {
  data: ProjectTableItem[] | boolean;
}

const ProjectTable: React.FC<Props> = ({ data }) => {
  const { rows, items } = useProjectTable();
  const mobileTableMatches = useMediaQuery("(max-width: 512px)");
  const { handleSearch, handleReset, searchValue, setSearchValue } =
    useSearchBar();
  const navigator = useRouter();
  const currentPathname = usePathname();
  const { classes } = useStyles();

  return (
    <>
      <h4 className="mb-3 mt-5">Current active pages</h4>
      <div >
        <SearchBar
          handleReset={handleReset}
          handleSearch={handleSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Group py={16}>
          <Text>Create new folder</Text>
          <ActionIcon
            className={classes.searchbarIcon}
            onClick={() => {
              navigator.push(`${currentPathname}/new-page`);
            }}
          >
            <IconPlus />
          </ActionIcon>
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
