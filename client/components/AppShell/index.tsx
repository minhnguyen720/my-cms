"use client";

import {
  MantineProvider,
  AppShell as MantineAppShell,
  Header,
  Text,
  Group,
  LoadingOverlay,
  Box,
  ActionIcon,
} from "@mantine/core";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Image from "next/image";
import useCurrentMenu from "./hooks/useCurrentMenu";
import useLoading from "@/hooks/utilities/useLoading";
import { Notifications } from "@mantine/notifications";
import { IconBurger } from "@tabler/icons-react";

interface Props {
  children: any;
}

const AppShell: React.FC<Props> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const { currentMenu, handleCurrentMenu } = useCurrentMenu();
  const { getLoadingFlag } = useLoading();

  return (
    <Box className="z-10 h-screen w-full" pos="relative">
      <LoadingOverlay
        visible={getLoadingFlag()}
        loaderProps={{ variant: "bars" }}
        overlayBlur={10}
        overlayColor="#1a1a1a"
      />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <Notifications />
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ActionIcon
              size="xl"
              variant="transparent"
              className="mr-8"
              onClick={() => setOpened((o) => !o)}
            >
              <IconBurger size="2.125rem" />
            </ActionIcon>
            <Group>
              <Image
                src={"/images/icon/android-chrome-192x192.png"}
                alt="my cms logo"
                width={40}
                height={40}
              />
              <Text>MyCMS</Text>
            </Group>
          </div>
        </Header>
        <Navbar
          hidden={!opened}
          hiddenBreakpoint="100000rem"
          currentMenu={currentMenu}
          handleCurrentMenu={handleCurrentMenu}
          setOpened={setOpened}
        />
        <div className="p-10">{children}</div>
      </MantineProvider>
    </Box>
  );
};

export default AppShell;
