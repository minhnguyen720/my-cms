import { ActionIcon, Box, Flex, Group, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSearch, IconRefresh } from "@tabler/icons-react";
import useStyles from "./style";
import { ChangeEvent, useRef } from "react";

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
              "ctrl+R",
              () => {
                handleReset();
                inputRef.current.blur();
              },
            ],
          ])}
          placeholder="Search by any field"
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
