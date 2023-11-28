"use client";

import { Accordion } from "@mantine/core";
import useStyles from "./styles";

const ProjectTableMobile = ({ items }) => {
  const { classes } = useStyles();

  return (
    <Accordion
      variant="filled"
      defaultValue="customization"
      classNames={classes}
      className={classes.root}
    >
      {items}
    </Accordion>
  );
};

export default ProjectTableMobile;
