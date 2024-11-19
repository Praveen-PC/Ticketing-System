import React from "react";
import { Link, useNavigate } from "react-router-dom";



const Header = ({role}) => {
    const navigate=useNavigate()
    const token=sessionStorage.getItem('authtoken')
    const handleLogout=()=>{
        sessionStorage.removeItem('authtoken')
        navigate('/')        
    }
    
    const decodedToken=role
    const userRole=decodedToken?.role

  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link to="/dashboard" className="navbar-brand mb-0 h1 text-decoration-none fw-bold">Navbar</Link>
        <div className="d-flex justify-content-around">
          {userRole==='admin'?<Link to="/userdetails" className="btn  btn-outline-none border-0" ><i class="fa-solid fa-users"></i></Link>:" "} 

          {!token ? " ":<button className="btn  border-0" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>} 
        
        </div>
        
        </div>
      </nav>
    </>
  );
};

export default Header;
