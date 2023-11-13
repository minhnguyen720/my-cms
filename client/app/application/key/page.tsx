"use client";

import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  Box,
  Button,
  Code,
  CopyButton,
  Group,
  Paper,
  Spoiler,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { Prism } from "@mantine/prism";

const getPageDataApiStructure = `http://localhost:4000/data?pg={pageId}&key={API_KEY}`;

const getPageDataApiRes = `[
  {
    "_id": "6551d8319346901c602662dd",
    "name": "world",
    "project": "6551d7bc9346901c602662c5",
    "docs": [
      {
        "_id": "6551dd9f9346901c6026647f",
        "name": "foobar",
        "fields": [
          {
            "_id": "65520b3ee4902286cafd7097",
            "value": "<p>Welcome to my CMS</p>"
          },
          ...
        ],
        "description": "123"
      },
      ...
    ]
  },
  ...
]
`;

const Key = () => {
  const [key, setKey] = useState<string | undefined>(undefined);
  const at = getCookie("at");
  const [baseUrl] = useGetBaseUrl();

  useEffect(() => {
    const initKey = async () => {
      const keyRes = await axios.get(`${baseUrl}/auth/key`, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      setKey(keyRes.data);
    };

    initKey();
  }, [at, baseUrl]);

  return (
    <Box className="pb-2">
      <Title order={2} className="mb-4">
        API Key
      </Title>
      <Paper className="w-[80%] p-5">
        <Text>Copy this key with the param to get your data.</Text>
        <Text>
          For security purpose, we suggest you have a proxy server to call myCMS
          API instead of call directly from your front end.
        </Text>
      </Paper>
      <Group className="mt-4">
        <TextInput className="w-[80%]" value={key} disabled />
        <CopyButton value={key !== undefined ? key : ""}>
          {({ copied, copy }) => (
            <Button
              disabled={key === undefined || key.trim().length === 0}
              color={copied ? "teal" : "blue"}
              onClick={copy}
            >
              {copied ? "Copied key" : "Copy key"}
            </Button>
          )}
        </CopyButton>
      </Group>
      <Title order={2} className="my-4">
        How to make an API call
      </Title>
      <Title order={3} className="my-4">
        Get page data
      </Title>
      <Group>
        <Code className="w-[80%] text-base" block>
          {getPageDataApiStructure}
        </Code>
        <CopyButton
          value={
            getPageDataApiStructure !== undefined ? getPageDataApiStructure : ""
          }
        >
          {({ copied, copy }) => (
            <Button
              disabled={
                getPageDataApiStructure === undefined ||
                getPageDataApiStructure.trim().length === 0
              }
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
          {getPageDataApiRes}
        </Prism>
      </Spoiler>
    </Box>
  );
};

export default Key;
