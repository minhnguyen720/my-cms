export interface iNavlink {
  icon?: JSX.Element | any;
  label: string;
  href?: string;
  children?: iNavlink[];
}
