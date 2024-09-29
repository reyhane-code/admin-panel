import { create } from "zustand";
import User from "./entities/User";

export interface Auth {
  identity: User;
  tokens: Tokens
}

export interface Tokens {
  accessToken?: string,
  refreshToken?: string
}


interface AuthStore {
  auth: Auth;
  loginDialog: boolean;
  loginCallBack?: () => void;
  setIdentity: (user: User) => void;
  openLoginDialog: (callback?: () => void) => void;
  closeLoginDialog: () => void;
  setTokens: (tokens: Tokens) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    identity: {} as User,
    tokens: {
      accessToken: undefined,
      refreshToken: undefined
    }
  },
  loginDialog: false,
  loginCallBack: undefined,

  setIdentity: (user) => set((state) => ({
    ...state,
    auth: { ...state.auth, identity: user },
  })),
  openLoginDialog: (callback) => set((state) => {
    return {
      ...state,
      loginCallBack: typeof callback === "function" ? callback : undefined,
      loginDialog: true,
    };
  }),
  closeLoginDialog: () => set((state) => {
    return {
      ...state,
      loginCallBack: undefined,
      loginDialog: false,
    };
  }),
  setTokens: (tokens) => set((state) => ({
    ...state,
    auth: { ...state.auth, tokens },
  })),
}));

export default useAuthStore;
