"use client";

import {
  SegmentedControl,
  Group,
  ActionIcon,
  ScrollArea,
  Table,
  Checkbox,
  Image,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconTrash, IconRestore } from "@tabler/icons-react";
import React, { useState } from "react";
import {
  segmentedData,
  useSegmentedControl,
} from "../../hooks/useSegmentedControl";
import { useHydrateAtoms } from "jotai/utils";
import { removedItemAtom } from "../../atoms";
import dayjs from "dayjs";
import useTrashbin from "../../hooks/useTrashbin";

const TrashbinBody = ({ initialData }) => {
  useHydrateAtoms([[removedItemAtom, initialData]]);

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { width } = useViewportSize();
  const { handleSegmentChanged, value, removedItems } = useSegmentedControl();
  const { removeSelected } = useTrashbin();

  const handleSelected = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id))
        return prev.filter((item) => {
          return item !== id;
        });
      return [...prev, id];
    });
  };

  return (
    <>
      <SegmentedControl
        orientation={width <= 425 ? "vertical" : "horizontal"}
        fullWidth
        value={value}
        onChange={handleSegmentChanged}
        data={segmentedData}
      />
      <Group className="my-2 sm:my-4">
        <ActionIcon
          disabled={selected.length <= 0}
          onClick={async () => {
            await removeSelected(selected);
          }}
        >
          <IconTrash />
        </ActionIcon>
        <ActionIcon disabled={selected.length <= 0}>
          <IconRestore />
        </ActionIcon>
      </Group>
      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        {removedItems.length > 0 ? (
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
                <th>Created date</th>
                <th>Deleted by</th>
              </tr>
            </thead>
            <tbody>
              {removedItems.map((element) => (
                <tr key={element._id}>
                  <td>
                    <Checkbox
                      onChange={() => {
                        handleSelected(element._id);
                      }}
                    />
                  </td>
                  <td>{element.name}</td>
                  <td>
                    {dayjs(element.createdDate)
                      .format("DD/MM/YYYY hh:mm")
                      .toString()}
                  </td>
                  <td>admin</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="mx-auto mt-8 max-w-[200px]">
            <Image
              src="/images/empty.svg"
              alt="nothing here"
              caption="Trash bin is empty"
            />
          </div>
        )}
      </ScrollArea>
    </>
  );
};

export default TrashbinBody;
