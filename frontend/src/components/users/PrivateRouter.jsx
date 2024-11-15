import React from 'react'
import { Navigate } from 'react-router-dom'


const PrivateRouter = ({children}) => {
    const token=sessionStorage.getItem('authtoken')
  
    if (!token){
        return <Navigate to='/'/>
    }
    return children
}

export default PrivateRouter