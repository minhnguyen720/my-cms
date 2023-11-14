import SearchBar from "@/components/SearchBar";
import {
  Title,
  Table,
  Checkbox,
  CopyButton,
  ActionIcon,
  Tooltip,
  Group,
} from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import ActiveSwitch from "../ActiveSwitch";
import useProjectSelection from "../../hooks/useProjectSelection";
import { Navlink } from "@/interfaces/NavLink";
import DashboardToolbar from "../DashboardToolbar";
import { useSetAtom } from "jotai";
import { statAtom } from "../../atoms";
import { getCookie } from "cookies-next";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface Props {
  projects: Navlink[];
}

const DashboardProjects: React.FC<Props> = ({ projects }) => {
  const router = useRouter();
  const [baseUrl] = useGetBaseUrl();
  const setStatData = useSetAtom(statAtom);

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Navlink[]>(() => {
    if (projects) return projects;
    else return [];
  });

  const { toggleAll, toggleRow, selection } = useProjectSelection();

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

  const onChangeActiveSwitch = async (event) => {
    try {
      const res = await axios.put(
        `${baseUrl}/project/active/toggle`,
        {
          id: event.currentTarget.id,
          value: event.currentTarget.checked,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("at")}`,
          },
        },
      );
      setStatData([
        { title: "Active project", value: res.data.activeLength.toString() },
        {
          title: "Deactive project",
          value: res.data.deactiveLength.toString(),
        },
      ]);
      if (res.data.success) {
        successNotification("Deactive successful");
      } else {
        errorNotification("Deactive failed");
      }
    } catch (error) {
      errorNotification("Deactive failed");
      console.error(error);
    }
  };

  return (
    <div className="pb-12">
      <Title order={1} className="py-9">
        Projects
      </Title>
      <SearchBar
        placeholder="Project name"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleReset={handleReset}
        handleSearch={handleSearch}
      />
      <DashboardToolbar
        create={updateResult}
        updateSearchResult={updateSearchResult}
      />
      <div className="max-h-[30rem] overflow-y-auto">
        <Table highlightOnHover verticalSpacing={"md"}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  onChange={() => {
                    toggleAll(searchResult);
                  }}
                  checked={selection.length === searchResult.length}
                  indeterminate={
                    selection.length > 0 &&
                    selection.length !== searchResult.length
                  }
                />
              </th>
              <th>Project</th>
              <th>Project ID</th>
              <th>Created date</th>
              <th>Updated date</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.length > 0 &&
              searchResult.map((element) => {
                if (element)
                  return (
                    <tr
                      key={element.id}
                      onDoubleClick={() => {
                        router.push(element.href ? element.href : "");
                      }}
                    >
                      <td>
                        <Checkbox
                          onChange={() => {
                            toggleRow(element.id ? element.id : "");
                          }}
                          checked={
                            element.id ? selection.includes(element.id) : false
                          }
                        />
                      </td>
                      <td>{element.label}</td>
                      <td>
                        <Group>
                          {element.id}
                          <CopyButton
                            value={element.id ? element.id : ""}
                            timeout={2000}
                          >
                            {({ copied, copy }) => (
                              <Tooltip
                                label={copied ? "Copied" : "Copy"}
                                withArrow
                                position="right"
                              >
                                <ActionIcon
                                  color={copied ? "teal" : "gray"}
                                  onClick={copy}
                                >
                                  {copied ? (
                                    <IconCheck size="1rem" />
                                  ) : (
                                    <IconCopy size="1rem" />
                                  )}
                                </ActionIcon>
                              </Tooltip>
                            )}
                          </CopyButton>
                        </Group>
                      </td>
                      <td>{dayjs(element.createdDate).format("DD/MM/YYYY")}</td>
                      <td>{dayjs(element.updatedDate).format("DD/MM/YYYY")}</td>
                      <td>
                        <ActiveSwitch
                          element={element}
                          onChange={onChangeActiveSwitch}
                        />
                      </td>
                    </tr>
                  );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardProjects;
