import { User } from "@/interfaces/User";
import { Avatar, Box, NavLink, Menu } from "@mantine/core";
import { IconChevronRight, IconUser, IconLogout } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Props {
  userData: User;
  setIsMenuFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const { Target, Dropdown, Label, Item } = Menu;

const UserFooter: React.FC<Props> = ({ userData, setIsMenuFocus }) => {
  const router = useRouter();
  const at = getCookie("at");
  const ACCOUNT_URL = `/user/${userData.id}`;
  const SIGNOUT_URL = `/signout`;

  return (
    <Box py={"sm"}>
      <Menu width={200} position="right-end">
        <Target>
          <NavLink
            icon={
              <Avatar
                src={userData.avatar}
                alt="user footer avatar"
                radius={"xl"}
              />
            }
            label={userData.name}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
          />
        </Target>

        <Dropdown>
          <Label>Account options</Label>
          <Item
            icon={<IconUser />}
            onClick={() => {
              setIsMenuFocus(false);
              router.push(ACCOUNT_URL);
            }}
          >
            Account
          </Item>
          <Item
            icon={<IconLogout />}
            onClick={() => {
              setIsMenuFocus(false);
              console.log("Sign out");
            }}
          >
            Sign out
          </Item>
        </Dropdown>
      </Menu>
    </Box>
  );
};

export default UserFooter;
