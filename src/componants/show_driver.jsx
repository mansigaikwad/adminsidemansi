/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useDriverStore from "./states/driver_store";
import Grid from '@mui/material/Grid2';
import { Person, Phone, Home } from '@mui/icons-material';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function ShowDriverCard() {
  console.log("Selected  Driver is:")
  const driver = useDriverStore((state) => state.driver);
  console.log("Selected Driver is in ShowCard:")
  console.log(driver)
  return (
    <Card sx={{ Width: '100%', border: '1px solid #000' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ verticalAlign: 'middle', mr: 1, color: 'blue' }} />
              Driver Name : <b> {driver[0].driver_Name}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ verticalAlign: 'middle', mr: 1, color: 'green' }} />
              Mobile Number : <b> {driver[0].driver_Mobile}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <Home sx={{ verticalAlign: 'middle', mr: 1, color: 'purple' }} />
              Address : <b> {driver[0].driver_Address}</b>
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
