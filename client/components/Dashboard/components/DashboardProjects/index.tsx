import SearchBar from "@/components/SearchBar";
import { Title, Group, Table, Text } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateNewProjectModal from "@/components/Modals/CreateNewProjectModal";
import dayjs from "dayjs";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";

const DashboardProjects = ({ projects }) => {
  const router = useRouter();
  const [baseUrl] = useGetBaseUrl();

  const [searchValue, setSearchValue] = useState("");
  // projects will be replaced by data from server
  const [searchResult, setSearchResult] = useState(projects);

  const updateResult = async () => {
    const res = await axios.get(`${baseUrl}/project`);
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
      <Group className="my-4">
        <Text>Create new project</Text>
        <CreateNewProjectModal update={updateResult} />
      </Group>
      <div className="max-h-[30rem] overflow-y-auto">
        <Table highlightOnHover verticalSpacing={"md"}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Created date</th>
              <th>Updated date</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((element) => {
              return (
                <tr
                  key={element.id}
                  onClick={() => {
                    router.push(element.href);
                  }}
                >
                  <td>{element.label}</td>
                  <td>{dayjs(element.createdDate).format("DD/MM/YYYY")}</td>
                  <td>{dayjs(element.updatedDate).format("DD/MM/YYYY")}</td>
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
