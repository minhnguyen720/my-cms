import { errorNotification } from "@/hooks/notifications/notificationPreset";
import useGetBaseUrl from "@/hooks/utilities/getUrl";
import { User } from "@/interfaces/User";
import { Avatar, Box, NavLink, Menu } from "@mantine/core";
import { IconChevronRight, IconUser, IconLogout } from "@tabler/icons-react";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
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
  const [baseUrl] = useGetBaseUrl();

  const handleSignout = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/auth/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${at}`,
          },
        },
      );
      if (res.status === 200) {
        deleteCookie("at");
        setIsMenuFocus(false);
        router.push("/authenticate");
      } else {
        errorNotification("Something went wrong. Please try again");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <Item icon={<IconLogout />} onClick={handleSignout}>
            Sign out
          </Item>
        </Dropdown>
      </Menu>
    </Box>
  );
};

export default UserFooter;
