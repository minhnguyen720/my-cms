"use client";

import {
  Avatar,
  Center,
  Stack,
  Text,
  Title,
  TextInput,
  Box,
  PasswordInput,
  Button,
  Group,
} from "@mantine/core";
import useUserFormValidate from "../../hooks/useUserFormValidate";
import { User } from "@/interfaces/User";

interface props {
  userData: User;
}

function EditUserDetail({ userData }: props) {
  const { form } = useUserFormValidate(userData);

  return (
    <Box>
      <Center>
        <Stack spacing={"xs"}>
          <Center>
            <Avatar src={userData.avatar} alt="user avatar" radius={"xl"} />
          </Center>
          <Title order={5} align="center">
            {userData.name}
          </Title>
          {userData.bio && <Text align="center">{userData.bio}</Text>}
        </Stack>
      </Center>

      <Box
        sx={{
          padding: "2rem 25%",
        }}
      >
        <Stack spacing={"md"}>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              label="Email"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Name"
              withAsterisk
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Username"
              withAsterisk
              {...form.getInputProps("userName")}
            />
            <PasswordInput
              disabled
              label="Password"
              withAsterisk
              {...form.getInputProps("password")}
            />
            <Group position="right" mt={"md"}>
              <Button type="submit">Save</Button>
            </Group>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}

export default EditUserDetail;
