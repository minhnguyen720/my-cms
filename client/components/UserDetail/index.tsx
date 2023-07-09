"use client";

import { User } from "@/interfaces/User";
import React from "react";
import { Tabs, rem } from "@mantine/core";
import { IconUserCircle, IconUserCog } from "@tabler/icons-react";
import ViewUserDetail from "./components/ViewUserDetail";
import EditUserDetail from "./components/EditUserDetail";

const { List, Tab, Panel } = Tabs;

function UserDetail({ userData }: { userData: User }) {
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
        <ViewUserDetail userData={userData} />
      </Panel>
      <Panel value="edit" pt={"1.5rem"}>
        <EditUserDetail userData={userData} />
      </Panel>
    </Tabs>
  );
}

export default UserDetail;
