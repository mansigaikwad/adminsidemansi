
import { create } from 'zustand';
const useDriverStore = create((set) => ({
    driver: [],
    setDriver: (newDriver) => set({ driver: newDriver}),
    updatedriver: [],
    setUpdateDriver: (newDriver) => set({ updatedriver: newDriver}),
   
}));

export default useDriverStore;