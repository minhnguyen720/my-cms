import { currentUserAtom } from "@/atoms";
import { useAtom } from "jotai";

const useUserData = () => {
  const [user, setUser] = useAtom(currentUserAtom);

  const getCurrentUser = () => {
    return user;
  };

  const updateUser = (value) => {
    setUser(value);
  };

  return {getCurrentUser, updateUser}
};

export default useUserData;
