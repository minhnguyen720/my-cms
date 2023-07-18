import { User } from "@/interfaces/User";
import {
  Text,
  Avatar,
  Title,
  Flex,
  Box,
  Divider,
  Group,
} from "@mantine/core";
import dayjs from "dayjs";
import TextFieldDisplay from "./components/TextFieldDisplay";

interface Props {
  userData: User
}

const ViewUserDetail:React.FC<Props> = ({ userData }) => {
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
      text: dayjs(userData.createDated).format("DD/MM/YYYY").toString(),
    },
    {
      label: "Account last update",
      text: dayjs(userData.updatedDate).format("DD/MM/YYYY").toString(),
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
        {displayData.map((item, index) => {
          return (
            <TextFieldDisplay label={item.label} text={item.text} key={index} />
          );
        })}
      </Flex>
    </>
  );
}

export default ViewUserDetail;
