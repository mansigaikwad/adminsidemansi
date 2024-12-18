import create from 'zustand';
import axios from 'axios';
const useVehicleStore = create((set) => ({
    rows: [],
    loading: false,
    fetchRows: async () => {
        set({ loading: true });
        // const response = await fetch('https://api.example.com/data');
        // const data = await response.json();
        try {
            const response = await axios.get('https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicles');
            //   setVehicles(response.data);

            console.log(response.data)
            const dataWithIds = response.data.map((item, index) => ({
                ...item,
                id: index + 1, // Start id from 1
            }));
            console.log(dataWithIds)

            set({ rows: dataWithIds, loading: false });
            //    setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }


    },
}));

export default useVehicleStore;
