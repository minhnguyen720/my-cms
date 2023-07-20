"use client";

import SearchBar from "@/components/SearchBar";
import { Accordion } from "@mantine/core";
import useStyles from "./styles";
import { useMobileSearch } from "@/components/SearchBar/hooks";

interface Props {
  items: JSX.Element[];
}

const ProjectTableMobile: React.FC<Props> = ({ items }) => {
  const { classes } = useStyles();
  const { handleSearch, handleReset } = useMobileSearch();

  return (
    <>
      <SearchBar handleSearch={handleSearch} handleReset={handleReset} />
      <Accordion
        variant="filled"
        defaultValue="customization"
        classNames={classes}
        className={classes.root}
      >
        {items}
      </Accordion>
    </>
  );
};

export default ProjectTableMobile;
