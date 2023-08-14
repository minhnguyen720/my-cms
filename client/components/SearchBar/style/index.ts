import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  searchbarIcon: {
    backgroundColor: theme.colors.dark[6],
    borderColor: theme.colors.dark[4],
    height: "100%",
    transition: "150ms all ease-in",
    maxWidth:"50px",

    "&:hover": {
      borderColor: theme.colors.blue[7],
    },
  },
}));

export default useStyles;
