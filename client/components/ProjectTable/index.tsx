import ProjectTableMobile from "./components/Mobile";
import useProjectTable from "./hooks";
import ProjectTableDesktop from "./components/Desktop";
import { useMediaQuery } from "@mantine/hooks";
import SearchBar from "../SearchBar";
import { useSearchBar } from "../SearchBar/hooks";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconPlus, IconReload } from "@tabler/icons-react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useCurrentProject from "@/hooks/utilities/useCurrentProject";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useSetAtom } from "jotai";
import { datasourceAtom } from "@/atoms";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { getCookie } from "cookies-next";

const ProjectTable: React.FC = () => {
  const { rows, items } = useProjectTable();
  const mobileTableMatches = useMediaQuery("(max-width: 512px)");
  const { handleSearch, handleReset, searchValue, setSearchValue } =
    useSearchBar();
  const navigator = useRouter();
  const currentPathname = usePathname();
  const { getCurrentId } = useCurrentProject();
  const setDatasource = useSetAtom(datasourceAtom);
  const [baseUrl] = useGetBaseUrl();
  const params = useParams();
  const at = getCookie("at");

  const handleRefreshList = async () => {
    const listRes = await axios.get(`${baseUrl}/page/${params.projectNameId}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    setDatasource(listRes.data);
  };

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
                navigator.push(`/application/trashbin/${params.projectNameId}`);
              }}
            >
              <MdOutlineDeleteSweep size={24} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Reload list">
            <ActionIcon onClick={handleRefreshList}>
              <IconReload size={24} />
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
