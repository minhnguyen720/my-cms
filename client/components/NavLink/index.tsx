import { NavLink as MantineNavLink } from "@mantine/core";
import { useRouter } from "next/navigation";

interface Props {
  icon?: JSX.Element;
  href: string;
  label: string;
  children?: any;
  active?: boolean;
  handleActive?: () => void;
}

const NavLink: React.FC<Props> = ({
  active,
  icon,
  href,
  label,
  children,
  handleActive,
}) => {
  const router = useRouter();

  return (
    <MantineNavLink
      active={active}
      label={label}
      icon={icon}
      onClick={() => {
        if (handleActive) handleActive();
        router.push(href);
      }}
    >
      {children}
    </MantineNavLink>
  );
};

export default NavLink;
