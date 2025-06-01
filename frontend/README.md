# React Redux Shopping Cart

A simple shopping cart application built with React, Redux Toolkit, and localStorage persistence.  
It fetches product details from [Fake Store API](https://fakestoreapi.com/) and allows users to add/remove items in the cart with quantity management.

---

## Features

- Fetch product details from an external API
- Add products to cart with quantity control
- Remove products from cart
- Increase/decrease item quantity in cart
- Persist cart data in `localStorage` across browser sessions
- Responsive UI with dark mode support
- Loading and empty cart states
- Basic wishlist button UI (not functional)
- Navigation between product list, product detail, and cart page

---

## Tech Stack

- React (with hooks)
- Redux Toolkit for state management
- React Router for navigation
- Framer Motion for animations
- Lucide-react for icons
- Tailwind CSS for styling

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-redux-shopping-cart.git
cd react-redux-shopping-cart
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Run the development server:

bash
Copy
Edit
npm start
# or
yarn start
Open http://localhost:3000 in your browser.

Project Structure
css
Copy
Edit
src/
├── components/
│   ├── Navbar.jsx
│   └── Cart.jsx
│   └── FilterSidebar.jsx
│   └── ProductGrid.jsx
├── pages/
│   ├── ProductDetail.jsx
│   └── CartPage.jsx
│   └── HomePage.jsx
│   └── CheckoutSuccess.jsx
├── redux/
│   └── slices/
│       └── cartSlice.js
│       └── store.js
├── App.jsx
└── main.js

How It Works
The cart state is managed using Redux Toolkit.

Cart items are saved to and loaded from localStorage to maintain state across reloads.

When adding to cart, the quantity is updated if the product already exists.

The cart page displays all items, their quantities, and total items.

Quantity controls allow incrementing or decrementing items in the cart.

The product detail page fetches product info based on URL params.

Notes
Cart persistence is handled inside the Redux slice reducers by syncing to localStorage.

Avoid manual localStorage.setItem calls outside reducers to prevent inconsistent data.

The wishlist button is only a UI placeholder and does not have functionality yet.

Future Improvements
Add full wishlist functionality

Integrate with a real backend API

Add user authentication and order processing

Improve UI/UX with more product images and reviews

Use redux-persist for cleaner state persistence management

License
MIT © Your Name

If you find any issues or want to contribute, please open an issue or pull request.

Happy coding! 🚀

yaml
Copy
Edit

---

If you want, I can customize it more for your repo or add badges and screenshots!
```
