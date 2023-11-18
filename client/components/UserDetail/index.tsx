"use client";

import React from "react";
import { Tabs } from "@mantine/core";
import { IconUserCircle, IconUserCog } from "@tabler/icons-react";
import ViewUserDetail from "./components/ViewUserDetail";
import EditUserDetail from "./components/EditUserDetail";

const { List, Tab, Panel } = Tabs;

interface Props {}

const UserDetail: React.FC<Props> = () => {
  return (
    <Tabs defaultValue="view" radius="md">
      <List>
        <Tab value="view" icon={<IconUserCircle />}>
          User detail
        </Tab>
        <Tab value="edit" icon={<IconUserCog />}>
          Edit user detail
        </Tab>
      </List>
      <Panel value="view" pt={"1.5rem"}>
        <ViewUserDetail />
      </Panel>
      <Panel value="edit" pt={"1.5rem"}>
        <EditUserDetail />
      </Panel>
    </Tabs>
  );
};

export default UserDetail;
