import React, { useContext } from 'react';
import "./FoodItem.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { addToCart, removeFromCart, cartItems, url  } = useContext(StoreContext);

  const handleAddToCart = () => {
    if (id) {
      addToCart(id);
    } else {
      console.error("Cannot add to cart: ID is undefined or null.");
    }
  };

  const handleRemoveFromCart = () => {
    if (id) {
      removeFromCart(id);
    } else {
      console.error("Cannot remove from cart: ID is undefined or null.");
    }
  };

  const counterWidth = cartItems[id] && cartItems[id] < 10 ? '5.8vw' : '6.1vw';

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + "/images/" + image} alt={name} />

        {/* Buttons for add and counter */}
        {
          cartItems[id] === undefined || cartItems[id] === 0 ?
            (<img
              className='add'
              onClick={handleAddToCart}
              src={assets.add_icon_white}
              alt="Add"
            />)
            :
            (<div className='food-item-counter' style={{ width: counterWidth }}>
              <img
                className='remove-button'
                onClick={handleRemoveFromCart}
                src={assets.remove_icon_red}
                alt="Remove"
              />
              <p className='counter'>{cartItems[id]}</p>
              <img
                className='add-button'
                onClick={handleAddToCart}
                src={assets.add_icon_green}
                alt="Add"
              />
            </div>)
        }
      </div>

      {/* Food item information */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className='food-item-name'>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
