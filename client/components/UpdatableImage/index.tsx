import {
  Image,
  FileButton,
  Group,
  Stack,
  ActionIcon,
  CloseButton,
  Flex,
  Overlay,
  Center,
  rem,
  Text,
  Tooltip,
} from "@mantine/core";
import { Icon360, IconMaximize, IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Config from "../Fields/Config";
import { FieldHandler } from "../Fields/hooks/useFields";

interface Props {
  src: string;
  alt: string;
  label: string;
  fieldId: string;
  required: boolean;
  active: boolean;
  fieldHandler: FieldHandler;
}

const UpdatableImage: React.FC<Props> = ({
  src,
  alt,
  label,
  fieldHandler,
  fieldId,
  required,
  active,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [viewName, setViewName] = useState<string>(() => {
    if (active) return "normal";
    else return "deactive";
  });

  useEffect(() => {
    setViewName(() => {
      if (active) return "normal";
      else return "deactive";
    });
  }, [active]);

  const upload = () => {
    console.log(image);
  };

  const view = {
    normal: (
      <Stack spacing={"sm"}>
        <p className="text-[0.875rem] font-medium text-[#C1C2C5]">{label}</p>
        <Group>
          <Image src={src} width={160} height={160} alt={alt} />
          <Stack>
            <FileButton onChange={setImage} accept="image/png,image/jpeg">
              {(props) => (
                <Tooltip label="Upload">
                  <ActionIcon {...props}>
                    <IconUpload />
                  </ActionIcon>
                </Tooltip>
              )}
            </FileButton>
            <Config
              required={required}
              active={active}
              fieldHandler={fieldHandler}
              fieldId={fieldId}
            />
            <Tooltip label="Preview">
              <ActionIcon
                onClick={() => {
                  setViewName("preview");
                }}
              >
                <IconMaximize />
              </ActionIcon>
            </Tooltip>
            <ActionIcon onClick={upload}>
              <Icon360 />
            </ActionIcon>
          </Stack>
        </Group>
      </Stack>
    ),
    preview: (
      <div>
        <Overlay color="#000" opacity={0.85} blur={10}>
          <Flex justify={"flex-end"} p={16}>
            <CloseButton
              size={24}
              className="opacity-70 transition-opacity duration-150 hover:opacity-100"
              onClick={() => {
                setViewName("normal");
              }}
            />
          </Flex>
          <Center>
            <Image
              fit="contain"
              width={rem("300px")}
              height={"auto"}
              src={src}
              alt={alt}
            />
          </Center>
        </Overlay>
      </div>
    ),
    deactive: (
      <div className="flex">
        <div>
          <label className="inline-block break-words text-[0.875rem] font-[500] text-[#C1C2C5]">
            {label}
          </label>
          <Text>This image field is deactive</Text>
        </div>
        <div className="ml-4 flex items-end">
          <Config
            required={required}
            active={active}
            fieldHandler={fieldHandler}
            fieldId={fieldId}
          />
        </div>
      </div>
    ),
  };

  return <>{view[viewName]}</>;
};

export default UpdatableImage;
