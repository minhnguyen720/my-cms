"use client";

import { Group, Grid, Title, Modal, TextInput, Button } from "@mantine/core";
import React, { useState } from "react";
import CreateNewDocCard from "../CreateNewDocCard";
import Card from "./Card";
import FolderCard from "../FolderCard";
import CreateNewFolder from "../CreateNewFolder";
import useFolderCardAction from "../CreateNewFolder/hook";
import useCreateNewCardAction from "../CreateNewDocCard/hook";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface Props {
  docs: {
    id: string;
    name?: string;
    createdDate?: string;
    updatedDate?: string;
    createdUser?: string;
    updatedUser?: string;
    fields?: string[];
    active?: boolean;
    page?: string;
    description?: string;
  }[];
}

const DocCards: React.FC<Props> = ({ docs }) => {
  const { folderList, addFolderItem } = useFolderCardAction();
  const { docList, handler } = useCreateNewCardAction(docs);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      renameValue: "",
    },
  });
  const [openerData, setOpenerData] = useState("");
  const updateOpenerId = (value) => {
    setOpenerData(value);
    open();
  };

  const handleCloseRenameModal = () => {
    close();
    form.reset();
  }

  return (
    <>
      <Modal opened={opened} onClose={handleCloseRenameModal} centered title="Rename document">
        <form
          onSubmit={form.onSubmit(async (values) => {
            await handler.rename(openerData, values.renameValue);
            close();
          })}
        >
          <TextInput {...form.getInputProps("renameValue")} />
          <Group className="mt-4" position="right">
            <Button onClick={handleCloseRenameModal}>Cancel</Button>
            <Button color="cyan" type="submit">
              Proceed
            </Button>
          </Group>
        </form>
      </Modal>
      <Grid className="mb-2">
        <Grid.Col span={12}>
          <Group>
            <Title order={3}>Folders</Title>
            <CreateNewFolder />
          </Group>
        </Grid.Col>
        <Grid.Col xs={6} md={4}>
          <FolderCard folderName={"test"} />
        </Grid.Col>
      </Grid>
      <Grid className="my-2">
        <Grid.Col span={12}>
          <Group>
            <Title order={3}>Documents</Title>
            <CreateNewDocCard addDocItem={handler.add} />
          </Group>
        </Grid.Col>
        {docList.map((doc, i) => {
          return (
            <Grid.Col xs={6} md={4} key={i}>
              <Card
                doc={doc}
                handler={handler}
                updateOpenerId={updateOpenerId}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default DocCards;
