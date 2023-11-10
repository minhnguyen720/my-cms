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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings2 } from "@tabler/icons-react";
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

interface Props {
  required: boolean;
  active: boolean;
  fieldId: string;
  fieldHandler: FieldHandler;
}

const Config: React.FC<Props> = ({
  required,
  active,
  fieldId,
  fieldHandler,
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

  const defaultConfig = useMemo(() => {
    const temp = [];
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
        `${baseUrl}/fields/${params.detailId}/${fieldId}`,
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
      errorNotification(error);
    }
  };

  return (
    <div className="w-fit">
      <Modal centered opened={opened} onClose={close} title="Field controller">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Box className="switch_container mt-4">
          <Switch.Group onChange={handleOnChange} defaultValue={defaultConfig}>
            <Group py={4} className="switch_control">
              <Switch label="Required" name="required" value={"required"} />
              <Switch label="Active" name="active" value={"active"} />
            </Group>
          </Switch.Group>
          <Divider label="Danger zone" color="red" className="py-3" />
          <Button color="red" variant="light" onClick={handleDeleteField}>
            Delete this field
          </Button>
        </Box>

        <Group position="right" className="mt-8">
          <Button
            onClick={() => {
              fieldHandler.updateFieldConfig(config, fieldId);
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
