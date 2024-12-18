/* eslint-disable no-unused-vars */
import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import { useState, useEffect } from 'react';
import axios from 'axios';
import useDriverStore from "./states/driver_store";
import useBookingStore from './states/booking_store';
import { format } from 'date-fns';
const initialRows = [
  { id: 1, driver_Name: '', driver_Address: "", driver_Mobile: "", status: '' },
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
  { field: 'driver_Name', headerName: 'DriverName', width: 180, editable: true, headerClassName: 'header-row' },
  {
    field: 'driver_Address',
    headerName: 'Address',
    width: 180,
    editable: true,
    headerClassName: 'header-row'
  },
  // {
  //   field: 'availability',
  //   headerName: 'Status',
  //   width: 80,
  //   editable: true,
  //   type: 'singleSelect',
  //   valueOptions: ['Avaliable', 'Off Duty', 'On Trip'],
  //   headerClassName: 'header-row'
  // },
  {
    field: 'driver_Mobile',
    headerName: 'Mobile',
    // type: 'number',
    width: 220,
    align: 'left',
    headerAlign: 'left',
    editable: true,
    headerClassName: 'header-row'
  },
  // {
  //   field: 'vehicle_Id',
  //   headerName: 'Vehicle Number',
  //   width: 180,
  //   editable: true,
  //   headerClassName: 'header-row'
  // },
];

export default function SelectUpdateDriverGrid() {
  const [rows, setRows] = React.useState([]);
  // const [selectionModel, setSelectionModel] = React.useState(radioChecked);
  const [selectionModel, setSelectionModel] = React.useState(-1);
  const driver = useDriverStore((state) => state.updatedriver);
  const bookingrows = useBookingStore((state) => state.updatebookings);
  let arr = [...driver]
  const setDriver = useDriverStore((state) => state.setUpdateDriver);
  radioChecked = selectionModel;


  const selectedRow = rows.filter((item) => {
    return item.id === selectionModel[0];
  });
  // setDrivers(selectedRow)

  useEffect(() => {
    setDriver(selectedRow)
    console.log("Driver is");
    console.log(selectedRow);
  }, [selectionModel]);

  useEffect(() => {
    fetchVehicles();
    setDriver(arr)
  }, []);

  const fetchVehicles = async () => {
    try {
      console.log(bookingrows)
      let startdate = bookingrows[0].start_Date;
      let enddate = bookingrows[0].end_Date;

      startdate = format(new Date(startdate.split('T')[0]), 'yyyy-MM-dd');
      enddate = format(new Date(enddate.split('T')[0]), 'yyyy-MM-dd');
      console.log(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/drivers/available/${startdate}/${enddate}`)
      const response = await axios.get(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/drivers/available/${startdate}/${enddate}`);
      //   setVehicles(response.data);

      console.log(response.data)
      const dataWithIds = response.data.map((item, index) => ({
        ...item,
        id: index + 1, // Start id from 1
      }));
      console.log(dataWithIds)
      setRows(dataWithIds)
      //    setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="App">
      <DataGrid
        rows={rows}
        columns={columns}
        density="compact"
        selectionModel={selectionModel}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
      <div style={{ marginTop: "40px" }}>
        {/* You have selected: {selectedRow[0].driver_Mobile} {selectedRow[0].driver_Name}
     */}

      </div>
    </div>
  );
}
