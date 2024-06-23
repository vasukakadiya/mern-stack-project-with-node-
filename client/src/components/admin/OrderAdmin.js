
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'
import { toast } from 'react-toastify';



const OrderAdmin = () => {
    const [orders,setOrder]=useState([])
    const [filtered,setfiltered]=useState([])

    const [status,setStatus]=useState()
    const [ready,setready]=useState(true)
    const [selected,setselected]=useState("pending")



//   const [isLogin,setIsLogin]=useState(true)
  const navigate=useNavigate()
  const adtoken=cookie.get("adtoken")




    useEffect(()=>{
        getdata()
        setready(false)

    },[])

    useEffect(()=>{

        let filterDta=orders.filter((item)=>item.ostatus==selected)
        setfiltered(filterDta)
        

    },[selected,orders])

    const getdata=async (req,res)=>{
        let data=await fetch("http://localhost:5000/api/orderdata",
            {
                headers:{
                    'Authorization': `Bearer ${adtoken}`
                }
            }
        )

        data=await data.json()
        

        if(data.st=="noToken")
            {
                navigate("/admin_login")
            }else
            {
                setOrder(data)
                setfiltered(data)
                // console.log(data)
                setready(false)

            }
       
    }

    const updateStatus=async (orderid,status)=>{

        let data=await fetch('http://localhost:5000/updatestatus',{
            method:"post",
            body:JSON.stringify({orderid,status}),
            headers:{
                "Content-Type":"application/json"
            }

          

        })
        data=await data.json()
        if(data.modifiedCount==true)
            {
                toast.success('status changes successfully')
                getdata()
                
            }
            else{
                toast.error("no change detacted..")
            }
    }
  

   

    if(ready)
        {
            return null
        }

    return (
      <div className="container mt-4">
            <h2>Orders</h2>
            <div className="mb-3">
                
                <select id="statusFilter" className="form-select" onChange={(e)=>setselected(e.target.value)} >
               
                    <option selected value="pending">Pending</option>
                    <option value="shipped">shipped</option>
                    <option value="dispatch">dispatch</option>
                    <option value="delivered">delivered</option>
                    <option value="completed">complete</option>


                 
                </select>
            </div>
            {filtered.map(order => (
                <div className="card mb-3 shadow" key={order._id}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-3">
                                <strong>ORDER PLACED</strong><br />
                                {new Date(order.odate).toLocaleString()}
                            </div>
                            <div className="col-md-3">
                                <strong>TOTAL</strong><br />
                                ₹{order.amount}
                            </div>
                            <div className="col-md-3">
                                <strong>SHIP TO</strong><br />
                                {order.userid.name}
                            </div>
                            <div className="col-md-3">
                                <strong>ORDER # {order._id}</strong><br />
                               
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className='row'>
                       
                        <div className='col-md-9'>
                        {order.product.map((item, index) => (
                          <div className="row mb-3" key={index}>
                          { item.productid!=null && <div className="col-md-2">
                                    <img src={`http://localhost:5000/upload/${item.productid.img}`}   alt={item.productid.name} className="img-fluid" />
                                </div>}
                                <div className="col-md-3 text-center">
                                { item.productid!=null && <h5>{item.productid.name}</h5>}
                                    <p>
                                      
                                    </p>
                                </div>
                                <div className="col-md-3 text-center">
                                { item.productid!=null &&  <p>Qty. : {item.quantity}</p>}
                                </div>
                                <div className="col-md-3 text-center">
                                { item.productid!=null &&     <p>price. : ₹{item.productid.price}</p>}
                                </div>

                               
                                {/* <hr></hr> */}
                                
                            </div>
                            
                        ))}
                        </div>
                        <div className='col-md-3'>
                        <select className="form-select" onChange={(e)=>setStatus(e.target.value)}  id={order._id}>
                <option value="">Status</option>
                <option selected={order.ostatus=="pending"?"selected":""} value="pending">pending</option>

                <option selected={order.ostatus=="shipped"?"selected":""} value="shipped">shipped</option>
                <option selected={order.ostatus=="dispatch"?"selected":""} value="dispatch">dispatch</option>

                <option selected={order.ostatus=="delivered"?"selected":""} value="delivered">delivered</option>

                <option selected={order.ostatus=="completed"?"selected":""} value="completed">completed</option>


               
            </select>
            <button className='btn btn-warning mt-2' onClick={()=>{updateStatus(order._id,status)}}>Save Change</button>
                        </div>
                    </div>
                    </div>
                    <div className="card-footer">
            <div className="row">
     
              <div className='col-md-4'>
                <strong>Shipping Details</strong>
                <p>address : {order.userid.address}</p>
            
              </div>
              <div className='col-md-4'>
                <strong>User Details</strong>
                <table className='table table-borderless table-sm text-start ml-5 fs-6'>
                                        <tr>
                                        <td>Phone No  : </td><td>{order.userid.contactno}</td>
                                        </tr>
                                        <tr>
                                        <td>Email     :</td><td>{order.userid.email}</td>
                                        </tr>
                                        {/* <tr>
                                        <td>Address   :</td><td> {order.userid.address}</td>
                                        </tr> */}
                                        
                                        </table>
      

              </div>
              <div className='col-md-4'>
                <strong>Payment Details</strong>
            <table className='table table-borderless table-sm text-start  fs-6'>
            <tr>
                                        <td>Payment Id: </td><td>{order.paymentid}</td>
                                        </tr>
                                        <tr>
                                        <td >payment status</td><td> <button className='btn bg-success btn-sm '>{order.status}</button></td>
                                        </tr>
            </table>
              


              </div>
            

            </div>
          </div>
                </div>
            ))}
        </div>
    );
};

export default OrderAdmin;