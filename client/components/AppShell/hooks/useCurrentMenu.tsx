import { useLocalStorage } from "@mantine/hooks";

function useCurrentMenu() {
  const [currentMenu, setCurrentMenu] = useLocalStorage({
    key: "currentMenu",
    defaultValue: 0,
  });
  const handleCurrentMenu = (menuIndex: number) => {
    setCurrentMenu(menuIndex);
  };

  return { currentMenu, handleCurrentMenu };
}

export default useCurrentMenu;
