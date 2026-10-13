import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const PLACEHOLDER = `${import.meta.env.BASE_URL}plant-placeholder.svg`;

// Convert a cost string like "$15" to a number
const parseCost = (cost) => parseFloat(String(cost).replace('$', '')) || 0;

// Shopping Cart page
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total number of plants in the cart
  const totalPlants = cart.reduce((total, item) => total + item.quantity, 0);

  // Total cost of all items in the cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);

  // Subtotal for one plant type (unit price x quantity)
  const calculateTotalCost = (item) => (parseCost(item.cost) * item.quantity).toFixed(2);

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon! Checkout functionality will be available soon.');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // quantity would drop to 0 -> remove the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Shopping Cart</h2>

      <div className="cart-summary">
        <div className="summary-box">
          <span className="summary-label">Total Plants</span>
          <span className="summary-value">{totalPlants}</span>
        </div>
        <div className="summary-box">
          <span className="summary-label">Total Cart Amount</span>
          <span className="summary-value">${calculateTotalAmount()}</span>
        </div>
      </div>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add some plants to bring nature home!</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = PLACEHOLDER;
                }}
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit price: {item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name}`}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="get-started-button continue-btn" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <button className="get-started-button checkout-btn" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
