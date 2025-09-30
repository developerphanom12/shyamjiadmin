import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getAllDistibutorAtom = atom({
    key: "DistributorList",
    default: [],
    effects_UNSTABLE:[persistAtom],
})