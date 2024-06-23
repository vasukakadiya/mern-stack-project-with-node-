import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/user/Navbar'
import Footer from '../components/user/Footer'

export default function UserLayout({isLogin}) {
  console.log(isLogin)
  return (
    <div>
        <Navbar isLogin={isLogin}></Navbar>
        <main>
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
      
    </div>
  )
}
