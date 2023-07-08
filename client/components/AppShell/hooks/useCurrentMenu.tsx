import { useState, useEffect } from "react";

function useCurrentMenu() {
  const CURRENT_MENU_KEY = "currentMenu";
  const [currentMenu, setCurrentMenu] = useState<string>("Home");
  const handleCurrentMenu = (menu: string) => {
    localStorage.setItem(CURRENT_MENU_KEY, menu);
    setCurrentMenu(menu);
  };
  useEffect(() => {
    const currentActiveMenu = localStorage.getItem(CURRENT_MENU_KEY);
    if (currentActiveMenu !== null) setCurrentMenu(currentActiveMenu);
  }, []);

  return { currentMenu, handleCurrentMenu };
}

export default useCurrentMenu;
