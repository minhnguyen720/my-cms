"use client";

import {
  createStyles,
  Group,
  Paper,
  Text,
  SimpleGrid,
  Title,
  Divider,
} from "@mantine/core";
import DashboardProjects from "./components/DashboardProjects";
import { Navlink } from "@/interfaces/NavLink";
import { useAtomValue } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { statAtom } from "./atoms";
import { userAtom } from "../Navbar";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface StatsGridIconsProps {
  data: { title: string; value: string }[];
  projects: Navlink[];
  totalPages: number;
}

export const Dashboard: React.FC<StatsGridIconsProps> = ({
  data,
  projects,
  totalPages,
}) => {
  const { classes } = useStyles();
  useHydrateAtoms([[statAtom, data]]);
  const statData = useAtomValue(statAtom);
  const user = useAtomValue(userAtom);

  return (
    <>
      <Title order={2}>
        {typeof user !== "boolean"
          ? `Greeting ${user.name}!`
          : "Welcome to myCMS!"}
      </Title>
      <Divider className="my-8" />
      <Title order={1} className="pb-8">
        Overview
      </Title>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {statData.map((stat) => {
          return (
            <Paper
              withBorder
              p="md"
              radius="md"
              key={stat.title}
              sx={(theme) => ({
                transition: "all 200ms linear",
                cursor: "pointer",

                "&:hover": {
                  borderColor: theme.colors.cyan[5],
                },
              })}
            >
              <Group position="apart">
                <div>
                  <Text
                    c="dimmed"
                    tt="uppercase"
                    fw={700}
                    fz="xs"
                    className={classes.label}
                  >
                    {stat.title}
                  </Text>
                  <Text fw={700} fz="xl">
                    {stat.value}
                  </Text>
                </div>
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>

      <DashboardProjects projects={projects} totalPages={totalPages} />
    </>
  );
};
