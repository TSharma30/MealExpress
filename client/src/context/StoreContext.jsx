import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = "http://localhost:8080";

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            await axios.post(
                url+ "/api/cart/add",
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
    };
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            if (newCartItems[itemId] > 0) {
                newCartItems[itemId] -= 1;
            }
            return newCartItems;
        });
        if (token) {
            await axios.post(
                url+ "/api/cart/remove",
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        console.log("cartItems:", cartItems);
        console.log("food_list:", food_list);

        if (loading) {
            console.warn("Food list is still loading.");
            return totalAmount;
        }

        if (food_list.length === 0) {
            console.warn("food_list is empty or not yet fetched.");
            return totalAmount;
        }

        for (const itemId in cartItems) {
            console.log(`Checking item: ${itemId} (type: ${typeof itemId})`);

            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => {
                    console.log(`Comparing itemId (${itemId} - type: ${typeof itemId}) with product.id (${product.id} - type: ${typeof product.id})`);
                    return product.id.toString() === itemId.toString();
                });

                console.log("Item info:", itemInfo);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                } else {
                    console.warn(`Item with ID ${itemId} not found in food_list.`);
                }
            }
        }

        console.log("Final totalAmount:", totalAmount);
        return totalAmount;
    };

    const loadCartData=async(token)=>{
        const response= await axios.post(
            url+ "/api/cart/get",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
        );
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        
        loadData();

    }, []);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        url,
        setFoodList,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
