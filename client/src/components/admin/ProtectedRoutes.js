import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'


export default function ProtectedRoutes({ Component }) {
const [loading,setloading]=useState(true)
const navigate=useNavigate()

    useEffect(()=>{
        checkAdmin()

    },[])

    const checkAdmin=async ()=>{
        const adtoken=cookie.get('adtoken')
        let data=await fetch('http://localhost:5000/verifyuser',
            {
                headers:{
                    'Authorization': `Bearer ${adtoken}`
                }
            })

            data=await data.json()

            if(data.st=="noToken")
                {
        navigate('/admin_login')

                }
                setloading(false)
    }

    if(loading)
        {
            return (<div>loading.......</div>)
        }
  return (
    <div>
      <Component></Component>
    </div>
  )
}
