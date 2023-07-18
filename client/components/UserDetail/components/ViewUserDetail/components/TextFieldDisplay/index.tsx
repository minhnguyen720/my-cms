import { Box, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  box_item: {
    flexBasis: "50%",
    marginBottom: "1rem",
  },
  box_text: {
    fontWeight: 600,
  },
  box_label: {
    color: "#848484",
  },
}));

interface Props {
  label: string;
  text: string;
}

const TextFieldDisplay:React.FC<Props> = ({ label, text }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.box_item}>
      <Text className={classes.box_label}>{label}</Text>
      <Text className={classes.box_text}>{text}</Text>
    </Box>
  );
}

export default TextFieldDisplay;
