
import { create } from 'zustand';
const useVehicleStore = create((set) => ({
    vehicles: [],
    setVehicles: (newVehicles) => set({ vehicles: newVehicles}),
    bookedvehicles: [],
    setBookedVehicles: (newVehicles) => set({ bookedvehicles: newVehicles}),
   
}));

export default useVehicleStore;