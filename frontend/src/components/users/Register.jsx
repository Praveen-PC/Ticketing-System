import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from '../dashboard/Header'



const Register = () => {
    const [name,setname]=useState('')
    const [phoneNo,setPhoneNo]=useState('')
    const [password,setPassword]=useState('')
    const role='admin'
    const Navigate=useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:8080/api/adduser',{name,phoneNo,password})
            console.log(response.data)
            Navigate('/')
            reset()
        }catch(error){
            console.log("Error while Inserting",error)
        }
    }
    const reset=()=>{
        setname('')
        setPassword('')
        setPhoneNo('')
    }
  return (
    <>
    <Header/>
      <div className='container d-flex justify-content-center align-items-center vh-100 '>
        
    <form className='rounded shadow p-5 bg-light' onSubmit={handleSubmit}>
        <h2 className='text-center'>Register</h2>
            <div className='mb-3'>
                <label htmlFor="name" className='form-label'>Name</label>
                <input className='form-control' type="text"  value={name} onChange={(e)=>setname(e.target.value)} required />
            </div>
            <div className='mb-3'>
                <label htmlFor="phoneNo" className='form-label'>PhoneNo</label>
                <input className='form-control' type="text" value={phoneNo}  onChange={(e)=>setPhoneNo(e.target.value)} required/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input className='form-control' type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <button className='btn btn-info'>Register</button>
        </form>
    </div>
    </>
  )
}

export default Register