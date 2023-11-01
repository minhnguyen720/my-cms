import { notifications } from "@mantine/notifications";
import { IconCheck, IconBug } from "@tabler/icons-react";

export const errorNotification = (
  message: string,
  autoClose?: number,
) => {
  notifications.show({
    autoClose: autoClose ? autoClose : 2000,
    message: message,
    color: "red",
    title: "System notice",
    icon: <IconBug size={14} />
  });
};

export const successNotification = (
  message: string,
  autoClose?: number,
) => {
  notifications.show({
    autoClose: autoClose ? autoClose : 2000,
    message: message,
    color: "green",
    title: "System notice",
    icon: <IconCheck size={14} />
  });
};

export const generalNotification = (message: string, color: string) => {
  notifications.show({
    autoClose: 2000,
    message: message,
    color: color,
    title: "System notice",
  });
};
