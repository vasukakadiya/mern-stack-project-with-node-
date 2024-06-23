import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'

export default function Dashboard () {
  const [analytics,setanalytics]=useState()
  const [loading,setloading]=useState(true)

  
  const adtoken=cookie.get("adtoken")
  const navigate=useNavigate()
  

  useEffect(()=>{
    dashboardData()
  },[])
  const dashboardData=async (req,res)=>{

    let data= await fetch("http://localhost:5000/dashboarddata",{
        headers:{
          'Authorization': `Bearer ${adtoken}`
      }
      })

    data=await data.json()

    if(data.st=="noToken")
        {
            navigate("/admin_login")
        }else {
            setanalytics(data)
            // console.log(analytics);
            setloading(false)

        }
}
    
        const cardStyle = (bgColor) => ({
          backgroundColor: bgColor,
          borderColor: '#ddd',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#fff'
        });
      
        const iconStyle = {
          marginRight: '10px',
          fontSize: '1.5em',
          verticalAlign: 'middle'
        };
      
        const titleStyle = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        };

        if(loading)
          {
            return null
          }
  return (
    <div className="container" >
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <div style={cardStyle('#007bff')}>
            <h5 className="card-title" style={titleStyle}>
              <i className="bi bi-people" style={iconStyle}></i>
              Total Users
            </h5>
            <p className="card-text">{analytics.totalUsers}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div style={cardStyle('#28a745')}>
            <h5 className="card-title" style={titleStyle}>
              <i className="bi bi-box-seam" style={iconStyle}></i>
              Total Products
            </h5>
            <p className="card-text">{analytics.totalProduct}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div style={cardStyle('#ffc107')}>
            <h5 className="card-title" style={titleStyle}>
              <i className="bi bi-tags" style={iconStyle}></i>
              Categories
            </h5>
            <p className="card-text">{analytics.totalCat}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div style={cardStyle('#17a2b8')}>
            <h5 className="card-title" style={titleStyle}>
              <i className="bi bi-cart" style={iconStyle}></i>
              Total Orders
            </h5>
            <p className="card-text">{analytics.totalOrder}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div style={cardStyle('#fd7e14')}>
            <h5 className="card-title" style={titleStyle}>
              <i className="bi bi-clock-history" style={iconStyle}></i>
              Pending Orders
            </h5>
            <p className="card-text">{analytics.totalPending}</p>
          </div>
        </div>
       
        
      </div>
    </div>
  )
}
