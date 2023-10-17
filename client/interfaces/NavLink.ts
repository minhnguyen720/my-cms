export interface Navlink {
  icon?: JSX.Element | any;
  label: string;
  href?: string;
  children?: Navlink[];
  createdDate?: string;
  updatedDate?: string;
  name?: string;
  id?: string;
  active?:boolean;
}
