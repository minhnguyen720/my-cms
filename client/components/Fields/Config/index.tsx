import {
  Modal,
  Group,
  Button,
  ActionIcon,
  Box,
  Switch,
  LoadingOverlay,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings2 } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";
import { FieldHandler } from "../hooks/useFields";

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

  return (
    <div className="w-fit">
      <Modal opened={opened} onClose={close} title="Field controller">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Box className="switch_container mt-4">
          <Switch.Group onChange={handleOnChange} defaultValue={defaultConfig}>
            <Group py={4} className="switch_control">
              <Switch label="Required" name="required" value={"required"} />
              <Switch label="Active" name="active" value={"active"} />
            </Group>
          </Switch.Group>
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
