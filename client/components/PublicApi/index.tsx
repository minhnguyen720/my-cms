import {
  Box,
  Paper,
  Group,
  TextInput,
  CopyButton,
  Button,
  Title,
  Code,
  Spoiler,
  Text,
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import React from "react";

const ExamplePublicApi = ({ title, code, exampleRes }) => {
  return (
    <Box>
      <Title order={3} className="my-4">
        {title}
      </Title>
      <Group>
        <Code className="w-[80%] text-base" block>
          {code}
        </Code>
        <CopyButton value={code !== undefined ? code : ""}>
          {({ copied, copy }) => (
            <Button
              disabled={code === undefined || code.trim().length === 0}
              color={copied ? "teal" : "blue"}
              onClick={copy}
            >
              {copied ? "Copied line" : "Copy line"}
            </Button>
          )}
        </CopyButton>
      </Group>
      <Box>{/* explain api param goes here */}</Box>
      <Title order={3} className="my-4">
        Example of API response
      </Title>
      <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
        <Prism language="json" className="w-fit min-w-[35rem] text-base">
          {exampleRes}
        </Prism>
      </Spoiler>
    </Box>
  );
};

export default ExamplePublicApi;
