import { create } from "zustand";

export const useStore = create((set) => ({
    toggleButton: false,
    setToggleButton: (toggle) => set((state) => ({ toggleButton: !state.toggleButton }))
}))
