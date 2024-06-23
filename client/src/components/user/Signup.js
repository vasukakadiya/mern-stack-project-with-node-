import React, { useEffect } from "react";
import react, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Navbar from "./Navbar";
import Footer from "./Footer";
import cookie from 'js-cookie'

export default function Signup() {
 const[user,setUser]=useState({
  name:String,
  email:String,
  password:String,
  contactno:Number,
  address:String,
  city:String,
  state:String,
  zip:Number,
  gender:String


 })
 let navigate=useNavigate()
let name,value;

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
     
      
    }
    else{
    
      navigate("/")
    
     
    }
}

 const onInputChange=(e)=>{
  name=e.target.name
  value=e.target.value
    setUser({...user,[name]:value})
    
 }


  const handleData = async (e) => {
    e.preventDefault()
    // if(!user.name && !user.password && !user.email && !user.contactno && !user.address && !user.city && !user.state && !user.zip )
      // {
        let result = await fetch("http://localhost:5000/signup", {
          method: "POST",
           body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
       
        result = await result.json();
        if(result.status==="exists")
          {
            toast.error("This email is already exists....")
    
          }else if(result.status==="success")
            {
              toast.success("Register successfully")
              navigate("/login")
    
            }else if(result.status==="error")
              {
                toast.error('something went wrong...')
    
              }
      // }
      // else{
        // toast.error("please fill up the form correctly")
      // }
    
        
    
  };

  return (
    <>
    
    <div style={{ paddingTop: "10px" }}>
      
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container ">
          <div className="row justify-content-center ">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border-0 shadow-sm rounded-4 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h3">Registration</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter your details to register
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form  onSubmit={handleData}>
                  
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-md-12 text-start">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          name="name"
                          value={user.name}
                          onChange={onInputChange}
                          required
                          
                        />
                        <div className="text-danger fs-6"></div>
                      </div>

                      <div className="col-md-12 text-start">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="test@gmail.com"
                          name="email"
                          value={user.email}
                          onChange={onInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-12 text-start">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={user.password}
                          onChange={onInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-12 text-start">
                        <label className="form-label">Contact No</label>
                        <input type="Number" className="form-control" value={user.contactno} required  name="contactno" onChange={onInputChange} />
                      </div>

                      <div className="col-md-12 text-start">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="123,abc"
                          name="address"
                          value={user.address}
                          onChange={onInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 text-start mt-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          name="city"
                          value={user.city}
                          onChange={onInputChange}
                          required
                        />
                        <span></span>
                      </div>

                      <div className="col-md-4 text-start mt-3  ">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="State"
                          name="state"
                          value={user.state}
                          onChange={onInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 text-start mt-3">
                        <label className="form-label">Zip</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="Pin Code"
                          value={user.zip}
                          name="zip"
                          onChange={onInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 text-start   ">
                        <label className="form-label">Age</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="age"
                          name="age"
                          value={user.age}
                          onChange={onInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 text-start ml-4 border">
                        <label className="form-label">Gender</label>
                        <br></br>
                        <div className="form-check form-check-inline mt-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="inlineRadio1"
                            value="Male"
                            onChange={onInputChange}
                            required
                            
                          />
                          <label className="form-check-label" for="inlineRadio1">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline mt-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="inlineRadio2"
                            value="Female"
                            onChange={onInputChange}
                            required
                          />
                          <label className="form-check-label" for="inlineRadio2">
                            Female
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        {/* <h1>{user.gender}</h1> */}
                        <label
                          className="form-check-label text-secondary"
                          for="iAgree"
                        >
                          I agree to the{" "}
                          <a
                            href="#!"
                            className="link-primary text-decoration-none"
                          >
                            terms and conditions
                          </a>{" "}
                          By Signing up.
                        </label>
                      </div>

                      {/* <div className="col-12">
                  <div className="d-grid">
                    <button className="btn bsb-btn-2xl btn-primary" type="submit">Sign up</button>
                  </div>
                </div> */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                           
                            className="btn btn-dark btn-lg"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-center">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="link-primary text-decoration-none"
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
    </>
  );
}
