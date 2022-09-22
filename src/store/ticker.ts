import create from "zustand";
import { persist } from "zustand/middleware";

export const TickerStorage = create(persist(
  (set, get) => ({
    current: 1,
    setCurrent: (value) => set({ current: value })
  }),
  {
    name: "ticker-storage",
    getStorage: () => sessionStorage
  }
));
