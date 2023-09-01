import { ActionIcon, Box, Flex, Group, TextInput } from "@mantine/core";
import { getHotkeyHandler, useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconRefresh,
  IconInfoCircleFilled,
  IconPlus,
} from "@tabler/icons-react";
import useStyles from "./style";
import { ChangeEvent, useEffect, useRef } from "react";
import { Tips } from "./components/Tips";
import { useRouter, usePathname } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";

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
  const navigator = useRouter();
  const currentPathname = usePathname();
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
      ])
    );
  }, [inputRef]);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tips opened={opened} close={close} />
      <Flex>
        <Box className="mr-2 text-center my-auto">
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
            placeholder="Search by document's name, created user's name and updated user's name"
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
          <ActionIcon
            className={classes.searchbarIcon}
            onClick={() => {
              navigator.push(`${currentPathname}/new-page`);
            }}
          >
            <IconPlus />
          </ActionIcon>
        </Group>
      </Flex>
    </>
  );
};

export default SearchBar;
