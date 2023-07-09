import { User } from "@/interfaces/User";
import {
  Text,
  Avatar,
  Title,
  Flex,
  createStyles,
  Box,
  Divider,
  Group,
} from "@mantine/core";
import dayjs from "dayjs";

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

function ViewUserDetail({ userData }: { userData: User }) {
  const { classes } = useStyles();
  const displayData = [
    {
      label: "Name",
      text: userData.name,
    },
    {
      label: "Username",
      text: userData.username,
    },
    {
      label: "Account created date",
      text: dayjs(userData.createDated).format("DD/MM/YYYY"),
    },
    {
      label: "Account last update",
      text: dayjs(userData.updatedDate).format("DD/MM/YYYY"),
    },
    {
      label: "Email",
      text: userData.email,
    },
  ];

  return (
    <>
      <Group spacing={"xs"} px={"3rem"} mb={"1rem"}>
        <Avatar src={userData.avatar} alt="user avatar" radius={"xl"} />
        <Box ml={"1rem"}>
          <Title order={5}>{userData.name}</Title>
          {userData.bio && <Text>{userData.bio}</Text>}
        </Box>
      </Group>
      <Divider />
      <Flex
        wrap={"wrap"}
        justify={"space-between"}
        direction={"row"}
        px={"3rem"}
        mt={"1rem"}
      >
        <Box className={classes.box_item}>
          <Text className={classes.box_label}>Name</Text>
          <Text className={classes.box_text}>{userData.name}</Text>
        </Box>

        <Box className={classes.box_item}>
          <Text className={classes.box_label}>Username</Text>
          <Text className={classes.box_text}>{userData.username}</Text>
        </Box>

        <Box className={classes.box_item}>
          <Text className={classes.box_label}>Email</Text>
          <Text className={classes.box_text}>{userData.email}</Text>
        </Box>

        <Box className={classes.box_item}>
          <Text className={classes.box_label}>Account created date</Text>
          <Text className={classes.box_text}>
            {dayjs(userData.createDated).format("DD/MM/YYYY")}
          </Text>
        </Box>

        <Box className={classes.box_item}>
          <Text className={classes.box_label}>Last updated</Text>
          <Text className={classes.box_text}>
            {dayjs(userData.createDated).format("DD/MM/YYYY")}
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default ViewUserDetail;
