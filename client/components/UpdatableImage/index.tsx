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
} from "@mantine/core";
import { IconMaximize, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import Config from "../Fields/Config";
import { FieldHandler } from "../Fields/hooks/useFields";

interface Props {
  src: string;
  alt: string;
  label: string;
  fieldId: string;
  fieldHandler: FieldHandler;
}

const UpdatableImage: React.FC<Props> = ({
  src,
  alt,
  label,
  fieldHandler,
  fieldId,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [viewName, setViewName] = useState<string>("normal");

  const view = {
    normal: (
      <Stack spacing={"sm"}>
        <p className="text-[0.875rem] font-medium text-[#C1C2C5]">{label}</p>
        <Group>
          <Image src={src} width={160} height={160} alt={alt} />
          <Stack>
            <FileButton onChange={setImage} accept="image/png,image/jpeg">
              {(props) => (
                <ActionIcon {...props}>
                  <IconUpload />
                </ActionIcon>
              )}
            </FileButton>
            <Config
              required={true}
              active={true}
              fieldHandler={fieldHandler}
              fieldId={fieldId}
            />
            <ActionIcon
              onClick={() => {
                setViewName("preview");
              }}
            >
              <IconMaximize />
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
  };

  return <>{view[viewName]}</>;
};

export default UpdatableImage;
