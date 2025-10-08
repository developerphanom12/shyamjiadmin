import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getQuarterResult = atom({
    key: "QuarterList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
