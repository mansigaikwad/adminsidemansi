/* eslint-disable no-unused-vars */
import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import { useState, useEffect } from 'react';
import axios from 'axios';
import useVehicleStore from "./states/vehicle_store";
import CircularProgress from '@mui/material/CircularProgress';
import useBookingStore from './states/booking_store';
import { format } from 'date-fns';
const initialRows = [
  { id: 1, vehicle_Name: '', vehicle_Id: "", capacity: 0, status: '', vehicle_Type: '' },

];
let radioChecked = [initialRows[0].id];
// const columns = [
//   {
//     field: "radiobutton",
//     headerName: "",
//     width: 100,
//     sortable: false,
//     renderCell: (params) => (
//       <Radio checked={radioChecked[0] === params.id} value={params.id} />
//     )
//   },
//   {
//     field: "id",
//     headerName: "ID"
//   },
//   {
//     field: "firstName",
//     headerName: "First Name",
//     width: 150
//   },
//   {
//     field: "lastName",
//     headerName: "Last Name",
//     width: 150
//   }
// ];

const columns = [
  {
    field: "radiobutton",
    headerName: "",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Radio checked={radioChecked[0] === params.id} value={params.id} />
    )
  },
  { field: 'vehicle_Name', headerName: 'VehicleName', width: 180, editable: true, headerClassName: 'header-row' },
  {
    field: 'vehicle_Id',
    headerName: 'Vehicle Number',
    width: 180,
    editable: false,
    headerClassName: 'header-row'

  },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 220,
  //   editable: false,
  //   type: 'singleSelect',
  //   valueOptions: ['Avaliable', 'On Trip', 'Maintanance'],
  //   headerClassName: 'header-row'
  // },
  {
    field: 'capacity',
    headerName: 'Capacity',
    type: 'number',
    width: 80,
    align: 'left',
    headerAlign: 'left',
    editable: false,
    headerClassName: 'header-row'
  },
  {
    field: 'vehicle_Type',
    headerName: 'Vehicle Type',
    width: 180,
    editable: false,
    type: 'singleSelect',
    headerClassName: 'header-row',
    valueOptions: ['Sedans', 'SUV', 'Minivans', 'Van'],
  },

];

export default function SelectVehicleGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [isLoading, setIsLoading] = useState(true)
  const [selectionModel, setSelectionModel] = React.useState(radioChecked);
  // const [selectionModel, setSelectionModel] = React.useState([]);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const bookingrows = useBookingStore((state) => state.bookings);
  let arr = [...vehicles]
  const setVehicles = useVehicleStore((state) => state.setVehicles);
  radioChecked = selectionModel;

  const selectedRow = rows.filter((item) => {
    return item.id === selectionModel[0];
  });

  console.log("Out Side of useEffect")
  console.log(selectedRow)
  useEffect(() => {
    console.log("Inside Side of useEffect")
    setVehicles(selectedRow)
  }, [selectionModel])
  console.log("=================")

  useEffect(() => {
    fetchVehicles();
    setVehicles(arr)
  }, []);
  // console.log(selectedRow)

  const fetchVehicles = async () => {
    try {
    //  const response = await axios.get('https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicles');
      //   setVehicles(response.data);
      console.log("In fetch vehicles...")
      console.log(bookingrows)
      let startdate=bookingrows[0].start_Date;
      let enddate=bookingrows[0].end_Date;
     
      startdate=format(new Date(startdate.split('T')[0]), 'yyyy-MM-dd');
      enddate=format(new Date( enddate.split('T')[0]),'yyyy-MM-dd');
      console.log(startdate)
      console.log(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicles/available/${startdate}/${enddate}`)
      const response = await axios.get(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicles/available/${startdate}/${enddate}`);
      console.log(startdate)
      console.log(response.data)
      const dataWithIds = response.data.map((item, index) => ({
        ...item,
        id: index + 1, // Start id from 1
      }));
      console.log(dataWithIds)
      setRows(dataWithIds)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="App">


      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        density="compact"
        selectionModel={selectionModel}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);

        }}
      />
      <div style={{ marginTop: "40px" }}>
        {/* You have selected: {selectedRow[0].vehicle_Id} {selectedRow[0].capacity} */}
      </div>
    </div>
  );
}
