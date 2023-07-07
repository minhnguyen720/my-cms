import React from "react";
import { NavLink as MantineNavLink } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface props {
  icon: JSX.Element;
  href: string;
  label: string;
}

function NavLink({ icon, href, label }: props) {
  const router = useRouter();

  return (
    <MantineNavLink
      label={label}
      icon={icon}
      rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
      onClick={() => {
        router.push(href);
      }}
    />
  );
}

export default NavLink;
