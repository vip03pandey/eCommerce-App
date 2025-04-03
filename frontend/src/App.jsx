import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<UserLayout/>}>
    { /*Home */ }
    { /*Products */ }
    </Route>
    <Route>{ /*admin layout*/ }</Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
