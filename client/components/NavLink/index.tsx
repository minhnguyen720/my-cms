import { NavLink as MantineNavLink } from "@mantine/core";
import { useRouter } from "next/navigation";

interface Props {
  icon?: JSX.Element;
  href: string;
  label: string;
  children?: any;
  setOpened: any;
}

const NavLink: React.FC<Props> = ({
  icon,
  href,
  label,
  children,
  setOpened,
}) => {
  const router = useRouter();

  return (
    <MantineNavLink
      label={label}
      icon={icon}
      onClick={() => {
        router.push(href);
        setOpened(false);
      }}
    >
      {children}
    </MantineNavLink>
  );
};

export default NavLink;
