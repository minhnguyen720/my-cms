"use client";

import {
  SegmentedControl,
  Group,
  ActionIcon,
  ScrollArea,
  Table,
  Checkbox,
  Image,
  Tooltip,
  Modal,
  Text,
  Button,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconTrash, IconRestore } from "@tabler/icons-react";
import React, { useState } from "react";
import {
  segmentedData,
  useSegmentedControl,
} from "../../hooks/useSegmentedControl";
import { useHydrateAtoms } from "jotai/utils";
import { removedItemAtom, selectedAtom } from "../../atoms";
import dayjs from "dayjs";
import useTrashbin from "../../hooks/useTrashbin";
import { useAtom } from "jotai";

const TrashbinBody = ({ initialData }) => {
  useHydrateAtoms([[removedItemAtom, initialData]]);

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [selected, setSelected] = useAtom(selectedAtom);
  const [opened, { open, close }] = useDisclosure(false);

  const { width } = useViewportSize();
  const { handleSegmentChanged, value, removedItems } = useSegmentedControl();
  const { removeSelected, restoreSelected, emptyTrashbin } = useTrashbin();

  const handleSelected = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id))
        return prev.filter((item) => {
          return item !== id;
        });
      return [...prev, id];
    });
  };

  const handleOnClose = () => {
    close();
  };

  const handleOnOpen = () => {
    open();
  };

  return (
    <>
      <Modal
        title="System notice"
        opened={opened}
        onClose={handleOnClose}
        centered
      >
        <Text>Any data are selected will be removed permanently</Text>
        <Group className="mt-4" position="right">
          <Button
            variant="light"
            onClick={async () => {
              await removeSelected(selected, value);
              handleOnClose();
            }}
          >
            Confirm
          </Button>
          <Button color="red" variant="light" onClick={handleOnClose}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <SegmentedControl
        orientation={width <= 425 ? "vertical" : "horizontal"}
        fullWidth
        value={value}
        onChange={handleSegmentChanged}
        data={segmentedData}
      />
      <Group className="my-2 sm:my-4">
        <Tooltip label="Remove from trash bin">
          <ActionIcon disabled={selected.length <= 0} onClick={handleOnOpen}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Restore selected items">
          <ActionIcon
            disabled={selected.length <= 0}
            onClick={() => {
              restoreSelected(selected, value);
            }}
          >
            <IconRestore />
          </ActionIcon>
        </Tooltip>
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
