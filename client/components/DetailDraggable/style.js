import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: "12px",
    border: `1px solid
      light-dark${(theme.colors.gray[2], theme.colors.dark[5])}`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc${theme.spacing.xl - theme.spacing.md}`,
    backgroundColor: `light-dark(${theme.colors.white}, ${theme.colors.dark[5]})`,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem("30px"),
    fontWeight: 700,
    width: rem("60px"),
  },

  dragHandle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: `light-dark(${theme.colors.gray[6]}, ${theme.colors.dark[1]})`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));
