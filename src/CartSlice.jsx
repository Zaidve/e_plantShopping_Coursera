import { createSlice } from '@reduxjs/toolkit';

// Redux slice that holds the shopping cart for Paradise Nursery.
// Each item: { name, image, description, cost, category, quantity }
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // plants currently in the cart
  },
  reducers: {
    // Add a plant to the cart, or bump its quantity if it is already there
    addItem: (state, action) => {
      const { name, image, cost, description, category } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, description, category, quantity: 1 });
      }
    },

    // Remove a plant type from the cart completely (payload: plant name)
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // Set the quantity of a plant (payload: { name, quantity })
    // A quantity of 0 or less removes the plant from the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.name !== name);
        } else {
          itemToUpdate.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default CartSlice.reducer;
