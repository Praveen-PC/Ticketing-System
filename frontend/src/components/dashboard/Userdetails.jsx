import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import DataTable from "react-data-table-component";


const Userdetails = () => {
  const [data, setdata] = useState([]);
  const [searchTerm, setSearhTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [role,setrole]=useState("")

  const fetchUserDta = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getuser");
      setdata(response.data);
      setFilterData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDta();
  }, [role]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearhTerm(value);
    const filter = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())||
      item.phoneNo.toLowerCase().includes(value.toLowerCase())||
      item.role.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filter);
  };

  const handleDelete=async(id)=>{
    try{
        const response=await axios.delete(`http://localhost:8080/api/deleteuser/${id}`)
        console.log(response.data,"is deleted")
    }catch(error){
        console.log(error)
    }
  }
 const handleEdit=async(id,currentRole)=>{
    const newRole=currentRole==='admin'?'user':'admin'
    setrole(role)
    try{
        const response=await axios.put(`http://localhost:8080/api/updateuser/${id}`,{role:newRole})
        console.log(response.data)

    }catch(error){
        console.log(error)
    }
 }

const columns = [
    { name: "ID", sortable: true, selector: (row) => row.id, className: 'column-id' },
    { name: "Name", selector: (row) => row.name, className: 'column-name' },
    { name: "Number", selector: (row) => row.phoneNo, style: { minWidth: '150px', textAlign: 'center' }, className: 'column-phoneNo' },
    { name: "Role", selector: (row) => row.role, sortable: true, className: 'column-role' },
    { 
      name: "Change_Role", 
      cell: (row) => (
        <div className="">
          {row.role === 'admin' ?  
           <button className="btn btn-outline-success btn-sm" onClick={() => handleEdit(row.id,row.role)}>user</button> 
            : <button className="btn btn-outline-primary btn-sm"  onClick={() => handleEdit(row.id,row.role)}>admin</button>
          }</div>)
    },
    {
        name:'Action',
        cell:row=>(
            <button className="btn text-danger btn-sm border-0" onClick={() => handleDelete(row.id)}>
            <i className="fa-solid fa-trash"></i></button>)
    }
  ];
  
  

  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="d-flex justify-content-between gap-4">
          <h3 className="fw-bold">User_Details</h3>
          <input
            type="search"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search By Name | Number | Role"
          />
        </div>

        <div className="mt-3 ">
          <div className="border rounded p-2">
            <DataTable
              data={filterData}
              columns={columns}
              pagination
              
            ></DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdetails;
