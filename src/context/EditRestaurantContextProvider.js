import { useState } from "react";
import EditRestaurantContext from "./EditRestaurantContext"

const EditRestaurantContextProvider = ({children}) => {

    const [error, setError] = useState(null);

    const EditRestaurant = async(name, description, location, contactNumber, id) => {
        const data = {
            name,
            description,
            location,
            contactNumber
        }
        try{
            const response = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const updatedData = await response.json();
            return updatedData;
        }catch(error){
            console.log(error);
            setError(error);
        }
    }

    return(
        <EditRestaurantContext.Provider value={{EditRestaurant, error}}>
            {children}
        </EditRestaurantContext.Provider>
    )
};

export default EditRestaurantContextProvider;