import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
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
    </Route>
    <Route>{ /*admin layout*/ }</Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
