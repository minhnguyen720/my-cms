"use client";

import {
  MantineProvider,
  AppShell as MantineAppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Text,
} from "@mantine/core";
import Navbar from "@/components/Navbar";
import { useState } from "react";

interface props {
  children: any;
}

function AppShell({ children }: props) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <MantineAppShell
        navbar={<Navbar hidden={!opened} hiddenBreakpoint="sm" />}
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

              <Text>MyCMS</Text>
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
