# Paradise Nursery 🌿

**Paradise Nursery** is an online houseplant shop built with **React** and **Redux Toolkit**.
This is the final project of the *Developing Front-End Apps with React* course.

## Features

- **Landing page** – background image, company name, a short paragraph about the company and a **Get Started** button.
- **Product listing page** – 18 unique houseplants grouped into 3 categories (Air Purifying, Aromatic & Medicinal, Low Maintenance). Each plant shows a thumbnail, name, description and price, with an **Add to Cart** button that is disabled once the plant is in the cart.
- **Shopping cart page** – thumbnail, name, unit price and subtotal for every plant, **+ / −** quantity buttons, **Delete** button, total number of plants, total cost, **Continue Shopping** and **Checkout** ("Coming Soon") buttons.
- **Header / navbar** on the product and cart pages with links to **Home**, **Plants** and **Cart**, plus a cart icon that shows the total number of items dynamically.
- Global cart state managed by a Redux slice (`CartSlice.jsx`) with `addItem`, `removeItem` and `updateQuantity` reducers.

## Tech stack

React 18 · Redux Toolkit · React-Redux · Vite · GitHub Pages

## Project structure

```
src/
├── AboutUs.jsx        # About the company
├── App.jsx            # Landing page + page switching
├── App.css            # Landing page styles (background image)
├── CartItem.jsx       # Shopping cart page
├── CartItem.css
├── CartSlice.jsx      # Redux slice for the cart
├── ProductList.jsx    # Navbar + product listing page
├── ProductList.css
├── store.js           # Redux store
└── main.jsx           # Entry point
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

Then in the repository go to **Settings → Pages** and select the `gh-pages` branch.
