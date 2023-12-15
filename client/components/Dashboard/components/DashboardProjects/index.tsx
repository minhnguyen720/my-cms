"use client";

import SearchBar from "@/components/SearchBar";
import {
  Title,
  Table,
  Checkbox,
  CopyButton,
  ActionIcon,
  Tooltip,
  Group,
  Pagination,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import ActiveSwitch from "../ActiveSwitch";
import useProjectSelection from "../../hooks/useProjectSelection.hook";
import { Navlink } from "@/interfaces/NavLink";
import DashboardToolbar from "../DashboardToolbar";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useDashboardActiveSwitch as useDashboardActiveSwitch } from "./hooks/activeSwitch.hook";
import { useSearchProject } from "./hooks/searchProject.hook";
import useLoading from "@/hooks/utilities/useLoading";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { getCookie } from "cookies-next";
import { errorNotification } from "@/hooks/notifications/notificationPreset";
import { useHydrateAtoms } from "jotai/utils";
import { atom, useAtom, useAtomValue } from "jotai";

interface Props {
  projects: Navlink[];
  totalPages: number;
}

export const perPage = 5;
export const projectTotalPagesAtom = atom(1);
export const projectTableCurrentPageAtom = atom(1);

const DashboardProjects: React.FC<Props> = ({ projects, totalPages }) => {
  const router = useRouter();
  useHydrateAtoms([[projectTotalPagesAtom, totalPages]]);
  const [activePage, setActivePage] = useAtom(projectTableCurrentPageAtom);
  const total = useAtomValue(projectTotalPagesAtom);
  const { showLoading, hideLoading } = useLoading();
  const { onChangeDashboardActiveSwitch } = useDashboardActiveSwitch();
  const { toggleAll, toggleRow, selection } = useProjectSelection();
  const {
    searchResult,
    searchValue,
    handleReset,
    handleSearch,
    updateSearchResult,
    setSearchValue,
    updateResult,
  } = useSearchProject(projects);
  const [baseUrl] = useGetBaseUrl();
  const at = getCookie("at");

  // Fix display wrong active page number when move back from another page to this one
  useEffect(() => {
    setActivePage(1);
  }, [setActivePage]);

  const handlePagination = async (value: number) => {
    try {
      showLoading();
      setActivePage(value);
      const res = await axios.get(
        `${baseUrl}/project/pg?perPage=${perPage}&page=${value}`,
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (!res.data.isSuccess) {
        errorNotification("Fail to fetch new page");
        return;
      }
      updateSearchResult(res.data.projects);
    } catch (error) {
    } finally {
      hideLoading();
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
                        onChange={onChangeDashboardActiveSwitch}
                      />
                    </td>
                  </tr>
                );
            })}
        </tbody>
      </Table>
      <Pagination
        className="mt-3"
        value={activePage}
        total={Math.ceil(total / perPage)}
        onChange={(value) => {
          handlePagination(value);
        }}
        defaultValue={1}
      />
    </div>
  );
};

export default DashboardProjects;
