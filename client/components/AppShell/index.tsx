"use client";

import {
  MantineProvider,
  AppShell as MantineAppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Text,
  Group,
  Box,
} from "@mantine/core";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import useCurrentMenu from "./hooks/useCurrentMenu";

interface Props {
  children: any;
}

const AppShell:React.FC<Props> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { currentMenu, handleCurrentMenu } = useCurrentMenu();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <MantineAppShell
        navbar={
          <Navbar
            hidden={!opened}
            hiddenBreakpoint="sm"
            handleCurrentMenu={handleCurrentMenu}
          />
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Group>
                <Image
                  src={"/images/icon/android-chrome-192x192.png"}
                  alt="my cms logo"
                  width={40}
                  height={40}
                />
                <Text>{currentMenu}</Text>
              </Group>
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </MantineAppShell>
    </MantineProvider>
  );
}

export default AppShell;
