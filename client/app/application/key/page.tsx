"use client";

import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  Box,
  Button,
  CopyButton,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import ExamplePublicApi from "@/components/PublicApi";

const getPageDataApiStructure = `http://localhost:4000/data?pg={pageId}&key={API_KEY}`;

const getPageDataApiRes = `
{
  "_id": "65549082fe504a9200df7e82",
  "name": "p1",
  "docs": [
    {
      "_id": "6554cec76e878d8abb8f44e7",
      "name": "hello",
      "description": "1",
      "fields": [
        {
          "_id": "6554d308abc60f04b2e6222a",
          "label": "esfdsf",
          "order": 0,
          "value": "asasdsad"
        }
      ]
    },
    {
      "_id": "6554ced26e878d8abb8f44e9",
      "name": "world",
      "description": "2",
      "fields": [
        {
          "_id": "6554d323abc60f04b2e62246",
          "label": "asasdasd",
          "order": 0,
          "value": "zxcvzxcvzcvzxcv"
        }
      ]
    },
    {
      "_id": "6554ced76e878d8abb8f44eb",
      "name": "foo",
      "description": "",
      "fields": []
    }
  ]
}
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
      setKey(keyRes.data.apikey);
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

      <ExamplePublicApi
        code={getPageDataApiStructure}
        exampleRes={getPageDataApiRes}
      />
    </Box>
  );
};

export default Key;
