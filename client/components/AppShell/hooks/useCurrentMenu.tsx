import { useLocalStorage } from "@mantine/hooks";

function useCurrentMenu() {
  const CURRENT_MENU_KEY = "currentMenu";
  const [currentMenu, setCurrentMenu] = useLocalStorage({
    key: CURRENT_MENU_KEY,
    defaultValue: "Home",
  });
  const handleCurrentMenu = (menu: string) => {
    setCurrentMenu(menu);
  };

  return { currentMenu, handleCurrentMenu };
}

export default useCurrentMenu;
