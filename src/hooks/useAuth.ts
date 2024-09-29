import { useMemo } from "react";
import useAuthStore from "../auth.store";
import User from "../entities/User";
import { HttpRequest } from "../helpers/http-request-class.helper";
import { GenericAbortSignal } from "axios";

export default function useAuth() {
  const setTokensToStore = useAuthStore((s) => s.setTokens);
  const storedTokens = useAuthStore((s) => s.auth.tokens);
  const isAuthenticated = useMemo(
    () => HttpRequest.getTokens ?? false,
    [storedTokens]
  );

  const setIdentity = useAuthStore((s) => s.setIdentity);
  const openLoginDialog = useAuthStore((s) => s.openLoginDialog);

  const readAndSetTokensToStore = () => {
    const tokens = HttpRequest.getTokens;
    if (!tokens) return false;

    HttpRequest.setTokens = {
      data: tokens,
      key: "tokens",
    };
  };
  const setUserIdentityIfLoggedIn = async (signal?: GenericAbortSignal) => {
    if (!isAuthenticated) return;
    try {
      const response = await HttpRequest.get<User>("/v1/user/admin/identity", {
        signal,
      });
      if (response?.data) {
        setIdentity(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data");
    }
  };
  const initAuth = async (signal?: GenericAbortSignal) => {
    await setUserIdentityIfLoggedIn(signal);
    readAndSetTokensToStore();
  };
  const loginIfNeeded = (callback: () => void) => {
    if (isAuthenticated) {
      return callback();
    } else {
      openLoginDialog(callback);
    }
  };
  const setTokens = (accessToken: string, refreshToken: string) => {
    setTokensToStore({ accessToken, refreshToken });
    HttpRequest.setTokens = {
      data: { accessToken, refreshToken },
      key: "tokens",
    };
  };

  const logout = () => {
    return HttpRequest.deleteTokens();
  };
  return {
    isAuthenticated,
    initAuth,
    loginIfNeeded,
    setTokens,
    logout,
  };
}
