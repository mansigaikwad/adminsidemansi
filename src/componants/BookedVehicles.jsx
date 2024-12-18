/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import './css/DataGridBookings.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  useGridApiContext
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: "Mahesh",
    driveraddress: "Aurangabad",
    mobile: "9822899592",
    status: "Available",

  },

];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', driveraddress: "", mobile: "", status: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>

    </GridToolbarContainer>
  );
}


export default function DataGridBooked() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetchBookedVehicle();
  }, []);

  const fetchBookedVehicle = async () => {
    try {
      const response = await axios.get('http://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/bookedvehicles');
      //   setVehicles(response.data);

      console.log(response.data)
      const dataWithIds = response.data.map((item, index) => ({
        ...item,
        id: index + 1, // Start id from 1
      }));
      console.log(dataWithIds)
      setRows(dataWithIds)
      setIsLoading(false)
      //    setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //end getdata from serever


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log("Save clicked!!!!")

    console.log(GridRowModes.View.driver_Name)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  //delete code
  const deleteRecord = async (recordId) => {
    try {
      const response = await fetch(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/driver/${recordId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };
  const handleDeleteClick = (id) => async () => {
    // const row=rows.find((row)=>row.id==id)
    // console.log(row)
    await deleteRecord(id)
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const CustomEditComponent = (props) => {
    const { id, value, field, api } = props;
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (event) => {
      const newValue = event.target.value;
      console.log("Testing 123.....")
      console.log({ ...props, release_Date: newValue })
      setInputValue(newValue);
      api.setEditCellValue({ id, field, value: newValue }, event);
    };

    return (
      <TextField type='date'
        value={inputValue}
        onChange={handleChange}
        variant="standard"
      />
    );
  };
  const updateRecord = async (data) => {

    try {
      const response = await axios.put(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/bookedvehicle/release`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Record updated:', response.data);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const addRecord = async (data) => {
    try {
      const response = await axios.post(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/driver`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Record added:', response.data);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };
  function validateMobileNumber(number) {
    // Regular expression pattern for a 10-digit number
    const pattern = /^\d{10}$/;
    // Test the number against the pattern
    if (!pattern.test(number)) {
      throw new Error('Mobile number must be 10 digits');
    }
    return number;
  }
  function validateVehicleNumber(vehicleNumber) {
    // Define the regex pattern for the vehicle number (case-insensitive)
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/i;
    if (!pattern.test(vehicleNumber)) {
      throw new Error('Vehicle Number must be in format like MH23BC1234');
    }
    // Test the vehicle number against the pattern
    return vehicleNumber;
  }
  function validateDriverName(name) {
    // Define the regex pattern for the name
    const pattern = /^[a-zA-Z\s]+$/;

    // Test the name against the pattern
    // Example usage

    if (!pattern.test(name)) {
      throw new Error('Name must be valid name');
    }
    return name;
  }
  function validateTime24HourFormat(time) {
    // Regular expression to match time in 24-hour format (HH:MM)
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regex.test(time)) {
      throw new Error('Time must be in 24 hour format...');
    }
    return time;
  }

  const processRowUpdate = async (newRow) => {
    try {

      validateTime24HourFormat(newRow.release_Time)

    } catch (error) {
      alert(error);
      return
    }
    // const { driver_Id, driver_Name, driver_Address, driver_Mobile, vehicle_Id, availability } = newRow
    // const changedRow = { driver_Id, driver_Name, driver_Address, driver_Mobile, vehicle_Id, availability }
    // console.log(changedRow)
    // console.log(driver_Id,driver_Name,driver_Address,driver_Mobile,vehicle_Id,availability)
    const jsonString = JSON.stringify(newRow);

    if (newRow['isNew'] != true) {
      await updateRecord(jsonString)
      console.log(`Update Record ${jsonString}`)
    }
    // else if (newRow['isNew'] == true) {
    //   await addRecord(jsonString)
    //   console.log(`Save Record ${jsonString}`)
    // }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  //   { id, name: '', driveraddress:"",mobile:"", status: '', isNew: true },
  const columns = [
    { field: 'booked_id', headerName: 'Booked ID', width: 180, editable: true, headerClassName: 'header-row' },
    {
      field: 'driver_Id',
      headerName: 'Driver ID',
      width: 180,
      editable: true,
      headerClassName: 'header-row'
    },

    {
      field: 'vehicle_Id',
      headerName: 'Vehicle Number',
      width: 180,
      editable: true,
      headerClassName: 'header-row'
    },
    {
      field: 'release_Date',
      headerName: 'Release Date',
      width: 180,
      editable: true,
      valueFormatter: (params) => {
        if (params == undefined) {
          return
        }
        // return format(new Date(params.split('T')[0]), 'dd/MM/yyyy');
        return format(new Date(params.split('T')[0]), 'dd/MM/yyyy');
      },
      renderEditCell: (params) => <CustomEditComponent {...params} />,
      headerClassName: 'header-row',

    },
    {
      field: 'release_Time',
      headerName: 'Release Time',
      // type: 'number',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      headerClassName: 'header-row'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      headerClassName: 'header-row',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,

        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        loading={isLoading}

        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
