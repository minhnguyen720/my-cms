import { Button, Checkbox, Group, Modal, Table } from "@mantine/core";
import SearchBar from "../SearchBar";

interface Props {
  opened: boolean;
  handleCloseModal: () => void;
  handleMove: any;
  fetchedFolders: any;
  handleSearch: any;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchResult?: any;
  handleReset: () => void;
  selection: any;
  toggleRow: (rowId: string) => void;
  toggleAll: () => void;
  docId: string;
  moveType: string;
}

const MoveToFolderModal: React.FC<Props> = ({
  opened,
  handleCloseModal,
  fetchedFolders,
  handleMove,
  handleSearch,
  searchValue,
  setSearchValue,
  handleReset,
  selection,
  toggleRow,
  toggleAll,
  docId,
  moveType
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
            <tbody>
              {fetchedFolders.length > 0 &&
                fetchedFolders.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Checkbox
                          checked={selection.includes(item.id)}
                          onChange={() => {
                            toggleRow(item.id);
                          }}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.page}</td>
                      <td>{item.project}</td>
                      <td>{item.updatedDate}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <Group position="right" py={16}>
            <Button onClick={() => {
              handleMove(docId,moveType)
            }}>Confirm</Button>
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
