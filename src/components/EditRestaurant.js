import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchRestaurantContext from '../context/FetchRestaurantContext';
import { TextField, Button, Container, Typography, Box, IconButton } from '@mui/material';
import EditRestaurantContext from '../context/EditRestaurantContext';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { restaurantList } = useContext(FetchRestaurantContext);

    const restaurant = restaurantList?.filter((res) => res._id === id);

    const [name, setName] = useState(restaurant[0]?.name);
    const [description, setDescription] = useState(restaurant[0]?.description);
    const [location, setLocation] = useState(restaurant[0]?.location);
    const [contactNumber, setContactNumber] = useState(restaurant[0]?.contactNumber);

    const { EditRestaurant } = useContext(EditRestaurantContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await EditRestaurant(name, description, location, contactNumber, id);
        if (response) {
            navigate('/');
        }
    }

    return (
        <Container maxWidth="sm">

            <Box display="flex" alignItems="flex-start" mb={3}>
                <IconButton onClick={() => navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h4' component='h1' gutterBottom>
                    Edit Restaurant
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
                    required
                    margin="normal"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Edit Restaurant
                </Button>
            </Box>
        </Container>
    )
};
export default EditRestaurant;