import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { format } from "date-fns";



const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [filterData, setFilterdata] = useState([]);
  const [form, setform] = useState({
    customername: "",
    controllerno: "",
    state: "",
    district: "",
    village: "",
    block: "",
    faultcode: "",
    complainttype: "",
    details: "",
    picture: "",
  });

  

  const [currentPage,setCurrentPage]=useState(1)
  const recordPerPage=8
  const datatoPaginate=filterData.length>0 ? filterData: data
  const lastIndex=currentPage * recordPerPage
  const firstIndex=lastIndex-recordPerPage
  const records=datatoPaginate.slice(firstIndex,lastIndex)
  const nPage=Math.ceil(datatoPaginate.length/recordPerPage);

  const pageLimit=3
  const pageStart=Math.floor((currentPage-1)/pageLimit)*pageLimit+1
  const pageEnd=Math.min(pageStart+pageLimit-1,nPage) 

  const pageNumber=[]
  for (let i=pageStart;i <= pageEnd;i++){
    pageNumber.push(i)
  }
  const prePage=()=>{
    if(currentPage !== 1  ){
      setCurrentPage(currentPage-1)
    }
  }
  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
};

  const nextPage=()=>{
    if(currentPage !== nPage){
      setCurrentPage(currentPage+1)
    }
  }

  const fetchData = async () => {
    const token=sessionStorage.getItem('authtoken')  
    if (!token && !token.startsWith('Bearer ')){
      console.log("no token found")
      return;
    }
    const jwttoken = token.split('.')[1];  
  const decode = JSON.parse(atob(jwttoken));   
  
  console.log(decode);  
  console.log(decode.role); 
    try {
      if(decode.role=='admin'){
        const response = await axios.get("http://localhost:8080/api/getticket",{ headers: { Authorization: `Bearer ${token}` }});
        setdata(response.data.reverse());
      }
      if(decode.role=='user'){
        const response = await axios.get("http://localhost:8080/api/getticket/user",{ headers: { Authorization: `Bearer ${token}` }});
        setdata(response.data.reverse());

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [form]);

  const handleEdit = (value) => {
    setform({
      customername: value.customername,
      controllerno: value.controllerno,
      state: value.state,
      district: value.district,
      village: value.village,
      block: value.block,
      faultcode: value.faultcode,
      complainttype: value.complainttype,
      details: value.details,
      picture: value.picture,
    });
    setEditing(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editing
        ? `http://localhost:8080/api/updateticket/${editing.ticketcode}`
        : "http://localhost:8080/api/addticket";
      const method = editing ? "put" : "post";
      const response = await axios[method](endpoint, form);
      console.log(response.data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (ticketcode) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteticket/${ticketcode}`
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleSearch = (e) => {
    const value = e.target.value.trim();   
    setSearch(value);               
    const searchTerm = data.filter((item) => {
      return (
        item.ticketcode.toLowerCase().includes(value.toLowerCase()) ||
        item.controllerno.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(searchTerm);         
    setFilterdata(searchTerm);       
  };
  
  const reset = () => {
    setform({
      customername: "",
      controllerno: "",
      state: "",
      district: "",
      village: "",
      block: "",
      faultcode: "",
      complainttype: "",
      details: "",
      picture: "",
    });
    setEditing(null);
  };

  return (
    <>
      <Header />

      <div className="container mt-3">
        <div className="d-flex justify-content-between">
          <h3 className="fw-bold">Tickets</h3>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo" onClick={reset}>Add Ticket</button>
        </div>
        <div className="mt-3 container">
          <div className="rounded border shadow-sm bg-light">
            <div className="d-flex flex-wrap justify-content-between p-3 align-items-center gap-3">
              <div className="d-flex gap-3 align-items-center">
                <input
                  type="search"
                  className="form-control " style={{width:'280px'}}
                   placeholder="Search by TicketCode|Controller"
                  onChange={handleSearch}
                />
              </div>
 

              <div >
                <small>
                  <nav aria-label="Page navigation example" >
                    <ul className="pagination justify-content-center">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous" onClick={(e)=>{e.preventDefault(),prePage()}}>
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li> 
                      {pageNumber.map((n,i)=>(
                        <li key={i}  className={`page-item ${currentPage===n ? 'active' :""}`}>
                          <a href="" onClick={(e)=>{e.preventDefault(),changeCurrentPage(n)}} className="page-link">{n}</a>
                        </li>
                      ))} 
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next" onClick={(e)=>{e.preventDefault(),nextPage()}}>
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </small>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-4 container">
          <div className="row justify-content-start">
            {filterData.length === 0 && search !== "" ? (
              <div className="col-12 text-center">
                <h4>No tickets found</h4>
              </div>
            ) : (
              records.map((value, id) => (
                <div
                  key={id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div className="card shadow-sm h-100 rounded bg-light">
                    <div className="card-body">
                      <h5 className="card-title text-primary mb-3 fw-bold">
                        {value.ticketcode}
                      </h5>
                      <p className="card-text">
                        <strong>Customer Name:</strong> {value.customername}
                      </p>
                      <p className="card-text">
                        <strong>Controller No:</strong> {value.controllerno}
                      </p>
                      <p className="card-text">
                        <strong>Fault Code:</strong> {value.faultcode}
                      </p>
                      <p className="card-text">
                        <strong>State:</strong> {value.state}
                      </p>
                      <p className="card-text">
                        <strong>Complaint:</strong> {value.complainttype}
                      </p>
                      <p className="card-text">
                        <strong>Details:</strong> {value.details}
                      </p>
                    </div>

                    <div className="card-footer bg-light border-top-0">
                      <div
                        className="btn-group w-100"
                        role="group"
                        aria-label="Actions"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm w-100 mb-2 mb-sm-0"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => handleEdit(value)}
                        >
                          <i className="fa-regular fa-eye"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm w-100 w-100 mb-2 mb-sm-0"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleEdit(value)}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm w-100 w-100 mb-2 mb-sm-0"
                          onClick={() => handleDelete(value.ticketcode)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold " id="exampleModalLabel">
                {editing ? (
                  <>
                    Update Ticket :
                    <span className="text-primary mx-1">
                      {editing.ticketcode}
                    </span>
                  </>
                ) : (
                  "Raise Ticket"
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="customername" className="form-label">
                      Customer Name: *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customername"
                      placeholder="Enter Customer Name"
                      onChange={(e) =>
                        setform({ ...form, customername: e.target.value })
                      }
                      required
                      value={form.customername}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="controllerno" className="form-label">
                      Controller No: *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="controllerno"
                      placeholder="Enter Controller No"
                      onChange={(e) =>
                        setform({ ...form, controllerno: e.target.value })
                      }
                      required
                      value={form.controllerno}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="state" className="form-label">
                      State: *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      required
                      onChange={(e) =>
                        setform({ ...form, state: e.target.value })
                      }
                      placeholder="Enter State"
                      value={form.state}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="district" className="form-label">
                      District: *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      required
                      onChange={(e) =>
                        setform({ ...form, district: e.target.value })
                      }
                      placeholder="Enter District"
                      value={form.district}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="village" className="form-label">
                      Village:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="village"
                      onChange={(e) =>
                        setform({ ...form, village: e.target.value })
                      }
                      placeholder="Enter Village"
                      value={form.village}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="block" className="form-label">
                      Block:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="block"
                      placeholder="Enter Block"
                      value={form.block}
                      onChange={(e) =>
                        setform({ ...form, block: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="complainttype" className="form-label">
                      Complaint Type: *
                    </label>
                    <select
                      className="form-select"
                      id="complainttype"
                      value={form.complainttype}
                      required
                      onChange={(e) =>
                        setform({ ...form, complainttype: e.target.value })
                      }
                    >
                      <option value="">Select Complaint Type</option>
                      <option value="motor-not-running">
                        Motor Not Running
                      </option>
                      <option value="how-water-discharge">
                        How Water Discharge
                      </option>
                      <option value="external-system-damage">
                        External System Damage
                      </option>
                      <option value="controller-not-on">
                        Controller Not ON
                      </option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="faultcode" className="form-label">
                      Fault Code: *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="faultcode"
                      required
                      onChange={(e) =>
                        setform({ ...form, faultcode: e.target.value })
                      }
                      placeholder="Enter Fault Code"
                      value={form.faultcode}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="details" className="form-label">
                      Details:
                    </label>
                    <textarea
                      className="form-control"
                      id="details"
                      placeholder="Enter details about the issue"
                      onChange={(e) =>
                        setform({ ...form, details: e.target.value })
                      }
                      value={form.details}
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="picture" className="form-label">
                      Picture:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="picture"
                      value={form.picture}
                      onChange={(e) =>
                        setform({ ...form, picture: e.target.value })
                      }
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editing ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {editing ? (
                  <>
                    <span className="text-primary ">{editing.ticketcode}</span>

                    <span>
                      <small>
                        {" "}
                        <span>
                          (
                          {format(new Date(editing.created_at), "MMM dd, yyyy")}
                          )
                        </span>
                      </small>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-primary mx-1">{form.ticketcode}</span>
                  </>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card-body">
                <p className="card-text">
                  <strong>Customer Name:</strong>{" "}
                  {editing ? editing.customername : form.customername}
                </p>
                <p className="card-text">
                  <strong>Controller No:</strong>{" "}
                  {editing ? editing.controllerno : form.controllerno}
                </p>
                <p className="card-text">
                  <strong>Fault Code:</strong>{" "}
                  {editing ? editing.faultcode : form.faultcode}
                </p>
                <p className="card-text">
                  <strong>State:</strong> {editing ? editing.state : form.state}
                </p>
                <p className="card-text">
                  <strong>District:</strong>{" "}
                  {editing ? editing.district : form.district}
                </p>
                <p className="card-text">
                  <strong>Village:</strong>{" "}
                  {editing ? editing.village : form.village}
                </p>
                <p className="card-text">
                  <strong>Block:</strong> {editing ? editing.block : form.block}
                </p>
                <p className="card-text">
                  <strong>Complaint Type:</strong>{" "}
                  {editing ? editing.complainttype : form.complainttype}
                </p>
                <p className="card-text">
                  <strong>Details:</strong>{" "}
                  {editing ? editing.details : form.details}
                </p>

                {form.picture && (
                  <div className="mt-2">
                    <strong>Picture:</strong>
                    <img
                      src={form.picture}
                      alt="Ticket Image"
                      className="img-fluid mt-2"
                      style={{ maxHeight: "300px", objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
