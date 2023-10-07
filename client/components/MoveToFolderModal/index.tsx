import { Button, Group, Modal, Table } from "@mantine/core";
import { PiCursorClickBold } from "react-icons/pi";
import SearchBar from "../SearchBar";
import { ChangeEvent } from "react";

interface Props {
  opened: boolean;
  handleCloseModal: () => void;
  handleMove: any;
  rows: any;
  handleSearch: any;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchResult?: any;
  handleReset: () => void;
}

const MoveToFolderModal: React.FC<Props> = ({
  opened,
  handleCloseModal,
  rows,
  handleMove,
  handleSearch,
  searchValue,
  setSearchValue,
  searchResult,
  handleReset,
}) => {
  return (
    <Modal.Root centered opened={opened} onClose={handleCloseModal} size="90%">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title className="p-2 text-[1.5rem] font-semibold">
            Folder List
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <SearchBar
            placeholder="Search by folder, page, project name"
            handleSearch={handleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleReset={handleReset}
          />
          <Table horizontalSpacing="lg" verticalSpacing="lg" highlightOnHover>
            <thead>
              <tr>
                <th>
                  <PiCursorClickBold className="text-lg" />
                </th>
                <th>Folder name</th>
                <th>Page</th>
                <th>Project</th>
                <th>Last updated</th>
              </tr>
            </thead>
            <tbody>{searchResult.length > 0 ? searchResult : rows}</tbody>
          </Table>
          <Group position="right" py={16}>
            <Button onClick={handleMove}>Confirm</Button>
            <Button color="red" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default MoveToFolderModal;
