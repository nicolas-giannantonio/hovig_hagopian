import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type Store = StoreState & StoreActions;

type StoreState = {
  mbDetect: boolean;
  setMbDetect: (mbDetect: boolean) => void;
};

type StoreActions = {
  setMbDetect: (mbDetect: boolean) => void;
};

export const useStore = createWithEqualityFn<Store>(
  (set) => ({
    mbDetect: false,
    setMbDetect: (mbDetect: boolean) => set({ mbDetect }),
  }),
  shallow,
);
