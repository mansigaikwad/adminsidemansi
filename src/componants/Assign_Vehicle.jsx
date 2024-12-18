/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbarQuickFilter, GridToolbar } from '@mui/x-data-grid'

import { format } from 'date-fns';
import './css/DataGridBookings.css'
import useBookingStore from './states/booking_store';
// {
//     "booking_Id": 1,
//     "employee_Id": "5yfn",
//     "start_Date": "2024-10-10T00:00:00",
//     "end_Date": "2024-10-10T00:00:00",
//     "tour_Type": "ffhn",
//     "place": "hffhfgv",
//     "no_Of_Persons": 6,
//     "start_Time": "15:03:34.1830000",
//     "end_Time": "15:03:34.1830000",
//     "pickup_Location": "gutuk",
//     "dropoff_Location": "ghjyut",
//     "booking_For": "gfde",
//     "coPassenger_Id": "bhuyg",
//     "guest_Name": "ghffjhgksw",
//     "tr_date": "2024-10-10T00:00:00"
// },
const columns = [
    // { field: 'booking_Id', headerName: 'ID', headerClassName: 'header-row' },
    { field: 'employee_Id', headerName: 'EmpID', width: 100, headerClassName: 'header-row' },
    { field: 'tour_Type', headerName: 'TourType', width: 150, headerClassName: 'header-row' },
    { field: 'place', headerName: 'Destination Place', width: 150, headerClassName: 'header-row' },
    { field: 'pickup_Location', headerName: 'PickupLocation', width: 150, headerClassName: 'header-row' },
    {
        field: 'start_Date', headerName: 'StartDate', width: 150, valueFormatter: (params) => {
            // Format the date to 'MM/dd/yyyy'
            return format(new Date(params.split('T')[0]), 'dd/MM/yyyy');
        }, headerClassName: 'header-row'
    },
    { field: 'start_Time', headerName: 'StartTime', width: 150, headerClassName: 'header-row' },
    {
        field: 'end_Date', headerName: 'EndDate', width: 150, valueFormatter: (params) => {
            // Format the date to 'MM/dd/yyyy'
            return format(new Date(params.split('T')[0]), 'dd/MM/yyyy');
        }, headerClassName: 'header-row'
    },
    { field: 'no_Of_Persons', headerName: 'No.Persons', headerClassName: 'header-row' },
   
   

    { field: 'end_Time', headerName: 'EndTime', width: 150, headerClassName: 'header-row' },
    
    { field: 'dropoff_Location', headerName: 'DropLocation', width: 150, headerClassName: 'header-row' },
    { field: 'booking_For', headerName: 'BookingFor', width: 150, headerClassName: 'header-row' },
    { field: 'coPassenger_Id', headerName: 'coPassengerID', width: 150, headerClassName: 'header-row' },
    { field: 'guest_Name', headerName: 'GuestName', width: 150, headerClassName: 'header-row' },
    //   { field: 'tr_date', headerName: 'TrDate', width: 600 }
]
 
const initialRows = [
    { id: 1, vehicle_Name: '', vehicle_Id: "", capacity: 0, status: '', vehicle_Type: '' },
  
  ];
  let checkboxChecked = [initialRows[0].id];
const DataGridBookings = () => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectionModel, setSelectionModel] = React.useState(checkboxChecked)
    const bookings = useBookingStore((state) => state.bookings);
    const setBookings = useBookingStore((state) => state.setBookings);
    useEffect(() => {
        fetch("https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/booking/date")
            .then((data) => data.json())
            .then((data) => setTableData(data))
            .then((data) => setIsLoading(false))

    }, [])
    



    console.log(tableData)

    return (
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid

                rows={tableData}
                columns={columns}
                pageSize={5}
                checkboxSelection
                selectionModel={selectionModel}
                onRowSelectionModelChange={(ids) => {

                    const selectedIDs = new Set(ids);
                    const selectedRows = tableData.filter((row) => selectedIDs.has(row.booking_Id)
                    );

                    setSelectedRows(selectedRows);
                    setSelectionModel(ids)
                   // console.log(selectedRows)
                    setBookings(selectedRows)
                    
                }}
                getRowId={(row) => row.booking_Id}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
                }
                loading={isLoading}
                // components={{ Toolbar: GridToolbarQuickFilter }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
           {console.log(bookings)}
        </div>

    )
}

export default DataGridBookings