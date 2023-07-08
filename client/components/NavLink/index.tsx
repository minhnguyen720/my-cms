import React from "react";
import { NavLink as MantineNavLink } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface props {
  icon?: JSX.Element;
  href: string;
  label: string;
  children?: any;
  active?: boolean;
  handleActive?: () => void;
}

function NavLink({ active, icon, href, label, children, handleActive }: props) {
  const router = useRouter();

  return (
    <MantineNavLink
      active={active}
      label={label}
      icon={icon}
      rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      onClick={() => {
        if (handleActive) handleActive();
        router.push(href);
      }}
    >
      {children}
    </MantineNavLink>
  );
}

export default NavLink;
