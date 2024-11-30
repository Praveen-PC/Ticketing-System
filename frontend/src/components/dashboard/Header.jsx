import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from "../../assets/macsoft-logo.png";

const Header = ({ handleMessageFilter, newMessage }) => {
  const navigate = useNavigate();
  let { ticketStatus } = useParams();
  const token = sessionStorage.getItem("authtoken");
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
    sessionStorage.removeItem("authtoken");
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light ">
     
        <div className="container-fluid ">
          <div className="d-flex">
            <img
              src={logo}
              alt="Macsoft Logo"
              className="border-0"
              style={{
                width: "25px",
                height: "25px",
                marginRight: "7px",
                marginTop: "3px",
              }}
            />
            <Link
              to="/statusdashboard"
              className="navbar-brand  h1 text-decoration-none fw-bold "
            >
              Macsoft 
              {/* <h6 className="text-muted fw-bold" style={{fontSize:"10px"}}>Support_Hub</h6> */}
            </Link>
            
          </div>



     

          <div className="d-flex justify-content-around  shadow rounded border">
            {userRole === "admin" && (
              <Link to="/userdetails" className="btn btn-outline-none border-0">
                <div className="">
                  <i className="fa-solid fa-users "></i>
                </div>
              </Link>
            )}

            {!token ? (
              ""
            ) : (
              <>
                <div className="d-flex justify-content-around ">
                  {ticketStatus === "open" || ticketStatus === "close" ? (
                    <button
                      className={`btn border-0 `}
                      onClick={handleMessageFilter}
                    >
                      <div className="d-flex align-items-center justify-content-center ">
                        {newMessage.length > 0 ? (
                          <span
                            className="mx-1 text-danger"
                            style={{ marginTop: "-3px" }}
                          >
                            {newMessage.length}
                          </span>
                        ) : (
                          " "
                        )}
                        {newMessage.length > 0 ? (
                          <i className="fa-regular fa-message text-danger"></i>
                        ) : (
                          <i className="fa-regular fa-message  "></i>
                        )}
                      </div>
                    </button>
                  ) : (
                    ""
                  )}

                  <button className="btn border-0 " onClick={handleLogout}>
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

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import logo from "../../assets/macsoft-logo.png";

// const Header = ({ handleMessageFilter, newMessage }) => {
//   const navigate = useNavigate();
//   let { ticketStatus } = useParams();
//   const token = sessionStorage.getItem("authtoken");
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     if (token) {
//       const jwttoken = token.split(".")[1];
//       const decoded = JSON.parse(atob(jwttoken));
//       if (decoded && decoded.role) {
//         setUserRole(decoded.role);
//       }
//     }
//   }, [token]);

//   const handleLogout = () => {
//     sessionStorage.removeItem("authtoken");
//     navigate("/");
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//         <div className="container-fluid d-flex ">
//           <div className="d-flex align-items-center">
//             <img
//               src={logo}
//               alt="Macsoft Logo"
//               className="border-0"
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 marginRight: "10px",
//                 //borderRadius: "50%",
//               }}
//             />
//             <Link
//               to="/statusdashboard"
//               className="navbar-brand mb-0 text-dark fw-bold"
//               style={{ letterSpacing: "2px" }}
//             >
//               Macsoft
//               <h6 className="text-muted" style={{ fontSize: "10px" }}>
//                 Support Hub
//               </h6>
//             </Link>
//           </div>

//           <div className="d-flex align-items-center ms-auto">
//             {userRole === "admin" && (
//               <Link
//                 to="/userdetails"
//                 className="btn btn-outline-secondary me-3 d-flex align-items-center rounded-pill px-3 py-2"
//                 style={{ fontSize: "14px" }}
//               >
//                 <i className="fa-solid fa-users "></i>
//               </Link>
//             )}

//             {!token ? (
//               ""
//             ) : (
//               <div className="d-flex align-items-center">
//                 {ticketStatus === "open" || ticketStatus === "close" ? (
//                   <button
//                     className="btn btn-outline-info me-3 rounded-pill px-3 py-2"
//                     onClick={handleMessageFilter}
//                     style={{ fontSize: "10px" }}
//                   >
//                     <i className="fa-regular fa-message me-2"></i>
//                     {newMessage.length > 0 && (
//                       <span
//                         className="badge bg-danger"
//                        // style={{ marginTop: "-2px" }}
//                       >
//                         {newMessage.length}
//                       </span>
//                     )}
//                   </button>
//                 ) : (
//                   ""
//                 )}

//                 <button
//                   className="btn btn-outline-danger rounded-pill px-3 py-2"
//                   onClick={handleLogout}
//                   style={{ fontSize: "14px" }}
//                 >
//                   <i className="fa-solid fa-right-from-bracket"></i>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;
