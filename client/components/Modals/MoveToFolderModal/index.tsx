import {
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Modal,
  Table,
} from "@mantine/core";
import SearchBar from "@/components/SearchBar";

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
  targetId: string;
  moveType: string;
  loadingOverlayVisible: boolean;
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
  targetId,
  moveType,
  loadingOverlayVisible,
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
        <Box className="w-full" pos="relative">
          <LoadingOverlay
            visible={loadingOverlayVisible}
            overlayBlur={3}
            loaderProps={{ variant: "bars" }}
          />
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
                  <th></th>
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
              <Button
                onClick={() => {
                  handleMove(targetId, moveType);
                }}
              >
                Confirm
              </Button>
              <Button color="red" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Group>
          </Modal.Body>
        </Box>
      </Modal.Content>
    </Modal.Root>
  );
};

export default MoveToFolderModal;
