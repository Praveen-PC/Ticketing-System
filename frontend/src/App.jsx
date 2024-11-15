import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Register from './components/users/Register'
import Login from './components/users/Login';
import PrivateRouter from './components/users/PrivateRouter';
import Dashboard from './components/dashboard/AdminDashboard';
import About from './components/dashboard/UserDashboard';



const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/' element={<Login/>}/>
      <Route path='/admindashboard'  element={<PrivateRouter requiredRole="admin"><Dashboard/></PrivateRouter>} />
      <Route path='/userdashboard' element={<PrivateRouter requiredRole='user' ><About/></PrivateRouter>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App