"use client";

import useGetBaseUrl from "@/hooks/utilities/getUrl";
import {
  Alert,
  Box,
  Button,
  CopyButton,
  Group,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import ExamplePublicApi from "@/components/PublicApi";
import { IconAlertCircle } from "@tabler/icons-react";

const getPageDataApiStructure = `http://localhost:4000/data/page?pg={pageId}&key={API_KEY}`;
const getProjectDataApiStructure = `http://localhost:4000/data/project?pj={projectId}&key={API_KEY}`;

const getPageDataApiRes = `
{
  "_id": "655b1d634ddaf62767985a7a",
  "name": "Landing Page",
  "docs": [
    {
      "_id": "655b24040771873fe14fb09c",
      "name": "Hero",
      "description": "Including hero section's content",
      "fields": {
        "hero_img": {
          "_id": "655b2b6a0771873fe14fb298",
          "label": "Hero Title Logo Image",
          "order": 0,
          "value": "http://localhost:4000/storage/655b2e0e93adf5689318eee0"
        },
        "hero_title": {
          "_id": "655b2e4193adf5689318eeeb",
          "label": "Hero title",
          "order": 1,
          "value": "<p>Putuk Truno</p><p>Camp Area</p>"
        },
        "hero_desc": {
          "_id": "655b2e7493adf5689318eef2",
          "label": "Hero more desc",
          "order": 2,
          "value": "<p>We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app</p>"
        }
      }
    },
  ]
}
`;

const getProjectDataApiRes = `
{
  "_id": "655b1d3c4ddaf62767985a6e",
  "name": "Travel",
  "pages": [
    {
      "_id": "655b1d634ddaf62767985a7a",
      "name": "Landing Page",
      "docs": [
        {
          "_id": "655b24040771873fe14fb09c",
          "name": "Hero",
          "description": "Including hero section's content",
          "fields": {
            "hero_img": {
              "_id": "655b2b6a0771873fe14fb298",
              "label": "Hero Title Logo Image",
              "order": 0,
              "value": "http://localhost:4000/storage/655b2e0e93adf5689318eee0"
            },
            "hero_title": {
              "_id": "655b2e4193adf5689318eeeb",
              "label": "Hero title",
              "order": 1,
              "value": "<p>Putuk Truno</p><p>Camp Area</p>"
            },
            "hero_desc": {
              "_id": "655b2e7493adf5689318eef2",
              "label": "Hero more desc",
              "order": 2,
              "value": "<p>We want to be on each of your journeys seeking the satisfaction of seeing the incorruptible beauty of nature. We can help you on an adventure around the world in just one app</p>"
            }
          }
        },
        {
          "_id": "655b252a0771873fe14fb104",
          "name": "Features",
          "description": "Say something cool about our features",
          "fields": {
            "introduction": {
              "_id": "655b36f693adf5689318f102",
              "label": "Introduction",
              "order": 0,
              "value": "<p><strong>Feeling Lost</strong> And Not Knowing The Way?</p>"
            },
            "putuk_truno_camp_desc": {
              "_id": "655b370e93adf5689318f109",
              "label": "More",
              "order": 1,
              "value": "<p>Starting from the anxiety of the climbers when visiting a new climbing location, the possibility of getting lost is very large. That's why we are here for those of you who want to start an adventure</p>"
            },
          }
        },
      ]
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
      <Alert icon={<IconAlertCircle size="1rem" />} className="w-[80%] p-5">
        <Text>Copy this key with the param to get your data.</Text>
        <Text>
          For security purpose, we suggest you have a proxy server to call myCMS
          API instead of call directly from your front end.
        </Text>
      </Alert>
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
        title={"Get page data"}
        code={getPageDataApiStructure}
        exampleRes={getPageDataApiRes}
      />
      <ExamplePublicApi
        title={"Get project data"}
        code={getProjectDataApiStructure}
        exampleRes={getProjectDataApiRes}
      />
    </Box>
  );
};

export default Key;
