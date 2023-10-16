"use client";

import React from "react";
import { Group, Stack } from "@mantine/core";
import ManageOrderModal from "@/components/Modals/ManageOrderModal";
import CreateNewField from "@/components/CreateNewField";
import FormDetailItem from "@/components/FormDetailItem";
import { useForm } from "@mantine/form";
import SaveButton from "@/components/SaveButton";

const DocDetail = () => {
  const form = useForm();

  const imageDetail = {
    type: "image",
    field_id: "hehe",
    label: "Image Test",
    active: true,
    required: true,
    value:
      "https://i.pinimg.com/564x/2a/ed/3c/2aed3c332a284221006174d818eddaba.jpg",
  };

  const textDetail = {
    type: "text",
    field_id: "hehe",
    label: "Test",
    active: true,
    required: true,
    value:
      "https://i.pinimg.com/564x/2a/ed/3c/2aed3c332a284221006174d818eddaba.jpg",
  };

  return (
    <Stack>
      <Group>
        <ManageOrderModal />
        <CreateNewField />
        <SaveButton />
      </Group>

      <FormDetailItem data={[imageDetail, textDetail]} form={form} />
    </Stack>
  );
};

export default DocDetail;
