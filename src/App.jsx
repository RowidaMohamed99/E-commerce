import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import UserProvider from './Context/Context';
import CartProvider from './Context/Cart.context';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './pages/AllOrders/AllOrders';
import Categories from './pages/Category/Category';
import Products from './pages/Products/Products';
import Brands from './pages/Brands/Brands';
import Wishlist from './pages/Wishlist/Wishlist';
import WishlistProvider from './Context/Wishlist.context';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Verify from './components/Verify/Verify';
import ResetPassword from './components/ResetPassword/ResetPassword';
import GuestRoute from './components/GuestRoute/GuestRoute';

export default function App() {
    const route= createBrowserRouter([
        {path: "/" , element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>),
            children:[{index: true, element: <Home /> },
              {path: "/cart", element: <Cart/>},
              {path: "/wishlist", element: <Wishlist/>},
              {path: "/product/:id", element: <ProductDetails/>},
              {path: "/Products", element: <Products/>},
              {path: "/Categories", element: <Categories/>},
              {path: "/brands", element: <Brands/>},
              {path: "/checkout", element: <Checkout/>},
              {path: "/allorders", element: <AllOrders/>},
            ],
        },

        {
          path: "/" , element: (
          <GuestRoute>
            <Layout/>
          </GuestRoute>),
          children: [
        {path: "/Login" , element: <Login/>},
        {path: "/Signup" , element: <Signup/>},
        {path: "/forgetpassword", element: <ForgetPassword/>},
        {path: "/verify", element: <Verify/>},
        {path: "/resetpassword", element: <ResetPassword/>},

      ],
    },
    ])

    return<>
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
        <RouterProvider router= {route}/>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
    <Toaster position="top-right"/>
    </>;
}
