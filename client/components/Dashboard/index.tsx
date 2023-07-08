import { createStyles, Group, Paper, Text, SimpleGrid } from "@mantine/core";

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
}

export function Dashboard({ data }: StatsGridIconsProps) {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
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
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
