import { useEffect, useState } from "react"
import FetchRestaurantContext from "./FetchRestaurantContext";

const FetchRestaurantContextProvider = ({ children }) => {
    const [restaurantList, setRestaurantList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/restaurants');
            const result = await response.json();
            setRestaurantList(result);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <FetchRestaurantContext.Provider value={{ restaurantList, setRestaurantList, fetchData }}>
            {children}
        </FetchRestaurantContext.Provider>
    )
}

export default FetchRestaurantContextProvider;