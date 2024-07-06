import { useContext, useState } from "react";
import DeleteRestaurantContext from "./DeleteRestaurantContext"
import FetchRestaurantContext from "./FetchRestaurantContext";

const DeleteRestaurantContextProvider = ({children}) => {
    const {setRestaurantList} = useContext(FetchRestaurantContext);
    const deleteRestaurant = async(id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            const restaurantList = await fetch('http://localhost:5000/api/restaurants');
            const restaurantListData = await restaurantList.json();
            setRestaurantList(restaurantListData);
            return result;

        }catch(error){
            console.log(error);   
        }
    }
    return(
        <DeleteRestaurantContext.Provider value={{deleteRestaurant}}>
            {children}
        </DeleteRestaurantContext.Provider>
    )
}

export default DeleteRestaurantContextProvider;