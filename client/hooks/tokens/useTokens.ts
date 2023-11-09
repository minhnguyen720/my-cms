import { atom, useAtom } from "jotai";

const refreshTokenAtom = atom<string | null>("null");
const accessTokenAtom = atom<string | null>(null);
const useTokens = () => {
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const assignRt = (rt: string) => {
    setRefreshToken(rt);
  };

  const assignAt = (at: string) => {
    setAccessToken(at);
  };

  const getRt = () => {
    return refreshToken;
  };

  const getAt = () => {
    return accessToken;
  };

  return {
    assignAt,
    assignRt,
    getRt,
    getAt,
  };
};

export default useTokens;
