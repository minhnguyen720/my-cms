"use client";

import React from "react";
import { Group, Stack } from "@mantine/core";
import ManageOrderModal from "@/components/ManageOrderModal";
import CreateNewField from "@/components/CreateNewField";
import FormDetailItem from "@/components/FormDetailItem";
import { useForm } from "@mantine/form";

const DocDetail = () => {
  const form = useForm();

  const dummyDetail = {
    type: "text",
    field_id: "hehe",
    label: "Test",
    active: true,
    required: true,
  };

  return (
    <Stack>
      <Group>
        <ManageOrderModal />
        <CreateNewField />
      </Group>
        <FormDetailItem data={[dummyDetail]} form={form} />
        <FormDetailItem data={[dummyDetail]} form={form} />
        <FormDetailItem data={[dummyDetail]} form={form} />
        <FormDetailItem data={[dummyDetail]} form={form} />
    </Stack>
  );
};

export default DocDetail;
