/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from 'react';
import useBookingStore from './states/booking_store';
import useVehicleStore from "./states/vehicle_store";
import useDriverStore from "./states/driver_store";
import axios from 'axios';
import { CircularProgress  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MessageComponent = ({ message }) => {
  const navigate = useNavigate();
  //read all 3 store objects
  const rows = useBookingStore((state) => state.bookings);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const drivers = useDriverStore((state) => state.driver);
  const [loading, setLoading] = useState(true);
  // console.log("Bookings.....")
  // console.log(rows)
  // console.log("Vehicles.....")
  // console.log(vehicles)
  // console.log("Drivers.....")
  // console.log(drivers)
  const addRecord = async (data) => {
    try {
      const response = await axios.post(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/bookedvehicle`, data, {
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
  const bookingsids=rows.map((r)=>r.booking_Id)
  console.log(bookingsids)

  const combinedObject = {
    bookings:rows,
    vehicles: vehicles,
    drivers: drivers
  };
  useEffect(()=>{
    addRecord(combinedObject);
  },[])
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

export default MessageComponent;