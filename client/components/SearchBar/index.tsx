import { ActionIcon, Box, Flex, Group, TextInput } from "@mantine/core";
import { IconSearch, IconRefresh } from "@tabler/icons-react";
import { useStyles } from "./style";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  handleSearch: (value: string) => void;
  handleReset: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({
  handleSearch,
  handleReset,
  searchValue,
  setSearchValue,
  placeholder,
}) => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(max-width: 474px)");

  return (
    <>
      <Flex>
        <Box className={matches ? "basis-[100%]" : "basis-[60%]"}>
          <TextInput
            placeholder={
              placeholder
                ? placeholder
                : "Search by document's name, created user's name and updated user's name"
            }
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            value={searchValue}
          />
        </Box>
        <Group
          spacing={"xs"}
          position="left"
          className={`ml-2 ${matches && "basis-full"}`}
          grow
        >
          <ActionIcon
            className={classes.searchbarIcon}
            onClick={() => {
              if (handleSearch) handleSearch(searchValue);
              else console.log("search");
            }}
          >
            <IconSearch />
          </ActionIcon>
          <ActionIcon
            className={classes.searchbarIcon}
            onClick={() => {
              if (handleReset) handleReset();
              else console.log("reset");
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
