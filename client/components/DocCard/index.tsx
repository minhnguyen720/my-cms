"use client";

import { Group, Grid, Title, Modal, TextInput, Button } from "@mantine/core";
import React, { useState } from "react";
import CreateNewDocCard from "../CreateNewDocCard";
import Card from "./Card";
import FolderCard from "../FolderCard";
import CreateNewFolder from "../CreateNewFolder";
import useFolderCardAction from "../CreateNewFolder/hook";
import useCardAction from "../CreateNewDocCard/hook";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Document, Folder } from "@/interfaces/Project";
import { useParams, useRouter } from "next/navigation";

interface Props {
  docs: Document[];
  folders: Folder[];
}

const DocCards: React.FC<Props> = ({ docs, folders }) => {
  const { folderList, folderHandler, confirmModal, renameModal } =
    useFolderCardAction(folders);
  const { docList, handler } = useCardAction(docs);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      renameValue: "",
    },
  });
  const navigator = useRouter();

  const [openerData, setOpenerData] = useState("");
  const updateOpenerData = (value) => {
    setOpenerData(value);
    open();
  };

  const handleCloseRenameModal = () => {
    close();
    form.reset();
  };
  const params = useParams();

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleCloseRenameModal}
        centered
        title="Rename document"
      >
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
            <CreateNewFolder updateFolderList={folderHandler.update} />
          </Group>
        </Grid.Col>
        {folderList.length > 0 && (
          <>
            {folderList.map((folder) => {
              return (
                <Grid.Col
                  span={3}
                  key={folder._id}
                  onDoubleClick={() => {
                    const path = `/project/${params.projectNameId}/${params.pageId}/folder/${folder._id}`;
                    navigator.push(path);
                  }}
                >
                  <FolderCard
                    folderParent={folder.parent}
                    folderName={folder.name}
                    actionHandler={folderHandler}
                    folderId={folder._id}
                    confirmModal={confirmModal}
                    renameModal={renameModal}
                  />
                </Grid.Col>
              );
            })}
          </>
        )}
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
                updateOpenerData={updateOpenerData}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default DocCards;
