"use client";

import {
  Avatar,
  Center,
  Stack,
  TextInput,
  Box,
  PasswordInput,
  Button,
  Group,
  Overlay,
  FileButton,
  AspectRatio,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useUserFormValidate from "../../hooks/useUserFormValidate";
import { User } from "@/interfaces/User";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";

interface props {
  userData: User;
}

function EditUserDetail({ userData }: props) {
  const { form } = useUserFormValidate(userData);
  const { hovered, ref } = useHover();
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (avatar !== null) console.log("avatar changed");
  }, [avatar]);

  return (
    <Box>
      <AspectRatio
        ratio={1 / 1}
        maw={90}
        sx={{ width: "content-fit" }}
        mx="auto"
        ref={ref}
      >
        <Avatar src={userData.avatar} alt="user avatar" size={"lg"} />
        {hovered && (
          <FileButton onChange={setAvatar} accept="image/png,image/jpeg">
            {(props) => (
              <Overlay
                {...props}
                center
                color="#000"
                opacity={0.85}
                className="w-full rounded"
              >
                <IconEdit />
              </Overlay>
            )}
          </FileButton>
        )}
      </AspectRatio>

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
            <TextInput label="Bio" {...form.getInputProps("bio")} />
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
