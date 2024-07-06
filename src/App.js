import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AddRestaurant from './components/AddRestaurant';
import EditRestaurant from './components/EditRestaurant';
import RestaurantList from './components/RestaurantList';
import FetchRestaurantContextProvider from './context/FetchRestaurantContextProvider';
import DeleteRestaurantContextProvider from './context/DeleteRestaurantContextProvider';
import AddRestaurantContextProvider from './context/AddRestaurantContextProvider';
import EditRestaurantContextProvider from './context/EditRestaurantContextProvider';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RestaurantList />
    },
    {
      path: '/add',
      element: <AddRestaurant />
    },
    {
      path: '/edit/:id',
      element: <EditRestaurant />
    },
    {
      path: '/',
      element: <RestaurantList />
    },
    {
      path: '',
      element: <RestaurantList />
    }
  ]);
  return (
    <FetchRestaurantContextProvider>
      <DeleteRestaurantContextProvider>
        <AddRestaurantContextProvider>
          <EditRestaurantContextProvider>
            <div>
              <AppBar position='static'>
                <Toolbar>
                  <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    Foodie Delight
                  </Typography>
                </Toolbar>

              </AppBar>
              <Container sx={{ mt: 4 }}>
                <RouterProvider router={router} />
              </Container>
            </div>
          </EditRestaurantContextProvider>
        </AddRestaurantContextProvider>
      </DeleteRestaurantContextProvider>
    </FetchRestaurantContextProvider>

  );
}

export default App;
