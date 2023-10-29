"use client"

import useLoading from "@/hooks/utilities/useLoading";
import {
  SegmentedControl,
  Group,
  ActionIcon,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconTrash, IconRestore } from "@tabler/icons-react";
import React, { useState } from "react";

const segmentedData = [
  { label: "Files", value: "files" },
  { label: "Folders", value: "folders" },
  { label: "Projects", value: "projects" },
];

const TrashbinBody = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [value, setValue] = useState<string>("files");
  const { showLoading, hideLoading } = useLoading();
  const { width } = useViewportSize();
  const handleSegmentedControl = (newValue: string) => {
    try {
      showLoading();
      setValue(newValue);
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <SegmentedControl
        orientation={width <= 425 ? "vertical" : "horizontal"}
        fullWidth
        value={value}
        onChange={handleSegmentedControl}
        data={segmentedData}
      />
      <Group className="my-2 sm:my-4">
        <ActionIcon>
          <IconTrash />
        </ActionIcon>
        <ActionIcon>
          <IconRestore />
        </ActionIcon>
      </Group>
      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table verticalSpacing="sm" highlightOnHover>
          <thead
            className={
              scrolled
                ? "sticky top-0 z-20 bg-[#141517] after:absolute after:bottom-0 after:left-0 after:right-0 after:content-['']"
                : undefined
            }
          >
            <tr>
              <th></th>
              <th>Name</th>
              <th>Deleted by</th>
            </tr>
          </thead>
          <tbody>
            {/* {elements.map((element,index) => (
          <tr key={index}>
            <td>
              <Checkbox />
            </td>
            <td>{element.name}</td>
            <td>admin</td>
          </tr>
        ))} */}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default TrashbinBody;
