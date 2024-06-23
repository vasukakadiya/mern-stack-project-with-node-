import React, { useContext, useEffect } from 'react'
import react, { useState } from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import cookie from 'js-cookie'
import Loading from './Loading';




export default function Login({ handleLogin,isLogin }) {

    const [uemail,setEmail]=useState("");
    const [upassword,setPassword]=useState("");
    const [loading,setloading]=useState(true);


    const navigate=useNavigate()
    
useEffect(()=>{

  const token = cookie.get('token')
 
 
  checkUser(token)

  
},[])
const checkUser=async (token)=>{
  //const token = localStorage.getItem('token');

  let data=await fetch('http://localhost:5000/verifyuser',
  {
      headers:{
          'Authorization': `Bearer ${token}`
      }
  })

  data =await data.json()

  if(data.st=="noToken")
    {
      setTimeout(()=>{
        setloading(false)

      },1000)
      
    }
    else{
 setloading(false)
   
      navigate("/")
    
     
    }
}
  
    const loginuser=async(e)=>{
      e.preventDefault()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^[a-zA-Z\d]{2,}$/;
      
      if (!emailRegex.test(uemail)) {
        toast.error('Please enter a valid email address.');
       
      } else{

     
      let result=await fetch('http://localhost:5000/login',{
      method:"POST",
      body:JSON.stringify({uemail,upassword}),
      headers:{
        "Content-Type":"application/json",
        
      },
    });
        result=await result.json();

        if(result.status=="success")
        {
          const expires = new Date(Date.now() + result.exp * 60 * 1000);

          localStorage.setItem("token",result.token)
          localStorage.setItem("isl",true)
          cookie.set('token',result.token,{expires})

         
    // localStorage.setItem('isauthenticated','true')
     handleLogin() 
      

         
                toast.success("Log in successfully....")
         
         navigate("/medicine")

      
        }
        else
        {
          toast.error(result.msg)
          // console.log(result.msg)
          
        }
  
      }
    }

    if(loading)
      {
        return <Loading></Loading>
      }
  return (
    <>
    
    <div style={{paddingTop:'1px'}}>
      <section className=" p-3 p-md-4 p-xl-5">
  <div className="container">
  
    <div className="row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
        <div className="card border-0 shadow-sm rounded-4 shadow-sm">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="row">
              <div className="col-12">
                <div className="mb-5">
                  <h2 className="h3">Log in</h2>
                  <h3 className="fs-6 fw-normal text-secondary m-0">Enter your details to Log in</h3>
                </div>
              </div>
            </div>
          
            <form onSubmit={loginuser}>
              <div className="row gy-3 overflow-hidden">
                
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required value={uemail} onChange={(e)=>setEmail(e.target.value)}/>
                    <label for="email" className="form-label">Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" name="password" id="password"  placeholder="Password" required value={upassword} onChange={(e)=>setPassword(e.target.value)}/>
                    <label for="password" className="form-label">Password</label>
                  </div>
                </div>
                <div className="col-12">
                  
                    <label className="form-check-label text-secondary" for="iAgree">
                      I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a> By Signing up.
                    </label>
                  </div>
               
                
               
                 <div className="col-12">
                        <div className="d-grid">
                          <button type="submit"  className="btn btn-dark btn-lg" >Log in</button>
                        </div>
                      </div>
                     
              </div>
              </form>
          
            <div className="row">
              <div className="col-12">
                <hr className="mt-5 mb-4 border-secondary-subtle"/>
                <p className="m-0 text-secondary text-center">Dont't have an account? <Link to="/register" className="link-primary text-decoration-none">Register</Link></p>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>
</div>
</>
  )
}
