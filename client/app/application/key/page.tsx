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

const dummyCode = `http://localhost:4000/data?projectId={projectId}&pageId={pageId}&appid={API_KEY}`;

const exampleApiRes = `
{
   "lat":33.44,
   "lon":-94.04,
   "timezone":"America/Chicago",
   "timezone_offset":-18000,
   "current":{
      "dt":1684929490,
      "sunrise":1684926645,
      "sunset":1684977332,
      "temp":292.55,
      "feels_like":292.87,
      "pressure":1014,
      "humidity":89,
      "dew_point":290.69,
      "uvi":0.16,
      "clouds":53,
      "visibility":10000,
      "wind_speed":3.13,
      "wind_deg":93,
      "wind_gust":6.71,
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ]
   },
   "minutely":[
      {
         "dt":1684929540,
         "precipitation":0
      },
      ...
   ],
  ]
}`;

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
    <Box>
      <Title order={2} className="mb-4">
        API Key
      </Title>
      <Paper className="p-5">
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
      <Group>
        <Code className="w-[80%] text-base" block>
          {dummyCode}
        </Code>
        <CopyButton value={dummyCode !== undefined ? dummyCode : ""}>
          {({ copied, copy }) => (
            <Button
              disabled={
                dummyCode === undefined || dummyCode.trim().length === 0
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

      <Title order={2} className="my-4">
        Example of API response
      </Title>
      <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
        <Prism language="json" className="text-base">
          {exampleApiRes}
        </Prism>
      </Spoiler>
    </Box>
  );
};

export default Key;
