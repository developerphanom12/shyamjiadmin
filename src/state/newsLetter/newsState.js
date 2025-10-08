import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getnewsLetterListAtom = atom({
    key:"newsLetterList" ,
    default:[],
    effects_UNSTABLE:[persistAtom]
})