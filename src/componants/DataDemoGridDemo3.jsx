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
import { useState, useEffect } from 'react'
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

// const roles = ['Market', 'Finance', 'Development'];
// const randomRole = () => {
//     return randomArrayItem(roles);
// };

const initialRows = [];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;


    // {
    //     "vehicle_Id": "mh20",
    //     "vehicle_Name": "tata",
    //     "vehicle_Type": "safari",
    //     "capacity": 10,
    //     "status": "maintainance"
    //   },

    const handleClick = () => {
        const vehicle_Id ="";
        setRows((oldRows) => [
            ...oldRows,
            { vehicle_Id, vehicle_Name: '', vehicle_Type: '',capacity: 0, status:'' },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [vehicle_Id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
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

export default function VehicleGrid() {

    const [isLoading, setIsLoading] = React.useState(true)
    const [rows, setRows] = React.useState(initialRows);

    const [rowModesModel, setRowModesModel] = React.useState({});

    useEffect(() => {
        fetch("https://localhost:50626/vehicles")
            .then((data) => data.json())
            .then((data) => setRows(data))
            .then((data) => setIsLoading(false))

    }, [])

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (vehicle_Id) => () => {
        console.log(vehicle_Id)
        console.log(rows)
        setRowModesModel({ ...rowModesModel, [vehicle_Id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.vehicle_Id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.vehicle_Id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.vehicle_Id!== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.vehicle_Id === newRow.vehicle_Id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    // const columns = [
    //     { field: 'vehicle_Id', headerName: 'ID', headerClassName: 'header-row' },
    //     { field: 'vehicle_Name', headerName: 'VehicleName', width: 100, headerClassName: 'header-row' },
    //     { field: 'vehicle_Type', headerName: 'VehicleType', width: 100, headerClassName: 'header-row' },
    //     { field: 'capacity', headerName: 'Capacity', width: 100, headerClassName: 'header-row' },
    //     { field: 'status', headerName: 'Status', width: 100, headerClassName: 'header-row' },
     
    // ]

    const columns = [
        // { field: 'vehicle_Id', headerName: 'ID', width: 180, editable:true},
        {
            field: 'vehicle_Name',
            headerName: 'VehicleName',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'vehicle_Type',
            headerName: 'Vehicle Type',
            width: 180,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Sedans', 'SUV', 'Minivans','Van'],
        },
        { field: 'capacity', headerName: 'Capacity', width: 180, editable:true },
        {
            field: 'status',
            headerName: 'Status',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Avaliable', 'On Trip', 'Maintanance'],
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ vehicle_Id }) => {
                console.log(vehicle_Id)
                const isInEditMode = rowModesModel[vehicle_Id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={vehicle_Id}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(vehicle_Id)}
                        />,
                        <GridActionsCellItem
                            key={vehicle_Id}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(vehicle_Id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={vehicle_Id}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(vehicle_Id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={vehicle_Id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(vehicle_Id)}
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
                loading={isLoading}
                getRowId={(row) => row.vehicle_Id}
 
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
