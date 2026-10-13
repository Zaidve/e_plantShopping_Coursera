import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Fallback thumbnail used if a remote image fails to load
const PLACEHOLDER = `${import.meta.env.BASE_URL}plant-placeholder.svg`;

// 18 unique houseplants grouped into 3 categories (6 per category)
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity to the air and removes toxins.', cost: '$20' },
      { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy to care for and effective at removing toxins.', cost: '$17' },
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies the air and has healing properties for skin.', cost: '$14' },
    ],
  },
  {
    category: 'Aromatic & Medicinal Plants',
    plants: [
      { name: 'Lavender', image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=600&q=80', description: 'Calming scent, used in aromatherapy.', cost: '$20' },
      { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?auto=format&fit=crop&w=600&q=80', description: 'Sweet fragrance, promotes relaxation.', cost: '$18' },
      { name: 'Rosemary', image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg', description: 'Invigorating scent, often used in cooking.', cost: '$15' },
      { name: 'Mint', image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg', description: 'Refreshing aroma, used in teas and cooking.', cost: '$12' },
      { name: 'Lemon Balm', image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg', description: 'Citrusy scent, relieves stress and promotes sleep.', cost: '$14' },
      { name: 'Echinacea', image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg', description: 'Boosts immunity and helps fight colds.', cost: '$16' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80', description: 'Thrives in low light and requires minimal watering.', cost: '$25' },
      { name: 'Pothos', image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg', description: 'Tolerates neglect and grows in various conditions.', cost: '$10' },
      { name: 'Cast Iron Plant', image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg', description: 'Hardy plant that tolerates low light and neglect.', cost: '$20' },
      { name: 'Succulents', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg', description: 'Drought-tolerant plants with unique shapes and colors.', cost: '$18' },
      { name: 'Aglaonema', image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg', description: 'Requires minimal care and adds color to indoor spaces.', cost: '$22' },
      { name: 'Jade Plant', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80', description: 'Symbol of good luck, very easy to care for.', cost: '$16' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items in the cart (sum of quantities) for the cart icon
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // A plant is "added" while it is in the cart -> its Add to Cart button is disabled.
  // If it is deleted from the cart, the button becomes available again.
  const isInCart = (plantName) => cartItems.some((item) => item.name === plantName);

  const handleAddToCart = (plant, category) => {
    dispatch(addItem({ ...plant, category }));
  };

  // ---- Navbar navigation ----
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    setShowCart(false);
  };

  return (
    <div className="product-page">
      {/* ---------- Navbar (shown on Product Listing and Cart pages) ---------- */}
      <nav className="navbar">
        <a href="#" className="navbar-brand" onClick={handleHomeClick}>
          <img src={`${import.meta.env.BASE_URL}leaf.svg`} alt="Paradise Nursery logo" />
          <div>
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </div>
        </a>

        <ul className="navbar-links">
          <li>
            <a href="#" onClick={handleHomeClick}>Home</a>
          </li>
          <li>
            <a href="#" className={!showCart ? 'active' : ''} onClick={handlePlantsClick}>Plants</a>
          </li>
          <li>
            <a href="#" className={`cart-link ${showCart ? 'active' : ''}`} onClick={handleCartClick} aria-label="Cart">
              <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="156" height="156" fill="none"></rect>
                <circle cx="80" cy="216" r="12"></circle>
                <circle cx="184" cy="216" r="12"></circle>
                <path
                  d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <span className="cart-count">{totalCartQuantity}</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* ---------- Page content ---------- */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category} className="category-section">
              <h2 className="category-title">{group.category}</h2>
              <div className="product-list">
                {group.plants.map((plant) => {
                  const added = isInCart(plant.name);
                  return (
                    <div className="product-card" key={plant.name}>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = PLACEHOLDER;
                        }}
                      />
                      <div className="product-title">{plant.name}</div>
                      <div className="product-description">{plant.description}</div>
                      <div className="product-cost">{plant.cost}</div>
                      <button
                        className={`product-button ${added ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant, group.category)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
