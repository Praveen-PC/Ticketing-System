import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        sessionStorage.removeItem('authtoken')
        navigate('/')        
    }
  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link to="#" className="navbar-brand mb-0 h1 text-decoration-none">Navbar</Link>
          <button className="btn btn-outline-none" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></button>
        </div>
      </nav>
    </>
  );
};

export default Header;
