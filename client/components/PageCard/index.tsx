"use client";

import { Card, Group, Button, Text, Grid } from "@mantine/core";
import React from "react";

interface Props {
  docs: {
    id?: string;
    name?: string;
    createdDate?: string;
    updatedDate?: string;
    createdUser?: string;
    updatedUser?: string;
    fields?: string[];
    active?: boolean;
    page?: string;
    description?: string;
  }[];
}

const DocCards: React.FC<Props> = ({ docs }) => {
  return (
    <Grid>
      {docs.map((doc) => {
        return (
          <Grid.Col xs={6} md={4} key={doc.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder mb={16}>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500} className="text-xl">
                  {doc.name}
                </Text>
              </Group>

              <Text size="sm" color="dimmed">
                Document description
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Go to document detail
              </Button>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default DocCards;
