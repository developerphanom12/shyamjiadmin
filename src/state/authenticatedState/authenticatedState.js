import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const adminAuthState = atom({
  key: "adminAuthState",
  default: {
    isAuthenticated: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const adminProfileState = atom({
  key: "adminProfileState",
  default: {
    firstName: "",
    lastName: "",
  },
});
