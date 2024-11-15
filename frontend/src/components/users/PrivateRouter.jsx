// import React from 'react'
// import { Navigate } from 'react-router-dom'


// const PrivateRouter = ({children,requiredRole}) => {
//     const token=sessionStorage.getItem('authtoken')
     
//     if (!token){
//         return <Navigate to='/'/>
//     }

//     const decodedToken = JSON.parse(atob(token.split('.')[1])); 
//     const userRole = decodedToken.role;

//     if (requiredRole && userRole !== requiredRole) {
//         return <Navigate to="/" />;
//       }
//     return children
// }

// export default PrivateRouter

const PrivateRouter = ({ children, requiredRole }) => {
    const token = sessionStorage.getItem('authtoken');
    
    if (!token) {
        return <Navigate to="/" />;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log("Decoded Token:", decodedToken); 

    const userRole = decodedToken.role;

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRouter;
