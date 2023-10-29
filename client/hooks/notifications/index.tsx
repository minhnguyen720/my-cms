import { notifications } from "@mantine/notifications";
import { IconCheck, IconBug } from "@tabler/icons-react";

const useNotificationPreset = () => {
  const loadingNotification = (
    id: string,
    finalMessage: string,
    callback?: (any?: any) => any,
    errorHandler?: (any?: any) => any,
    autoClose?: number,
  ) => {
    try {
      notifications.show({
        id: id,
        title: "System notice",
        message: "Processing...",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
      if (callback) {
        try {
          callback();
        } catch (error) {
          if (errorHandler) errorHandler();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      notifications.update({
        id: id,
        autoClose: autoClose ? autoClose : 2000,
        message: finalMessage,
        icon: <IconCheck size={14} />,
      });
    }
  };

  const errorNotification = (
    finalMessage: string,
    autoClose?: number,
    id?: string,
  ) => {
    notifications.show({
      id: id,
      autoClose: autoClose ? autoClose : 2000,
      message: finalMessage,
      style: { backgroundColor: "red" },
      sx: { backgroundColor: "red" },
      icon: <IconBug size={14} />,
    });
  };

  return {
    loadingNotification,
    errorNotification,
  };
};

export default useNotificationPreset;
