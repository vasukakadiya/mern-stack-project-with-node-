import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';


export default function AdminLayout() {

  return (
    <div className='row'>

        <div className=' col-3 col-sm-6 col-md-2'>
        <Sidebar></Sidebar>

        </div>
        <div className=' p-8 col-9 col-sm-6 col-md-10' style={{backgroundColor:'#eff1f3'}}>
         <main>
            
            <Outlet></Outlet>
         </main>
        </div>      
    </div>
  )
 }
