import { ActionIcon, Box, Flex, Group, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconSearch, IconRefresh } from "@tabler/icons-react";
import useStyles from "./style";
import { KeyboardEvent } from "react";

interface Props {
  handleSearch: (value: string) => void;
  handleReset: () => void;
}

const SearchBar: React.FC<Props> = ({ handleSearch, handleReset }) => {
  const [searchValue, setSearchValue] = useInputState("");
  const { classes } = useStyles();

  const handleHotKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    } else if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      handleReset();
    }
  };

  return (
    <Flex className="">
      <Box className="basis-[75%]">
        <TextInput
          onKeyDown={(e) => {
            handleHotKey(e);
          }}
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
