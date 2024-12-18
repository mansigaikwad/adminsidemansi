/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useBookingStore from './states/booking_store';
import { format } from 'date-fns';
const columns = [
    // { field: 'booking_Id', headerName: 'ID', headerClassName: 'header-row' },
    { field: 'booked_id', headerName: 'Booked ID', width: 100, headerClassName: 'header-row' },
    { field: 'vehicle_Id', headerName: 'Vehicle Number', width: 150, headerClassName: 'header-row' },
    { field: 'driver_Id', headerName: 'Driver ID', width: 150, headerClassName: 'header-row' },
    {
        field: 'start_Date', headerName: 'StartDate', width: 150, valueFormatter: (params) => {
            // Format the date to 'MM/dd/yyyy'
            return format(new Date(params.split('T')[0]), 'dd/MM/yyyy');
        }, headerClassName: 'header-row'
    },
    {
        field: 'end_Date', headerName: 'EndDate', width: 150, valueFormatter: (params) => {
            // Format the date to 'MM/dd/yyyy'
            return format(new Date(params.split('T')[0]), 'dd/MM/yyyy');
        }, headerClassName: 'header-row'
    },
     
    //   { field: 'tr_date', headerName: 'TrDate', width: 600 }
]
 


// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function UpdatedBookingGrid() {
    const rows = useBookingStore((state) => state.updatebookings);

  return (
    <Box sx={{ height: 200, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={(row) => row.booking_Id}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        density="compact"
      />
    </Box>
  );
}
