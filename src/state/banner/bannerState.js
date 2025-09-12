// import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";
// const { persistAtom } = recoilPersist();

// export const getBannerDetailsAtom = atom({
//     key:"bannerDetails" ,
//     default:{},
//     effects_UNSTABLE:[persistAtom]
// })

import { atomFamily } from "recoil";

export const bannerDetailsFamily = atomFamily({
  key: "bannerDetailsFamily",
  default: null, // { title, image } aayega
});

export const bannerLoadingFamily = atomFamily({
  key: "bannerLoadingFamily",
  default: false,
});
