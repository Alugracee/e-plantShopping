import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({  onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((plant) => {
      totalCost += parseFloat(plant.cost.substring(1)) * plant.quantity;
    })
    return totalCost;
  };

  const handleContinueShopping = (e) => {
   e.preventDefault();
   onContinueShopping()
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}))
  };

  const handleDecrement = (item) => {
   if (item.quantity > 1) {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}))
   }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
    //parseFloat(item.cost.replace('$', ''))
   
  };

  const calculateTotalQuantity = () => {
    return cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      <div>
        {cart && cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" 
                onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" 
                onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* How to handle total cost of everything */}
      <p>Total Items: {calculateTotalQuantity()}</p>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


