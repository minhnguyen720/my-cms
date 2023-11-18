"use client";

import {
  Avatar,
  Flex,
  Box,
  AspectRatio,
  FileButton,
  Overlay,
} from "@mantine/core";
import dayjs from "dayjs";
import TextFieldDisplay from "./components/TextFieldDisplay";
import { IconEdit } from "@tabler/icons-react";
import {
  successNotification,
  errorNotification,
} from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import useLoading from "@/hooks/utilities/useLoading";
import { useHover } from "@mantine/hooks";
import axios from "axios";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/components/Navbar";

interface Props {}

const ViewUserDetail: React.FC<Props> = () => {
  const user = useAtomValue(userAtom);
  const displayData = [
    {
      label: "Name",
      text: typeof user !== "boolean" ? user.name : "",
    },
    {
      label: "Username",
      text: typeof user !== "boolean" ? user.username : "",
    },
    {
      label: "Account created date",
      text:
        typeof user !== "boolean"
          ? dayjs(user.createdDate).format("DD/MM/YYYY, hh:mm").toString()
          : "",
    },
    {
      label: "Account last update",
      text:
        typeof user !== "boolean"
          ? dayjs(user.updatedDate).format("DD/MM/YYYY, hh:mm").toString()
          : "",
    },
    {
      label: "Email",
      text: typeof user !== "boolean" ? user.email : "",
    },
  ];
  const { hovered, ref } = useHover();
  const [baseUrl] = useGetBaseUrl();
  const { showLoading, hideLoading } = useLoading();
  const [path, setPath] = useState(
    typeof user !== "boolean" && user.avatar?.length > 0 ? user.avatar : "",
  );
  const at = getCookie("at");

  const upload = async (file: File) => {
    try {
      if (typeof user === "boolean") return;
      showLoading();
      if (at === null || at === undefined) {
        redirect("/application/dashboard");
      }

      let formData = new FormData();
      formData.append("bizFolder", `users/${user.id}`); // must be appended first to make sure req.body is fully populated
      formData.append("userId", user.id);
      formData.append("type", "avatar");
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

  return (
    <Box>
      <AspectRatio
        ratio={1 / 1}
        maw={90}
        sx={{ width: "content-fit" }}
        ref={ref}
      >
        <Avatar src={path} alt="user avatar" size={"lg"} />
        {hovered && (
          <FileButton onChange={upload} accept="image/png,image/jpeg">
            {(props) => (
              <Overlay
                {...props}
                center
                color="#000"
                opacity={0.85}
                className="w-full rounded"
              >
                <IconEdit />
              </Overlay>
            )}
          </FileButton>
        )}
      </AspectRatio>
      <Flex
        wrap={"wrap"}
        justify={"space-between"}
        direction={"row"}
        mt={"1rem"}
        maw={"90"}
      >
        {displayData.map((item, index) => {
          return (
            <TextFieldDisplay label={item.label} text={item.text} key={index} />
          );
        })}
      </Flex>
    </Box>
  );
};

export default ViewUserDetail;
