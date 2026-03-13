// src/Router.jsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";

// ← CartProvider lives HERE, inside the router tree
const RootLayout = () => (
  <CartProvider>
    <Navbar />
    <Outlet />
    <Footer />
  </CartProvider>
);

const createRouter = () =>
  createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        { path: "/",         element: <HomePage /> },
        { path: "/checkout", element: <CheckoutPage /> },
        { path: "/about",    element: <div>About</div> },
        { path: "/contact",  element: <div>Contact</div> },
      ],
    },
  ]);

export default createRouter;