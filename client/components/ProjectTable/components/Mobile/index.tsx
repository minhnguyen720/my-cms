"use client";

import { Accordion } from "@mantine/core";
import useStyles from "./styles";

interface Props {
  items:  JSX.Element | JSX.Element[];
}

const ProjectTableMobile: React.FC<Props> = ({ items }) => {
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
