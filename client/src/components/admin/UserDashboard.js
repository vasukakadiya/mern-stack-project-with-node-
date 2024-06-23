import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';


export default function UserDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState([])
  const navigate=useNavigate()
    const adtoken=cookie.get("adtoken")

    

useEffect(()=>{
getData()
},[])
  
    const getData=async()=>{
      let data=await fetch('http://localhost:5000/userdata',{
        headers:{
            'Authorization': `Bearer ${adtoken}`
        }
      })

      data=await data.json()
if(data.st=="noToken")
  {
    navigate("/admin_login")
  }else
  {
    setUser(data)

  }


    }

  const filteredUsers = user.filter(users =>
    users.email.toLowerCase().includes(searchTerm.toLowerCase()) || users.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>

  <div className="card mb-5 border-dark rounded-5 shadow ">
                <div className="card-body">
                   
                  
                    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search User By Email..."
        value={searchTerm}
        className='shadow'
        onChange={e => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
    </div>
                   
                    <table className="table table-striped shadow rounded mt-3">
                     
                        <thead >
                            <tr className='rounded'>
                                <th style={{backgroundColor:"black",color:"white"}} className=''>#</th>
                                <th style={{backgroundColor:"black",color:"white"}} className=''>Name</th>
                                <th style={{backgroundColor:"black",color:"white"}}>Email</th>
                                <th style={{backgroundColor:"black",color:"white"}}>Contact No</th>
                                <th style={{backgroundColor:"black",color:"white"}}>address</th>
                                <th style={{backgroundColor:"black",color:"white"}}>city</th>
                                <th style={{backgroundColor:"black",color:"white"}}>zip</th>
                                <th style={{backgroundColor:"black",color:"white"}}>age</th>
                                <th style={{backgroundColor:"black",color:"white"}}>gender</th>





                            </tr>
                        </thead>
                       
                        <tbody>
                            
                            {filteredUsers.map((item,index)=>
                              <tr>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contactno}</td>
                                <td>{item.address}</td>
                                <td>{item.city}</td>
                                <td>{item.zip}</td>
                                <td>{item.age}</td>
                                <td>{item.gender}</td>



                            </tr>
                            )}
                           
                      
                        </tbody>
               
                    </table>
                
                </div>
            </div>
  </>
  )
}


const styles = {
 
  searchContainer: {
    marginBottom: '15px',
  },
  searchInput: {
    width: '100%',
    borderRadius: '30px',
    padding: '10px 20px',
    border: '1px solid #ced4da',
  },
 
  
};