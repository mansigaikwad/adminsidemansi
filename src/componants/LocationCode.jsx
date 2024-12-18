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
  {
    id: randomId(),
    location_name: "Mahesh",
    type: "Aurangabad",
 
  },

];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id,  location_name: "", type: "",  isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'location_name' },
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

export default function LocationGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/locations');
      //   setVehicles(response.data);

      console.log(response.data)
    //   const dataWithIds = response.data.map((item, index) => ({
    //     ...item,
    //     id: index + 1, // Start id from 1
    //   }));
    //   console.log(dataWithIds)
      setRows(response.data)
        //  setLoading(false);
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
      const response = await fetch(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/location/${recordId}`, {
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
  const updateRecord = async (data) => {
    try {
      const response = await axios.put(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/location`, data, {
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
     
      
      console.log(data)
      const response = await axios.post(`https://vehiclebackenddemo-f5eahgfjgycmhaar.canadacentral-01.azurewebsites.net/location`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Record added:', response.data);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };
  function validateName(name) {
    // Regular expression pattern for a name with only letters and spaces
    const pattern = /^[a-zA-Z ]+$/;
    // Test the name against the pattern
    if (!pattern.test(name)) {
      throw new Error('Location Name must be valid name');
    }
    return name;
}
  const processRowUpdate = async (newRow) => {
    const {location_name,type} = newRow
    // const changedRow = { driver_Id, driver_Name, driver_Address, driver_Mobile, vehicle_Id, availability }
    // console.log(changedRow)
    // console.log(driver_Id,driver_Name,driver_Address,driver_Mobile,vehicle_Id,availability)
    try {
 
      validateName(newRow. location_name)

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
      let newRow1={id:0,location_name:location_name,type:type}
      const jsonString1 = JSON.stringify(newRow1);
      await addRecord(jsonString1)
      console.log(`Save Record ${jsonString1}`)
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  //   { id, name: '', driveraddress:"",mobile:"", status: '', isNew: true },
  const columns = [
    { field: 'location_name', headerName: 'LocationName', width: 180, editable: true, headerClassName: 'header-row' },
 
    {
      field: 'type',
      headerName: 'Type',
      width: 80,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['local', 'outstation'],
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
