"use client";

import { Button, Stack } from "@mantine/core";
import { IconMail, IconLock, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const EditUserDetail = () => {
  const router = useRouter();
  const handleUpdateOptions = (e) => {
    router.push(`/application/user/${e.currentTarget.name}`);
  };

  return (
    <Stack className="w-fit">
      <Button
        name="name"
        variant="light"
        leftIcon={<IconUser />}
        onClick={handleUpdateOptions}
      >
        Change your name
      </Button>
      <Button
        name="password"
        variant="light"
        leftIcon={<IconLock />}
        onClick={handleUpdateOptions}
      >
        Change password
      </Button>
      <Button
        name="email"
        variant="light"
        leftIcon={<IconMail />}
        onClick={handleUpdateOptions}
      >
        Change email
      </Button>
    </Stack>
  );
};

export default EditUserDetail;
