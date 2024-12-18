/* eslint-disable no-unused-vars */
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import useBookingStore from './states/booking_store';
import SelectedBookingGrid from './show_bookings'
import ShowVehicleCard from './show_vehicle'
import ShowDriverCard from './show_driver'
import { blue } from '@mui/material/colors';
import UpdatedBookingGrid from './UpdatedBookingGrid';
import ShowUpdatedVehicleCard from './ShowUpdatedVehicleCard';
import ShowUpdatedDriverCard from './ShowUpdatedDriverCard';
export default function BookingUpdateReviewSummery() {
  // const bookings = useBookingStore((state) => state.bookings);

  console.log("In Summery screen!!")
  // console.log(bookings)
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span style={{color:'blue',fontWeight:'bold'}}> Bookings</span> 
        </AccordionSummary>
        <AccordionDetails>
          <UpdatedBookingGrid></UpdatedBookingGrid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         <span style={{color:'blue',fontWeight:'bold'}}> Vehicle Details</span>
        </AccordionSummary>
        <AccordionDetails>
          <ShowUpdatedVehicleCard></ShowUpdatedVehicleCard>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <span style={{color:'blue',fontWeight:'bold'}}>Driver Details</span>
        </AccordionSummary>
        <AccordionDetails>
          <ShowUpdatedDriverCard></ShowUpdatedDriverCard>
        </AccordionDetails>
        <AccordionActions>
          {/* <Button>Cancel</Button>
          <Button>Agree</Button> */}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
