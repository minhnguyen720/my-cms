"use client";

import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  rem,
  Group,
} from "@mantine/core";
import image from "@/public/images/404.svg";
import { useRouter } from "next/navigation";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function GeneralNotFound() {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
      >
        <Image
          src={image.src}
          className={classes.mobileImage}
          alt="not_found_1"
        />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Your data is failed to load. It may be caused by network error or
            this data is corrupted. Please wait a bit and reload the page.
          </Text>
          <Group>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
              onClick={() => {
                router.push("/application/dashboard");
              }}
            >
              Get back to home page
            </Button>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
              onClick={() => {
                location.reload();
              }}
            >
              Reload
            </Button>
          </Group>
        </div>
        <Image
          src={image.src}
          className={classes.desktopImage}
          alt="not_found_2"
        />
      </SimpleGrid>
    </Container>
  );
}
