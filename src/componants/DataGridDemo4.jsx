/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import { Button } from '@mui/material';
import './css/DataGridBookings.css'
const VehicleGrid = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('https://localhost:50626/vehicles');
            setVehicles(response.data);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/vehicles/${id}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleEdit = async (id, updatedVehicle) => {
        try {
            await axios.put(`http://localhost:5000/vehicles/${id}`, updatedVehicle);
            fetchVehicles();
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    const columns = [
        { field: 'vehicleId', headerName: 'ID', width: 90,headerClassName: 'header-row' },
        { field: 'vehicleName', headerName: 'Name', width: 150, editable: true,headerClassName: 'header-row' },
        { field: 'vehicleType', headerName: 'Type', width: 150, editable: true ,headerClassName: 'header-row'},
        { field: 'capacity', headerName: 'Capacity', width: 110, editable: true,headerClassName: 'header-row' },
        { field: 'status', headerName: 'Status', width: 150, editable: true,headerClassName: 'header-row' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            ClassName: 'header-row',
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(params.id, params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(params.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={vehicles}
                columns={columns}
                pageSize={5}
                loading={loading}
                getRowId={(row) => row.vehicle_Id}
                onCellEditCommit={(params) => handleEdit(params.vehicle_Id, { ...params.row, [params.field]: params.value })}
            />
        </div>
    );
};

export default VehicleGrid;
