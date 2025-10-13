import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const getQuarterResult = atom({
    key: "QuarterList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getStockExchange = atom({
    key: "StockExchangeList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getInvestorContact = atom({
    key: "InvestorContactList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getBoardProfiles = atom({
    key: "BoardProfilesList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getCreditRatings = atom({
    key: "CreditRatingsList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getShareholdingPattern = atom({
    key: "ShareholdingPatternList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getCirculars = atom({
    key: "CircularsList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getShareholdersInfo = atom({
    key: "ShareholdersInfoList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getPoliciesInfo = atom({
    key: "PoliciesList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getStockExchangeDisclosure30Info = atom({
    key: "StockExchangeDisclosure30List",
    default: [],
    effects_UNSTABLE: [persistAtom],
});