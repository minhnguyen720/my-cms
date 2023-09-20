import { Modal, Table } from "@mantine/core";
import React from "react";

interface Props {
  opened: boolean;
  handleCloseModal: () => void;
  handleOpenModal?: () => void;
}

const MoveToFolderModal: React.FC<Props> = ({
  opened,
  handleCloseModal,
  handleOpenModal,
}) => {
  return (
    <div>
      <Modal title="Move to folder" centered opened={opened} onClose={handleCloseModal}>
        <Table>
          <thead>
            <tr>
              <th>Folder name</th>
              <th>Page</th>
              <th>Project</th>
              <th>Last updated</th>
            </tr>
          </thead>
          {/* <tbody>{rows}</tbody> */}
        </Table>
      </Modal>
    </div>
  );
};

export default MoveToFolderModal;
