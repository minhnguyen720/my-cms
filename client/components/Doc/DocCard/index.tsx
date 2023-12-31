"use client";

import {
  Group,
  Grid,
  Title,
  Modal,
  TextInput,
  Button,
  Image,
  UnstyledButton,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import CreateNewDocCard from "../CreateNewDocCard";
import Card from "./Card";
import FolderCard from "../../Folder/FolderCard";
import CreateNewFolder from "../../CreateNewFolder";
import useFolderCardAction from "../../CreateNewFolder/hook";
import useCardAction from "../CreateNewDocCard/hook";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Document, Folder } from "@/interfaces/Project";
import { useParams, useRouter } from "next/navigation";
import useLoading from "@/hooks/utilities/useLoading";
import { errorNotification } from "@/hooks/notifications/notificationPreset";
import { IconArrowLeft } from "@tabler/icons-react";

interface Props {
  docs: Document[];
  folders: Folder[];
  mainPage: boolean;
}

const EmptySectionSVG = () => {
  return (
    <div className="mx-auto max-w-[200px] py-2">
      <Image
        src="/images/empty.svg"
        alt="nothing here"
        caption="You don't have any data in this section"
      />
    </div>
  );
};

const DocCards: React.FC<Props> = ({ docs, folders, mainPage }) => {
  const { folderList, folderHandler, confirmModal, renameModal } =
    useFolderCardAction(folders);
  const { docList, handler } = useCardAction(docs);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      renameValue: "",
    },
  });
  const params = useParams();
  const navigator = useRouter();
  const { showLoading, hideLoading } = useLoading();

  const [openerData, setOpenerData] = useState("");
  const updateOpenerData = (value) => {
    setOpenerData(value);
    open();
  };

  const handleCloseRenameModal = () => {
    close();
    form.reset();
  };

  const backToPrevious = () => {
    try {
      showLoading();
      navigator.back();
    } catch (error) {
      errorNotification("Something went wrong. Moving back to Dashboard.");
      navigator.push("/application/dashboard");
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {!mainPage && (
        <UnstyledButton
          className="mb-5 text-lg font-bold"
          onClick={backToPrevious}
        >
          <Group>
            <IconArrowLeft />
            <Text>Back to previous page</Text>
          </Group>
        </UnstyledButton>
      )}
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
        {folderList.length > 0 ? (
          <>
            {folderList.map((folder) => {
              return (
                <Grid.Col
                  span={3}
                  key={folder._id}
                  onDoubleClick={() => {
                    const path = `/application/project/${params.projectNameId}/${params.pageId}/folder/${folder._id}`;
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
        ) : (
          <EmptySectionSVG />
        )}
      </Grid>
      <Grid className="my-2">
        <Grid.Col span={12}>
          <Group>
            <Title order={3}>Documents</Title>
            <CreateNewDocCard addDocItem={handler.add} />
          </Group>
        </Grid.Col>
        {docList.length > 0 ? (
          docList.map((doc) => {
            return (
              <Grid.Col xs={6} md={3} key={doc._id}>
                <Card
                  doc={doc}
                  handler={handler}
                  updateOpenerData={updateOpenerData}
                />
              </Grid.Col>
            );
          })
        ) : (
          // {docList.length > 0 ? (
          //   docList.map((doc) => {
          //     return (
          //       <div className="mx-2 flex first:ml-0 last:mr-0" key={doc._id}>
          //         <Card
          //           doc={doc}
          //           handler={handler}
          //           updateOpenerData={updateOpenerData}
          //         />
          //       </div>
          //     );
          //   })
          <EmptySectionSVG />
        )}
      </Grid>
    </>
  );
};

export default DocCards;
