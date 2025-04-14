import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
const App = () => {
  return (
   <BrowserRouter >
   <Toaster position="top-right" reverseOrder={false}/>
   <Routes>
    <Route path="/" element={<UserLayout/>}>
    <Route index element={<Home/>}></Route>
    <Route path="login" element={<Login/>}></Route>
    <Route path="register" element={<Register/>}></Route>
    <Route path="profile" element={<Profile/>}></Route>
    <Route path="collections/:collection" element={<CollectionPage/>}></Route>
    <Route path="product/:id" element={<ProductDetails/>}></Route>
    <Route path="checkout" element={<Checkout/>}></Route>
    <Route path="order-confirmation" element={<OrderConfirmation/>}></Route>
    <Route path="order/:id" element={<OrderDetailsPage/>}></Route>
    <Route path="my-orders" element={<MyOrdersPage/>}></Route>

    </Route>
    <Route path='/admin' element={<AdminLayout/>}>
      <Route index element={<AdminHomePage/>}></Route>
      <Route path='users' element={<UserManagement/>}></Route>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
