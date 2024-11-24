import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('authtoken');
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (token) {
            const jwttoken = token.split(".")[1]; 
            const decoded = JSON.parse(atob(jwttoken)); 
            if (decoded && decoded.role) {
                setUserRole(decoded.role); 
            }
        }
    }, [token]); 

    const handleLogout = () => {
        sessionStorage.removeItem('authtoken');
        navigate('/'); 
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/statusdashboard" className="navbar-brand mb-0 h1 text-decoration-none fw-bold">
                        Navbar
                    </Link>
                    <div className="d-flex justify-content-around">
                        {userRole === 'admin' && (
                            <Link to="/userdetails" className="btn btn-outline-none border-0">
                                <i className="fa-solid fa-users"></i>
                            </Link>
                        )}
                       
                        {!token ? (
                            ""
                        ) : (
                          <>
                          <div className="d-flex justify-content-around">
                          {/* <button className="btn border-0" >
                            <i class="fa-regular fa-message"></i>
                            </button> */}

                            <button className="btn border-0" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                           
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
