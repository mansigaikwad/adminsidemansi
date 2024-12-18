/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useVehicleStore from "./states/vehicle_store";
import Grid from '@mui/material/Grid2';
import { DirectionsCar, ConfirmationNumber, LocalShipping, Category } from '@mui/icons-material';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function ShowVehicleCard() {
  console.log("Selected  vehicle is:")
  const vehicles = useVehicleStore((state) => state.vehicles);
  console.log("Selected vehicle is in ShowCard:")
  console.log(vehicles)
  return (
    <Card sx={{ Width: '100%', border: '1px solid #000' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="div">
              <DirectionsCar sx={{ verticalAlign: 'middle', mr: 1 }} />
              Vehicle Name: <b>{vehicles[0].vehicle_Name}</b>
            </Typography>
          </Grid>
       
          <Grid item xs={12}>
            <Typography component="div">
              <ConfirmationNumber sx={{ verticalAlign: 'middle', mr: 1, color: 'blue' }} />
              Vehicle Number: <b>{vehicles[0].vehicle_Id}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div">
              <LocalShipping sx={{ verticalAlign: 'middle', mr: 1, color: 'green' }} />
              Vehicle Capacity: <b>{vehicles[0].capacity}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div">
              <Category sx={{ verticalAlign: 'middle', mr: 1, color: 'purple' }} />
              Vehicle Type: <b>{vehicles[0].vehicle_Type}</b>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
