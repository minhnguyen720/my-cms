"use client";

import { Stack, Group } from "@mantine/core";
import React from "react";
import CreateNewField from "../../Fields/CreateNewField";
import FormDetailItem from "../../FormDetailItem";
import ManageOrderModal from "../../Modals/ManageOrderModal";
import SaveButton from "../../SaveButton";
import { useForm } from "@mantine/form";
import ActiveSwitch from "../../Dashboard/components/ActiveSwitch";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useFields from "@/components/Fields/hooks/useFields";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";

const DocDetailContainer = ({ switchProps }) => {
  const form = useForm();
  const [baseUrl] = useGetBaseUrl();
  const fieldHandler = useFields();
  const params = useParams();
  const at = getCookie("at");

  const handleDetailOnChange = async () => {
    await axios.put(
      `${baseUrl}/doc/status`,
      {
        id: switchProps.id,
        value: !switchProps.active,
      },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      },
    );
  };

  return (
    <Stack>
      <Group>
        {/* <ManageOrderModal /> */}
        <CreateNewField fieldHandler={fieldHandler} />
        <SaveButton
          fieldHandler={fieldHandler}
          docId={params.detailId}
          form={form}
        />
        <ActiveSwitch element={switchProps} onChange={handleDetailOnChange} />
      </Group>

      <FormDetailItem form={form} fieldHandler={fieldHandler} />
    </Stack>
  );
};

export default DocDetailContainer;
