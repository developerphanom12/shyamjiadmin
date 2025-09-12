import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getContactDetailsAtom = atom({
    key:"ContactDetails" ,
    default:{},
    effects_UNSTABLE:[persistAtom]
})