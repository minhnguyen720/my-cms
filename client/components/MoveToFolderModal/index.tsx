import { Checkbox, Modal, Table } from "@mantine/core";

interface Props {
  opened: boolean;
  handleCloseModal: () => void;
  handleOpenModal?: () => void;
  fetchedFolders: any;
  selection: string[];
  toggleAll: any;
  rows: any;
}

const MoveToFolderModal: React.FC<Props> = ({
  opened,
  handleCloseModal,
  fetchedFolders,
  toggleAll,
  selection,
  rows,
}) => {
  return (
    <Modal
      title="Folder list"
      // centered
      opened={opened}
      onClose={handleCloseModal}
      size="90%"
    >
      <Table horizontalSpacing="lg" verticalSpacing="lg" highlightOnHover>
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === fetchedFolders.length}
                indeterminate={
                  selection.length > 0 &&
                  selection.length !== fetchedFolders.length
                }
              />
            </th>
            <th>Folder name</th>
            <th>Page</th>
            <th>Project</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Modal>
  );
};

export default MoveToFolderModal;
