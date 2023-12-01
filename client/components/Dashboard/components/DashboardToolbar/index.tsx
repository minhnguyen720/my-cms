import CreateNewProjectModal from "@/components/Modals/CreateNewProjectModal";
import { Group, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash, IconZzz } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import React from "react";
import { selectionAtom } from "../../atoms";
import useToolbar from "../../hooks/useToolbar.hook";

interface Props {
  create: () => Promise<void>;
  updateSearchResult: (value: any) => void;
}

const DashboardToolbar: React.FC<Props> = ({ create, updateSearchResult }) => {
  const selection = useAtomValue(selectionAtom);
  const toolbar = useToolbar();

  // consider change this to hook after convert searchResult to atom
  const doRemoveAndUpdate = async () => {
    const newList = await toolbar.doRemove();
    updateSearchResult(newList);
  };

  return (
    <Group className="my-4">
      <Tooltip label="Create new project">
        <CreateNewProjectModal updateNewList={create} />
      </Tooltip>
      <Tooltip label="Delete selected items" disabled={selection.length <= 0}>
        <ActionIcon
          onClick={doRemoveAndUpdate}
          disabled={selection.length <= 0}
        >
          <IconTrash />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Deactive selected items" disabled={selection.length <= 0}>
        <ActionIcon
          onClick={toolbar.doDeactive}
          disabled={selection.length <= 0}
        >
          <IconZzz />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default DashboardToolbar;
