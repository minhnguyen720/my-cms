import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Kbd,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { getHotkeyHandler, useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconRefresh,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import useStyles from "./style";
import { ChangeEvent, useEffect, useRef } from "react";

interface Props {
  handleSearch: (value: string) => void;
  handleReset: () => void;
  searchValue: string;
  setSearchValue: (value: string | ChangeEvent<any>) => void;
}

const SearchBar: React.FC<Props> = ({
  handleSearch,
  handleReset,
  searchValue,
  setSearchValue,
}) => {
  const { classes } = useStyles();
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener(
      "keydown",
      getHotkeyHandler([
        [
          "shift + S",
          (e) => {
            e.preventDefault();
            if (inputRef.current !== null) inputRef.current.focus();
          },
        ],
        [
          "shift + B",
          (e) => {
            e.preventDefault();
            if (inputRef.current !== null) inputRef.current.blur();
          },
        ],
      ])
    );
  }, [inputRef]);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size={"lg"}
        centered
        opened={opened}
        onClose={close}
        title="Search bar hotkeys manual"
      >
        <Stack p={16}>
          <Box>
            <Kbd>Shift</Kbd> + <Kbd>S</Kbd>: focus search bar
          </Box>
          <Box>
            <Kbd>Shift</Kbd> + <Kbd>B</Kbd>: out focus search bar
          </Box>
          <Box>
            <Kbd>Shift</Kbd> + <Kbd>R</Kbd>: reset search result
          </Box>
          <Box>
            <Kbd>Enter</Kbd>: search
          </Box>
        </Stack>
      </Modal>
      <Flex className="">
        <Box className="mr-2 text-center my-auto">
          <ActionIcon onClick={open}>
            <IconInfoCircleFilled />
          </ActionIcon>
        </Box>
        <Box className="basis-[70%]">
          <TextInput
            ref={inputRef}
            onKeyDown={getHotkeyHandler([
              [
                "Enter",
                () => {
                  handleSearch(searchValue);
                },
              ],
              [
                "shift+R",
                () => {
                  handleReset();
                  inputRef.current.blur();
                },
              ],
            ])}
            placeholder="Search by document's name, created user's name and updated user's name"
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            value={searchValue}
          />
        </Box>
        <Group spacing={"xs"} position="left" className="ml-2 basis-[25%]" grow>
          <ActionIcon
            className={classes.searchbarIcon}
            onClick={() => {
              handleSearch(searchValue);
            }}
          >
            <IconSearch />
          </ActionIcon>
          <ActionIcon
            className={classes.searchbarIcon}
            onClick={() => {
              handleReset();
            }}
          >
            <IconRefresh />
          </ActionIcon>
        </Group>
      </Flex>
    </>
  );
};

export default SearchBar;
