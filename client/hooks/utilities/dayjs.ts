import { DATE_FORMAT_WITH_HOUR } from "@/constant";
import dayjs from "dayjs";

export const getFormattedTime = (timeValue?: string, timeFormat?: string) => {
  try {
    let validTimeFormat = "";
    if (timeFormat === undefined) validTimeFormat = DATE_FORMAT_WITH_HOUR;
    else if (timeFormat.trim().length === 0)
      validTimeFormat = DATE_FORMAT_WITH_HOUR;

    return dayjs(timeValue).format(validTimeFormat);
  } catch (error) {
    console.error(error);
  }
};
