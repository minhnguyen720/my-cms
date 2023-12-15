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
  Text,
  Tooltip,
} from "@mantine/core";
import { IconMaximize, IconUpload } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import Config from "../Fields/Config";
import { FieldHandler } from "../Fields/hooks/useFields";
import useLoading from "@/hooks/utilities/useLoading";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import axios from "axios";
import {
  errorNotification,
  successNotification,
} from "@/hooks/notifications/notificationPreset";
import { getCookie } from "cookies-next";
import { MESSAGES } from "@/constant";

interface Props {
  src?: string;
  alt?: string;
  label?: string;
  fieldId?: string;
  required?: boolean;
  active?: boolean;
  fieldHandler?: FieldHandler;
  docId?: string;
  id?: string;
}

const UploadMedia: React.FC<Props> = ({
  src,
  alt,
  label,
  fieldHandler,
  id,
  fieldId,
  required,
  active,
  docId,
}) => {
  const { showLoading, hideLoading } = useLoading();
  const [baseUrl] = useGetBaseUrl();
  const at = getCookie("at");
  const [path, setPath] = useState<string | undefined | null>(() => {
    if (src) return src;
    else return undefined;
  });

  const isInvalidPath = useMemo(() => {
    return path?.trim().length === 0 || path === undefined || path === null;
  }, [path]);

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

  const upload = async (file: File) => {
    try {
      showLoading();
      if (docId === undefined || id === undefined) {
        errorNotification(MESSAGES.GENERAL_MESSAGE);
        return;
      }

      let formData = new FormData();
      formData.append("bizFolder", `uploadFolder-${id}`); // must be appended first to make sure req.body is fully populated
      formData.append("fieldId", id);
      formData.append("type", "field-image");
      formData.append("docId", docId);
      formData.append("file", file);
      const res = await axios.post(`${baseUrl}/storage/store`, formData, {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      });
      if (res.data.isSuccess) {
        successNotification("Upload successfully");
        setPath(res.data.path);
      } else {
        errorNotification("Fail to upload file");
      }
    } catch (error) {
      console.error(error);
      errorNotification("Fail to upload file");
    } finally {
      hideLoading();
    }
  };

  const view = {
    normal: (
      <Stack spacing={"sm"}>
        <p className="text-[0.875rem] font-medium text-[#C1C2C5]">{label}</p>
        <Group>
          {isInvalidPath ? (
            <Text>No image found</Text>
          ) : (
            <Image src={path} width={160} height={160} alt={alt} />
          )}
          <Stack>
            <FileButton
              onChange={upload}
              accept="image/png,image/jpeg,image/svg,image/svg+xml,video/mp4,video/x-m4v,video/*"
            >
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
                disabled={isInvalidPath}
                onClick={() => {
                  setViewName("preview");
                }}
              >
                <IconMaximize />
              </ActionIcon>
            </Tooltip>
          </Stack>
        </Group>
      </Stack>
    ),
    preview: (
      <div>
        <Overlay color="#000" opacity={0.85} blur={10}>
          <Flex justify={"flex-end"} className="p-2">
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
              width={300}
              height={"auto"}
              src={path}
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
            id={id}
          />
        </div>
      </div>
    ),
  };

  return <>{view[viewName]}</>;
};

export default UploadMedia;
