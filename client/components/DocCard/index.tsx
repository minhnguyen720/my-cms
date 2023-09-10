"use client";

import { Grid } from "@mantine/core";
import React, { useState } from "react";
import CreateNewDocCard from "../CreateNewDocCard";
import Card from "./Card";

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
              <Card doc={doc} />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default DocCards;
