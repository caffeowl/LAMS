import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const Faculty = () => {
    const [faculty, setFaculty] = useState([]);
    const [form, setForm] = useState({ id: '', name: '', course: '', department: '' });

    useEffect(() => {
        fetchFaculty();
    }, []);

    const fetchFaculty = async () => {
        const response = await axios.get('http://localhost:1337/faculty');
        setFaculty(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddOrUpdate = async () => {
        if (form.id) {
            await axios.put(`http://localhost:1337/faculty/${form.id}`, form);
        } else {
            await axios.post('http://localhost:1337/faculty', form);
        }
        setForm({ id: '', name: '', course: '', department: '' });
        fetchFaculty();
    };

    const handleEdit = (faculty) => {
        setForm(faculty);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:1337/faculty/${id}`);
        fetchFaculty();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'course', headerName: 'Course', width: 150 },
        { field: 'department', headerName: 'Department', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleEdit(params.row)} color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(params.row)} color="secondary">Delete</Button>
                </>
            )
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <h1>Faculty Management</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField 
                        label="Name" 
                        name="name" 
                        value={form.name} 
                        onChange={handleInputChange} 
                        fullWidth 
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField 
                        label="Course" 
                        name="course" 
                        value={form.course} 
                        onChange={handleInputChange} 
                        fullWidth 
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField 
                        label="Department" 
                        name="department" 
                        value={form.department} 
                        onChange={handleInputChange} 
                        fullWidth 
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={handleAddOrUpdate} color="primary">
                        {form.id ? 'Update' : 'Add'}
                    </Button>
                </Grid>
            </Grid>
            <div style={{ height: 400, marginTop: 20 }}>
                <DataGrid rows={faculty} columns={columns} getRowId={(row) => row.id} />
            </div>
        </div>
    );
};

export default Faculty;
