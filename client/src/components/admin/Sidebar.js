import React from 'react'
import './Sidebar.css';
import cookie from 'js-cookie'

import { Link,  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Sidebar() {
  let navigate =useNavigate()
  let adtoken =cookie.get('adtoken')

  const logout=()=>{
    cookie.remove('adtoken')
    toast.success("loged out successfully")
    navigate('/admin_login')
  }
  return (
    <nav className="sidebar">
      <p className="sidebar-brand" >PharmaNetics</p>
      <ul className="sidebar-nav">
        <li className="sidebar-item ">
          <Link className="sidebar-link " to="/admin/">
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/admin/users">
            <i className="bi bi-people"></i>
            <span>Users</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/admin/products">
            <i className="bi bi-box-seam"></i>
            <span>Products</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/admin/addproduct">
            <i className="bi bi-plus-circle"></i>
            <span>Add Product   </span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/admin/category">
            <i className="bi bi-tags"></i>
            <span>Categories</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/admin/orders">
            <i className="bi bi-cart"></i>
            <span>Orders</span>
          </Link>
        </li>
        <li className="sidebar-item" style={{width:'180px'}}>
          <p className="sidebar-link" onClick={logout}>
            <i className="bi bi-box-arrow-right"></i>
            <span >Logout</span>
          </p>
        </li>
      </ul>
    </nav>
  )
}
