/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import AssignGridBookings from './Assign_Vehicle';
import SelectVehicleGrid from './select_vehicle'
import SelectDriverGrid from './select_driver'
import BookingReviewSummery from './booking_summery'
const steps = ['Select Bookings', 'Assign Vehicle', 'Assign Driver', 'Review your order', "Booking Complete"];
import MessageComponent from './show_message'
import { useNavigate } from 'react-router-dom';
import car2 from '../assets/carimage2.jpg'
import useBookingStore from './states/booking_store';
import useVehicleStore from "./states/vehicle_store";
import useDriverStore from "./states/driver_store";
 

function Home() {
  return <div className={'image-container'} ><img src={car2} alt={'Car Image Here'} /></div>;
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AssignGridBookings></AssignGridBookings>;
    case 1:
      return <SelectVehicleGrid></SelectVehicleGrid>;
    case 2:
      return <SelectDriverGrid></SelectDriverGrid>;
    case 3:
      return <BookingReviewSummery></BookingReviewSummery>;
    case 4:
      return <MessageComponent message="Booking Complete"></MessageComponent>;

  }
}

export default function CustomizedSteppers() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isCompleted, setIsCompleted] = useState(false)
  const rows = useBookingStore((state) => state.bookings);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const drivers = useDriverStore((state) => state.driver);
  const handleNext = (e) => {
    const label = e.target.innerText
    console.log(label)
    if (label == 'FINISH') {
      console.log('In If....')
      setIsCompleted(true)
      navigate("/")
      navigate(0)

    }
    if (activeStep == 0 && rows.length==0) {
      alert("Please Select atleast one booking!!!")
      return;
    }else if (activeStep == 1 && vehicles.length==0) {
      alert("Please Select One Vehicle!!!")
      return;
    }else if (activeStep == 2 && drivers.length==0) {
      alert("Please Select  One Driver!!!")
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <br />
     
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        {isCompleted ? "" : <Button
          // color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          variant="contained" >
          Back
        </Button>}
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext} variant="contained">
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
      <Box sx={{ mt: 2, mb: 1 }}>
        <Typography>{getStepContent(activeStep)}</Typography>
      </Box>
    </Box>
  );
}
