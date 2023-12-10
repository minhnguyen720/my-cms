import { Paper } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

interface Props {
  fieldId: string;
  label: string | undefined;
  createdDate: string;
  updatedDate: string;
}

const FieldHeader: React.FC<Props> = ({
  fieldId,
  label,
  createdDate,
  updatedDate,
}) => {
  return (
    <Paper className="mb-2 w-max bg-[#25262B] px-9 py-4">
      <div className="flex justify-between">
        <div className="mr-5">
          <p className="mb-1">
            <span className="font-bold">Field id: </span> {fieldId}
          </p>
          <p>
            <span className="font-bold">Field name: </span> {label}
          </p>
        </div>
        <div>
          <p className="mb-1">
            <span className="font-bold">Created on: </span>
            {dayjs(createdDate).format("DD/MM/YYYY, HH:mm")}
          </p>
          <p>
            <span className="font-bold">Last updated: </span>
            {dayjs(updatedDate).format("DD/MM/YYYY, HH:mm")}
          </p>
        </div>
      </div>
    </Paper>
  );
};

export default FieldHeader;
