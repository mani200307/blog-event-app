import { create } from "zustand";

const useStore = create((set) => ({
    toggleButton: false,
    setToggleButton: (toggle) => set((state) => ({ toggleButton: !state.toggleButton }))
}))

export default useStore