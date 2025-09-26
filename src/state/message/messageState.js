import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getAllMessagesAtom = atom({
    key: "messagesList",
    default: [],
    effects_UNSTABLE:[persistAtom],
})