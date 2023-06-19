import { create } from 'zustand'

const useStore = create((set) => ({
    isLogged: typeof localStorage !== 'undefined' ? localStorage.getItem('isLogged') || '' : '',
    setIsLogged: (user) => {
        set(() => ({ isLogged: user }));
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('isLogged', user);
        }
    },
}));

export default useStore;