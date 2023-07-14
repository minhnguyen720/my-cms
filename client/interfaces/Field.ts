import { ReactNode } from "react";

export interface Field {
  type: string;

  field_id: string;

  label?: string;

  value?: string;

  // for input component
  placeholder?: string;

  icon?: ReactNode;

  required?: boolean;

  isUseEditor?: boolean;
}

export interface Document {
  id: string;

  name: string;

  createdDate: Date;

  updatedDate: Date;

  // user id
  createdUser: string;

  // user id
  updatedUser: string;

  // number of field within the document
  fields: number;

  // is this document is visible for client
  active: boolean;

  // data used for rendering purpose
  data: Field[];
}
