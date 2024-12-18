
import { create } from 'zustand';
const useBookingStore = create((set) => ({
    bookings: [],
    setBookings: (newBookings) => set({ bookings: newBookings }),
    updatebookings: [],
    setUpdateBookings: (newBookings) => set({ updatebookings: newBookings }),
   
}));

export default useBookingStore;