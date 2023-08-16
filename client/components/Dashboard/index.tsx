'use client'

import {
  createStyles,
  Group,
  Paper,
  Text,
  SimpleGrid,
  Title,
  Divider,
} from "@mantine/core";

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
  res: any;
}

export const Dashboard: React.FC<StatsGridIconsProps> = ({ data,res }) => {
  const { classes } = useStyles();
console.log(res)
  const stats = data.map((stat) => {
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
  });

  return (
    <div className={classes.root}>
      <Title order={2}>Welcome back!</Title>
      <Divider className="my-8" />
      <Title order={3} className="py-5">
        Projects overview
      </Title>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
};
