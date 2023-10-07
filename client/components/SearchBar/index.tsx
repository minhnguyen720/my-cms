import { ActionIcon, Box, Flex, Group, TextInput } from "@mantine/core";
import { getHotkeyHandler, useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconRefresh,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import useStyles from "./style";
import { useEffect, useRef } from "react";
import { Tips } from "./components/Tips";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  handleSearch?: (value: string) => void;
  handleReset?: () => void;
  searchValue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
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
  const inputRef = useRef(null);
  const matches = useMediaQuery("(max-width: 474px)");

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
      ]),
    );
  }, [inputRef]);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tips opened={opened} close={close} />
      <Flex>
        <Box className="my-auto mr-2 text-center">
          <ActionIcon onClick={open}>
            <IconInfoCircleFilled />
          </ActionIcon>
        </Box>
        <Box className={matches ? "basis-[100%]" : "basis-[60%]"}>
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
