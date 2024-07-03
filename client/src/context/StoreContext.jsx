import React, { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { useLoaderData } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "http://localhost:8080"; // Base URL for API

    // Function to add an item to the cart
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    // Function to calculate total amount in the cart
    // Function to calculate total amount in the cart
const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product.id === item);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
    }
    return totalAmount;
};

    // Function to fetch food list from the server
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Effect to fetch food list on component mount
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
        }
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        loadData();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Context value with all relevant state and functions
    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        url,
        setFoodList, // Make sure to include setFoodList in context value
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
