import {
  Modal,
  Group,
  Button,
  ActionIcon,
  Box,
  Switch,
  LoadingOverlay,
  Tooltip,
  Divider,
  TextInput,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconSettings2 } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";
import { FieldHandler } from "../hooks/useFields";
import axios from "axios";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { useParams } from "next/navigation";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { getCookie } from "cookies-next";
import { useForm } from "@mantine/form";
import useLoading from "@/hooks/utilities/useLoading";

interface Props {
  required: boolean;
  active: boolean;
  fieldId: string;
  fieldHandler: FieldHandler;
  id: string;
}

const Config: React.FC<Props> = ({
  required,
  active,
  fieldId,
  fieldHandler,
  id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, modalOverlayHanlder] = useDisclosure(false);
  const [config, setConfig] = useState({
    required,
    active,
  });
  const [baseUrl] = useGetBaseUrl();
  const params = useParams();
  const at = getCookie("at");
  const form = useForm({
    initialValues: {
      fieldId: fieldId,
    },
    validate: {
      fieldId: (value) =>
        /^[a-zA-Z0-9_]{5,40}$/.test(value) ? null : "Invalid field id",
    },
  });
  const { showLoading, hideLoading } = useLoading();

  const defaultConfig = useMemo(() => {
    const temp: string[] = [];
    if (required) temp.push("required");
    if (active) temp.push("active");
    return temp;
  }, [active, required]);

  const handleOnChange = (values: string[]) => {
    try {
      modalOverlayHanlder.open();
      setConfig((prev) => {
        const newConfig = prev;
        Object.keys(prev).forEach((key) => {
          if (values.includes(key)) newConfig[key] = true;
          else newConfig[key] = false;
        });
        return newConfig;
      });
    } catch (error) {
      console.error(error);
    } finally {
      modalOverlayHanlder.close();
    }
  };

  const handleDeleteField = async () => {
    try {
      const res = await axios.put(
        `${baseUrl}/fields/${params.detailId}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.data.isSuccess) {
        fieldHandler.updateFields(res.data.fieldData);
        successNotification("Delete field successfully");
      } else {
        errorNotification("Fail to fetch new data");
      }
    } catch (error) {
      errorNotification("Fail to fetch new data");
      console.error(error);
    }
  };

  const handleOnClose = () => {
    form.reset();
  };

  const handleUpdateFieldId = async (values) => {
    try {
      showLoading();
      const res = await axios.put(
        `${baseUrl}/fields/fieldId`,
        {
          fieldId: values.fieldId,
          detailId: id,
          docId: params.detailId,
        },
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.data.isSuccess) {
        successNotification("New field id is saved");
        fieldHandler.updateFields(res.data.newData);
      } else {
        handleOnClose();
        errorNotification("Fail to save new field id");
      }
    } catch (error) {
      handleOnClose();
      console.error(error);
      errorNotification("Fail to save new field id");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="w-fit">
      <Modal centered opened={opened} onClose={close} title="Field controller">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Box className="switch_container mt-4">
          <Switch.Group onChange={handleOnChange} defaultValue={defaultConfig}>
            <Group py={4} className="switch_control">
              {/* <Switch label="Required" name="required" value={"required"} /> */}
              <Switch label="Active" name="active" value={"active"} />
            </Group>
          </Switch.Group>
          <Divider label="Danger zone" color="red" className="py-3" />

          <Box className="mb-4">
            <Text className="mb-2 text-sm">Update field id</Text>
            <form
              onSubmit={form.onSubmit((values) => handleUpdateFieldId(values))}
            >
              <Group>
                <TextInput {...form.getInputProps("fieldId")} />
                <ActionIcon type="submit">
                  <IconCheck />
                </ActionIcon>
              </Group>
            </form>
          </Box>

          <Button color="red" variant="light" onClick={handleDeleteField}>
            Delete this field
          </Button>
        </Box>

        <Group position="right" className="mt-8">
          <Button
            onClick={() => {
              fieldHandler.updateFieldConfig(config, id);
              close();
            }}
          >
            Apply
          </Button>
          <Button color="red" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Tooltip label="Config">
        <ActionIcon onClick={open}>
          <IconSettings2 />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

export default Config;
