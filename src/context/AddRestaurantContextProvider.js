import { useState } from "react";
import AddRestaurantContext from "./AddRestaurantContext";

const AddRestaurantContextProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const AddRestaurant = async (name, description, location, contactNumber) => {
        const data = {
            name,
            description,
            location,
            contactNumber
        }
        try{
            const response = await fetch('http://localhost:5000/api/restaurants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const createdData = await response.json();
            return createdData;
        }catch(error){
            console.log(error);
            setError(error);
        }
    }
    return (
        <AddRestaurantContext.Provider value={{ AddRestaurant, error }}>
            {children}
        </AddRestaurantContext.Provider>
    )
};

export default AddRestaurantContextProvider;