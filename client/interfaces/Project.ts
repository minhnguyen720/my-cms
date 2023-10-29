import { ReactNode } from "react";
import { StandardSchema } from "./StandardSchema";

export interface Field {
  type: string;

  // for form query
  field_id: string;

  label?: string;

  value?: string;

  active: boolean;

  // for input component
  placeholder?: string;

  icon?: ReactNode;

  required: boolean;

  isUseEditor?: boolean;
}

export interface Document {
  _id?: string;

  id?: string;

  name: string;

  createdDate: string;

  updatedDate: string;

  // user id
  createdUser: string;

  // user id
  updatedUser: string;

  // number of field within the document
  fields: any[];

  // is this document is visible for client
  active: boolean;

  // data used for rendering purpose
  data: Field[];

  // List of user ids
  assignedUsers?: string[];

  page?: string;

  description?: string;

  parent?: string;
}

export interface Project {
  id: string;

  name: string;

  createdDate: Date;

  updatedDate: Date;

  // user id
  createdUser: string;

  // user id
  updatedUser: string;

  superAdminId: string;

  // list of page within the project
  pages: Page[];
}

export interface Page extends StandardSchema {
  _id?: string;
  superAdminId?: string;
  name?: string;
  active?: boolean;
  project?: string;
  isRemove?:boolean;
}

export interface Folder extends StandardSchema {
  _id: string;

  name: string;

  page: string;

  parent: string;

  isRemove?:boolean;
}
