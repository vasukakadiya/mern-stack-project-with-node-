import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'
import { toast } from 'react-toastify';
import Loading from './Loading';





export default function Profile({handleLogout,isLogin}) {

  let token=cookie.get('token')
  let navigate= useNavigate()
  
  const [loading,setloading]=useState(true)

  const [name,setname]=useState()
  const [email,setemail]=useState()
  const [age,setage]=useState()

  const [address,setaddress]=useState()
  const [city,setcity]=useState()
  const [zip,setzip]=useState()
  const [state,setstate]=useState()
  const [contactno,setcontact]=useState()

useEffect(()=>{
 userdata()
},[])

let userdata =async (req,res)=>{

  let data= await fetch("http://localhost:5000/user",  {
    headers:{
        'Authorization': `Bearer ${token}`
    }}
)

data = await data.json()

if(data.st==="noToken")
  {
    navigate('/login')
    handleLogout()

    setloading(false)
  }
  else{
  
    setname(data[0].name)
    setemail(data[0].email)
    setcontact(data[0].contactno)
    setage(data[0].age)
    setaddress(data[0].address)
    setstate(data[0].state)
    setcity(data[0].city)
    setzip(data[0].zip)
    setloading(false)


  }
}

    let logout=()=>{
      
      handleLogout()
          cookie.remove('token');
        
    // localStorage.setItem('isauthenticated','false')


        navigate("/login")


        
       

    }

    let handleUpdate=async ()=>
    {
      let data= await fetch('http://localhost:5000/updateuser',{
        method:'post',
        body:JSON.stringify({name,age,address,city,state,zip}),
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      data=await data.json()

      if(data.modifiedCount===1)
        {

          userdata()
          toast.success('Profile has been updated...')
        }

    }
    if(loading)
      {
        return <Loading></Loading>
      }
  return (
    <>
    <div style={{ paddingTop: "3px" }}>
      
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container ">
          <div className="row justify-content-center ">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-12">
              <div className="card border-dark shadow-sm rounded-4 shadow-sm ">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h3">Profile</h2>
                        
                      </div>
                    </div>
                  </div>
                  
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-md-6 text-start">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          name="name"
                          value={name}
                          onChange={(e)=>setname(e.target.value)}
                          
                          
                        />
                        <div className="text-danger fs-6"></div>
                      </div>

                      <div className="col-md-6 text-start">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control disabled"
                          placeholder="test@gmail.com"
                          name="email"
                          readOnly
                          value={email}
                          
                        />
                      </div>
                     
                      <div className="col-md-6 text-start   ">
                        <label className="form-label">Age</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="age"
                          name="age"
                          value={age}
                          onChange={(e)=>setage(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6 text-start">
                        <label className="form-label">Contact No</label>
                        <input type="Number" className="form-control" value={contactno}   name="contactno"  readOnly/>

                      </div>

                      <div className="col-md-12 text-start">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="123,abc"
                          name="address"
                          value={address}
                          onChange={(e)=>setaddress(e.target.value)}
                        />
                      </div>

                      <div className="col-md-4 text-start mt-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          name="city"
                          value={city}
                          onChange={(e)=>setcity(e.target.value)}
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
                         value={state}
                         onChange={(e)=>setstate(e.target.value)}
                        />
                      </div>

                      <div className="col-md-4 text-start mt-3">
                        <label className="form-label">Zip</label>
                        <input 
                          type="text"
                          className="form-control"
                          placeholder="Pin Code"
                          value={zip}
                          name="zip"
                          onChange={(e)=>setzip(e.target.value)}
                        />
                      </div>

                      

                  
                      <div className=" mt-4">
                        <div className=" d-flex justify-content-between">
                          <button
                           onClick={()=>{handleUpdate()}}
                            className="btn btn-dark btn-lg col-md-3"
                            type="submit"
                          >
                            Update
                          </button>

                          <button
                            onClick={()=>logout()}
                            className="btn btn-dark btn-lg col-md-3"
                            type="submit"
                          >
                            Logout
                          </button>
                        </div>
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
