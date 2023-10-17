export interface iNavlink {
  icon?: JSX.Element | any;
  label: string;
  href?: string;
  children?: iNavlink[];
  createdDate?: string;
  updatedDate?: string;
  name?: string;
  id?: string;
}
