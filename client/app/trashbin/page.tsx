"use client";

import useLoading from "@/hooks/utilities/useLoading";
import {
  ActionIcon,
  Alert,
  Button,
  Checkbox,
  Group,
  Modal,
  ScrollArea,
  SegmentedControl,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAlertCircle, IconTrash, IconRestore } from "@tabler/icons-react";
import React, { useState } from "react";

const segmentedData = [
  { label: "Files", value: "files" },
  { label: "Folders", value: "folders" },
  { label: "Projects", value: "projects" },
];

const elements = [
  { name: "Carbon" },
  { name: "Nitrogen" },
  { name: "Yttrium" },
  { name: "Barium" },
  { name: "Cerium" },
  { name: "Carbon" },
  { name: "Nitrogen" },
  { name: "Yttrium" },
  { name: "Barium" },
  { name: "Cerium" },
  { name: "Carbon" },
  { name: "Nitrogen" },
  { name: "Yttrium" },
  { name: "Barium" },
  { name: "Cerium" },
  { name: "Carbon" },
  { name: "Nitrogen" },
  { name: "Yttrium" },
  { name: "Barium" },
  { name: "Cerium" },
  { name: "Carbon" },
  { name: "Nitrogen" },
  { name: "Yttrium" },
  { name: "Barium" },
  { name: "Cerium" },
  { name: "Carbon" },
  { name: "Nitrogen" },
  { name: "Yttrium" },
  { name: "Barium" },
  { name: "Cerium" },
  { name: "Carbon" },
  { name: "Nitrogen" },
  { name: "Yttrium" },
  { name: "Barium" },
  { name: "Cerium" },
];

const TrashBinPage = () => {
  const [value, setValue] = useState<string>("files");
  const { width } = useViewportSize();
  const [opened, { open, close }] = useDisclosure(false);
  const { showLoading, hideLoading } = useLoading();
  const [scrolled, setScrolled] = useState(false);

  const handleSegmentedControl = (newValue: string) => {
    try {
      showLoading();
      setValue(newValue);
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  const handleEmptyTrashBin = async () => {
    try {
      showLoading();
      close();
    } catch (error) {
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Modal
        title="Empty trash bin notice"
        centered
        opened={opened}
        onClose={close}
      >
        <Text>
          All data will be delete permanent. Do you want to continue this
          process.
        </Text>
        <Group position="right" className="mt-4">
          <Button onClick={handleEmptyTrashBin}>Confirm</Button>
          <Button color="red" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Title order={2} className="pb-6 pt-3">
        Trash bin
      </Title>
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        color="cyan"
        className="mb-4"
      >
        <div className={width < 768 ? "block" : "flex justify-between"}>
          <div>Trash bin will be empty automatically in 30 days</div>
          <div className="w-fit cursor-pointer font-semibold" onClick={open}>
            Empty trash
          </div>
        </div>
      </Alert>
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
              scrolled ?
              "sticky z-20 top-0 bg-[#141517] after:absolute after:bottom-0 after:left-0 after:right-0 after:content-['']" : undefined
            }
          >
            <tr>
              <th></th>
              <th>Name</th>
              <th>Deleted by</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((element,index) => (
              <tr key={index}>
                <td>
                  <Checkbox />
                </td>
                <td>{element.name}</td>
                <td>admin</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default TrashBinPage;
