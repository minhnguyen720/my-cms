"use client";

import { Box, TextInput } from "@mantine/core";
import { ReactNode, RefObject, createContext, useContext, useRef } from "react";

interface props {
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: ReactNode;
}

const TextContext = createContext(null);

const Input = ({ label, placeholder, required, icon}: props) => {
  const ref = useContext(TextContext);

  return (
    <Box>
      <TextInput
        ref={ref}
        label={label}
        placeholder={placeholder && placeholder}
        withAsterisk={required}
        icon={icon && icon}
      />
    </Box>
  );
};

const Text = ({ children }: { children: any }) => {
  const ref = useRef<HTMLInputElement>(null);
  return <TextContext.Provider value={ref}>{children}</TextContext.Provider>;
};

Text.Input = Input;

export default Text;
