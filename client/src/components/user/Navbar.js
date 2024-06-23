import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import cookie from 'js-cookie'





export default function Navbar({ isLogin }) {
  const navigate=useNavigate();
const [check,setcheck]=useState(false)
  // const [isAuthenticated,setIsAuthenticated]=useContext(AuhContext)
// console.log("new",isLogin)

let auth=cookie.get("token")


useEffect(()=>{
  if(auth)
    {
  setcheck(true)
    }else {
      setcheck(false)
    }
},[])
  return (
    <div>
      
      <div className='shadow'>
      <nav className="navbar navbar-expand-lg  bg-dark navbar-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand ml-5" to="/">PharmaNetics</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      {/* <form className="form-inline my-2 my-lg-0 ml-5">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-dark my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
            </form> */}
            
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/cart" className="nav-link text-light"><i className="fas fa-shopping-cart"> Cart</i></Link>
                </li>
                <li className="nav-item">
                    <Link to="/order" className="nav-link text-light"><i className="fas fa-shopping-bag"> Orders</i></Link>
                </li>
                
                {isLogin ? (
                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-light" ><i className="fas fa-user"> Profile</i></Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-light" ><i className="fas fa-sign-in-alt"></i> Login</Link>
                </li>
              )}
            </ul>

    </div>
  </div>
</nav>


<ul className="nav justify-content-center" style={{backgroundColor:'#eff1f3'}}>
  <li className="nav-item text-dark">
    <Link to="/medicine" className="nav-link active text-dark" aria-current="page" >Medicine</Link>
  </li>
  <li className="nav-item text-dark">
    <Link  to="/wellness" className="nav-link text-dark" >Wellness</Link>
  </li>
  <li className="nav-item text-dark">
    <Link className="nav-link text-dark" to="personal-care">Personal-care</Link>
  </li>
 
</ul>
    </div>

    </div>
  )
}
