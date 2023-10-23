import { Badge } from "@mantine/core";
import React from "react";

const OnlineBadge = ({ flag }) => {
  return (
    <Badge color={flag ? "green" : "red"}>
      {flag ? "Online" : "Offline"}
    </Badge>
  );
};

export default OnlineBadge;
