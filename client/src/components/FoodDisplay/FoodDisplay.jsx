import React, { useContext } from 'react';
import "./FoodDisplay.css";
import FoodItem from '../FoodItem/FoodItem.jsx';
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className="food-display" id='food-display'>
            <h2>Explore Local Flavors: Indulge in the Top Dishes Near You!</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    // Normalize the case for comparison
                    const normalizedCategory = category.toLowerCase();
                    const normalizedItemCategory = item.category.toLowerCase();
                    
                    return (normalizedCategory === "all" || normalizedCategory === normalizedItemCategory) && (
                        <FoodItem 
                            key={index} 
                            id={item.id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            image={item.image} 
                            rating={item.rating}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;