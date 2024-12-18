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
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
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


];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, vehicle_Name: '', vehicle_Id: "", capacity: 0, status: '', vehicle_Type: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const validateRow = (newRow) => {
  if (newRow.capacity <= 0) {
    throw new Error('Capacity must be a positive number');
  }
  return newRow;
};
function validateVehicleNumber(vehicleNumber) {
  // Define the regex pattern for the vehicle number (case-insensitive)
  const pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/i;
  if (!pattern.test(vehicleNumber)) {
    throw new Error('Vehicle Number must be in format like MH23BC1234');
  }
  // Test the vehicle number against the pattern
  return vehicleNumber;
}

function validateVehicleName(name) {
  // Define the regex pattern for the name
  const pattern = /^[a-zA-Z\s]+$/;

  // Test the name against the pattern
  // Example usage

  if (!pattern.test(name)) {
    throw new Error('Vehicle Name must be valid name');
  }
  return name;
}


export default function FullFeaturedCrudGrid() {


  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
const [isLoading, setIsLoading] = useState(true) 

  //get data from server


  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicles');
      //   setVehicles(response.data);

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
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const deleteRecord = async (recordId) => {
    try {
      const response = await fetch(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicle/${recordId}`, {
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
   
    const choice=confirm("Do you want to Delete record")
     if(choice){
      const row=rows.find((r)=>r.id==id)
      await deleteRecord(row.vehicle_Id)
      alert(`Deleted record code ${row.vehicle_Id}`)
      setRows(rows.filter((row) => row.id !== id));
     }
    
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
  //code to save and update recod

  const updateRecord = async (data) => {
    try {
      const response = await axios.put(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicle`, data, {
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
      const response = await axios.post(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/vehicle`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Record added:', response.data);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };
  //end here
  const processRowUpdate = async (newRow) => {

    try {
      validateRow(newRow)
      validateVehicleNumber(newRow.vehicle_Id)
      validateVehicleName(newRow.vehicle_Name)
    } catch (error) {
      alert(error);
      return
    }

    const jsonString = JSON.stringify(newRow);

    if (newRow['isNew'] != true) {
      await updateRecord(jsonString)
      console.log(`Update Record ${jsonString}`)
    }
    else if (newRow['isNew'] == true) {
      await addRecord(jsonString)
      console.log(`Save Record ${jsonString}`)
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'vehicle_Name', headerName: 'VehicleName', width: 180, editable: true, headerClassName: 'header-row' },
    {
      field: 'vehicle_Id',
      headerName: 'Vehicle Number',
      width: 180,
      editable: true,
      headerClassName: 'header-row'

    },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Avaliable', 'On Trip', 'Maintanance'],
      headerClassName: 'header-row'
    },
    {
      field: 'capacity',
      headerName: 'Capacity',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      headerClassName: 'header-row'
    },
    {
      field: 'vehicle_Type',
      headerName: 'Vehicle Type',
      width: 180,
      editable: true,
      type: 'singleSelect',
      headerClassName: 'header-row',
      valueOptions: ['Sedan', 'SUV', 'Minivan', 'Van'],
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
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
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
