import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddRestaurantContext from '../context/AddRestaurantContext';
import { useNavigate } from 'react-router-dom';

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [contactNumber, setContactNumber] = useState(null);
    const navigate = useNavigate();

    const { AddRestaurant, response, error } = useContext(AddRestaurantContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await AddRestaurant(name, description, location, contactNumber);
        if (response) {
            navigate('/');
        };

    }

    return (
        <Container maxWidth="sm">
            <Box display="flex" alignItems="flex-start" mb={3}>
                <IconButton onClick={()=> navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Restaurant
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="name"
                    variant='outlined'
                    fullWidth
                    required
                    margin='normal'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    fullWidth
                    type='number'
                    required
                    margin="normal"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Add Restaurant
                </Button>
            </Box>
        </Container>
    )
};

export default AddRestaurant;