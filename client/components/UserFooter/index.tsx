import { User } from "@/interfaces/User";
import { Avatar, Box, NavLink, Menu } from "@mantine/core";
import { IconChevronRight, IconUser, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface props {
  userData: User;
  setIsMenuFocus: React.Dispatch<React.SetStateAction<boolean>>;
  handleCurrentMenu: (menu: string) => void;
}

const { Target, Dropdown, Label, Item } = Menu;

function UserFooter({ userData, setIsMenuFocus, handleCurrentMenu }: props) {
  const router = useRouter();
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
              handleCurrentMenu("Account information");
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
}

export default UserFooter;
