"use client";

import {
  Stack,
  Group,
  Text,
  UnstyledButton,
  ActionIcon,
  Tooltip,
  Divider,
} from "@mantine/core";
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
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/utilities/useLoading";
import { errorNotification } from "@/hooks/notifications/notificationPreset";

const DocDetailContainer = ({ switchProps }) => {
  const form = useForm();
  const [baseUrl] = useGetBaseUrl();
  const fieldHandler = useFields();
  const params = useParams();
  const at = getCookie("at");
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();

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

  const backToPageOverall = () => {
    try {
      showLoading();
      router.push(
        `/application/project/${params.projectNameId}/${params.pageId}`,
      );
    } catch (error) {
      errorNotification("Something went wrong. Moving back to Dashboard.");
      router.push("/application/dashboard");
    } finally {
      hideLoading();
    }
  };

  const backToPrevious = () => {
    try {
      showLoading();
      router.back();
    } catch (error) {
      errorNotification("Something went wrong. Moving back to Dashboard.");
      router.push("/application/dashboard");
    } finally {
      hideLoading();
    }
  };

  return (
    <Stack>
      <Group>
        <Tooltip label="Back to previous page">
          <ActionIcon onClick={backToPrevious}>
            <IconArrowLeft />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Back to page overall">
          <ActionIcon onClick={backToPageOverall}>
            <IconHome />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Divider className="my-2" />
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
