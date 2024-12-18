/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import useBookingStore from './states/booking_store';
import useVehicleStore from "./states/vehicle_store";
import useDriverStore from "./states/driver_store";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UpdatedMessageComponent = ({ message }) => {
    const navigate = useNavigate();
    //read all 3 store objects
    const rows = useBookingStore((state) => state.updatebookings);
    const vehicles = useVehicleStore((state) => state.bookedvehicles);
    const drivers = useDriverStore((state) => state.updatedriver);
    const [loading, setLoading] = useState(true);
    // console.log("Bookings.....")
    // console.log(rows)
    // console.log("Vehicles.....")
    // console.log(vehicles)
    // console.log("Drivers.....")
    // console.log(drivers)
    const addRecord = async (data) => {
        try {
            const response = await axios.put(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/bookedvehicle/update`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Record added:', response.data);
            setLoading(false)

        } catch (error) {
            console.error('Error adding record:', error);

        }
    };
    const bookingsids = rows.map((r) => r.booking_Id)
    console.log(bookingsids)
    if (vehicles.length != 0) {
        rows[0].vehicle_Id = vehicles[0].vehicle_Id
    }
    if (drivers.length != 0) {
        rows[0].driver_Id = drivers[0].driver_Id
    }

    const combinedObject = { ...rows[0] };
    useEffect(() => {
        console.log("Befoe....")
        console.log(combinedObject)
        console.log("After....")
        addRecord(combinedObject);

    }, [])
    // Convert the combined object to JSON
    const jsonString = JSON.stringify(combinedObject, null, 2);
    console.log("Json object.....")
    console.log(jsonString)
    return (
        <div>
            <p> {loading ? <CircularProgress size={24} /> : 'Booking is Complete'}</p>
        </div>
    );
};

export default UpdatedMessageComponent;