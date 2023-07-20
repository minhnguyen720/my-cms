export const useMobileSearch = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleReset = () => {
    console.log("reset");
  };

  return { handleSearch, handleReset };
};

export const useDesktopSearch = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleReset = () => {
    console.log("reset");
  };

  return { handleSearch, handleReset };
};
