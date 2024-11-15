import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
    const [phoneNo,setPhoneNo]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:8080/api/loginuser',{phoneNo,password})
            const token=response.data.token
            sessionStorage.setItem('authtoken',token)
            navigate('/dashboard')
            reset()
            console.log(response.data.token)
        }catch(error){
            console.log(error)
        }
    }
    const reset=()=>{
        setPassword('')
        setPhoneNo('')
    }
  return (
    <>
    <div className='container d-flex vh-100 justify-content-center align-items-center'>
        <form onSubmit={handleSubmit} className='p-5 shadow rounded bg-light'>
            <h3 className='text-center'>Login</h3>

            <div className='mb-3'>
                <label htmlFor="phoneNo" className='form-label'>PhoneNo</label>
                <input type="text" className='form-control' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} />
            </div>
            <div className='mb-3'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='d-flex justify-content-between'>
            <button  className='btn-info btn'>Submit</button>
            <Link to='/register' style={{textDecoration:'none'}} className='mt-1'>Register_Now?</Link>
            </div>
            

        </form>
    </div>
    </>
  )
}

export default Login