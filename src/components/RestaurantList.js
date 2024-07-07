import { useContext, useEffect, useRef, useState } from "react";
import FetchRestaurantContext from "../context/FetchRestaurantContext";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Box, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRestaurantContext from "../context/DeleteRestaurantContext";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const RestaurantList = () => {

    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => clearTimeout(timeoutId);
        }, [value, delay]);

        return debouncedValue;
    }

    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce(search, 500);

    const { restaurantList, fetchData, setRestaurantList } = useContext(FetchRestaurantContext);
    const { deleteRestaurant } = useContext(DeleteRestaurantContext);
    const navigate = useNavigate();
    const isFirstRender = useRef(true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const handleSearch = async () => {
            const response = await fetch(`http://localhost:5000/api/restaurants/search?q=${debouncedSearchTerm}`);
            const data = await response.json();
            setRestaurantList(data);
        }
        handleSearch();

    }, [debouncedSearchTerm]);

    const handleDelete = async (id) => {
        await deleteRestaurant(id);
    }


    if (restaurantList?.length) {
        return (
            <Container maxWidth="md">
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" gutterBottom>
                        Restaurant List
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/add')}
                    >
                        Add Restaurant
                    </Button>

                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        style={{ width: "60%" }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                <List>
                    {restaurantList.map((restaurant) => {
                        return (
                            <ListItem key={restaurant.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ListItemText
                                    primary={
                                        <Box>
                                            <Typography variant="h5">{restaurant.name}</Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Box mt={0.5}>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Location:</strong> {restaurant.location}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Description:</strong> {restaurant.description}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Contact:</strong> {restaurant.contactNumber}
                                            </Typography>
                                        </Box>
                                    }
                                />
                                <Box>
                                    <IconButton component={Link} to={`/edit/${restaurant._id}`}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(restaurant._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        )
                    })}
                </List>
            </Container>
        )
    } else {
        return (
            <Container maxWidth="md">
                <Box display="flex" alignItems="center" justifyContent="space-around" mb={3}>
                    <Typography variant="h4" gutterBottom>
                        No Restaurant Found
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/add')}
                    >
                        Add Restaurant
                    </Button>

                </Box>
            </Container>
        )
    }
};
export default RestaurantList;