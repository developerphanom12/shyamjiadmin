import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getAllBlogs = atom({
    key: "blogsList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getBlogDetailsAtom = atom({
    key:"BlogDetails" ,
    default:{},
    effects_UNSTABLE:[persistAtom]
})