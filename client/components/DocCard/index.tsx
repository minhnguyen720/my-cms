"use client";

import { Card, Group, Button, Text, Grid } from "@mantine/core";
import React, { useState } from "react";
import { DetailItem } from "../DocDetail";
import { getFormattedTime } from "@/hooks/utilities/dayjs";
import CreateNewDocCard from "../CreateNewDocCard";

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
  const [docList, setDocList] = useState(docs);

  return (
    <>
      <h2 className="my-3">Document cards</h2>
      <Grid>
        <Grid.Col xs={6} md={4}>
          <CreateNewDocCard setDocList={setDocList} />
        </Grid.Col>
        {docList.map((doc) => {
          return (
            <Grid.Col xs={6} md={4} key={doc.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500} className="text-xl">
                    {doc.name}
                  </Text>
                </Group>

                <Text size="sm" color="dimmed">
                  <DetailItem
                    label="Created date"
                    content={getFormattedTime(doc.createdDate)}
                  />
                  <DetailItem label="Created by" content={doc.createdUser} />
                  <DetailItem
                    label="Last update"
                    content={getFormattedTime(doc.updatedDate)}
                  />
                  <DetailItem label="Update by" content={doc.updatedUser} />
                  <DetailItem
                    label="Number of fields"
                    content={doc.fields.length}
                  />
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
    </>
  );
};

export default DocCards;
