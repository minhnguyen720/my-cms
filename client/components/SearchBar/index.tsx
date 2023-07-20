import { ActionIcon, Box, Flex, Group, TextInput } from "@mantine/core";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";
import { IconSearch, IconRefresh } from "@tabler/icons-react";
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

  return (
    <Flex className="">
      <Box className="basis-[75%]">
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
          onChange={setSearchValue}
          value={searchValue}
        />
      </Box>
      <Group spacing={"xs"} position="right" className="ml-2 basis-[25%]" grow>
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
  );
};

export default SearchBar;
