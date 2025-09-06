import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getAllProducts = atom({
    key: "productsList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getProductDetailsAtom = atom({
    key:"ProductDetails" ,
    default:{},
    effects_UNSTABLE:[persistAtom]
})