"use client";

import { Stack, Group } from "@mantine/core";
import React from "react";
import CreateNewField from "../CreateNewField";
import FormDetailItem from "../FormDetailItem";
import ManageOrderModal from "../Modals/ManageOrderModal";
import SaveButton from "../SaveButton";
import { useForm } from "@mantine/form";

const DocDetailContainer = ({ page, doc }) => {
  const form = useForm();

  console.log(page);
  console.log(doc);

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

  const handleDetailOnChange = async () => {};

  return (
    <Stack>
      <Group>
        <ManageOrderModal />
        <CreateNewField />
        <SaveButton />
        {/* <ActiveSwitch onChange={handleDetailOnChange}/> */}
      </Group>

      <FormDetailItem data={[imageDetail, textDetail]} form={form} />
    </Stack>
  );
};

export default DocDetailContainer;
