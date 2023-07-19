import { useLocalStorage } from "@mantine/hooks";

function useCurrentMenu() {
  const [currentMenu, setCurrentMenu] = useLocalStorage({
    key: "currentMenu",
    defaultValue: 0,
  });
  const handleCurrentMenu = (menuIndex: number) => {
    setCurrentMenu(menuIndex);
  };

  const [focus, setFocus] = useLocalStorage({
    key: "focusChildrenMenu",
    defaultValue: false,
  });
  const toggleFocusMenu = () => {
    setFocus(!focus);
  };

  return { currentMenu, handleCurrentMenu, focus, toggleFocusMenu };
}

export default useCurrentMenu;
