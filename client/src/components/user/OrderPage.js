import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import cookie from 'js-cookie'
import Loading from './Loading';

export default function OrderPage({handleLogout}) {
    const [orders,setOrder]=useState([])
    const [filteredorder,setfilteredorder]=useState([])

    const [isLogin,setIsLogin]=useState(false)
    const [loading,setloading]=useState(true)
  
    const navigate=useNavigate()
    const [visibleOrderId, setVisibleOrderId] = useState(null);
    const [trackOrderId, setTrackOrderId] = useState(null);
    const [track,setTrack]=useState()
    const [selected,setSelected]=useState('')

  
  
  
      let token=cookie.get("token")
      const [show, setShow] = useState(false);
      const [item, setItem] = useState('Item Name');
    
      const handleClose = () => setShow(false);
      const handleShow = (ID) => {
        setItem(ID)
        setShow(true)
      }
    
      const handleDelete = () => {
        deleteOrder(item)
        handleClose();
      };
  
      useEffect(()=>{
        setTimeout(()=>{
            getdata()

          },1500)
          
          
      },[])

      useEffect(()=>{
        if(selected==='completed')
          {
           
            let filterData=orders.filter((item)=>item.ostatus==="completed")
            setfilteredorder(filterData)
          }
          else {
            let filterData=orders.filter((item)=>item.ostatus!="completed")
            setfilteredorder(filterData)
          }
      
      },[selected])

      useEffect(()=>{
        let filterData=orders.filter((item)=>item.ostatus!="completed")
        setfilteredorder(filterData)
      },[orders])
  
  
      const toggleDetails = (orderId) => {
          setVisibleOrderId(visibleOrderId === orderId ? null : orderId);
  
      };
  
      const tracktoggleDetails = (orderId,status) => {
        if(status==="pending")
          {
            setTrack("2%")
          }
          else if(status==="shipped")
            {
              setTrack("25%")
  
            }
            else if(status==="dispatch")
              {
                setTrack("66%")
  
              }
              else if(status==="delivered")
                {
                  setTrack("100%")
  
                }
      
          setTrackOrderId(trackOrderId === orderId ? null : orderId);
  
      };
      const getdata=async (req,res)=>{
          let data=await fetch("http://localhost:5000/orderdata",
              {
                  headers:{
                      'Authorization': `Bearer ${token}`
                  }
              }
          )
  
          data=await data.json()
         
  
          if(data.st=="noToken")
              {
                  setIsLogin(true)
                setloading(false)
  
                  handleLogout()
              }else
              {
                  setOrder(data)
                  setfilteredorder(data)
               
                setloading(false)

              }
         
      }
  
      const deleteOrder=async (id)=>{
          // console.log("okkk")
          let data=await fetch(`http://localhost:5000/orderdelete/${id}`,{
            method:"delete",
            headers:{
              'Authorization': `Bearer ${token}`
          }
          })
          data =await data.json()
      
          if(data.deletedCount==1)
            {
              toast.success("Your order has been canceled...")
              getdata()
            }
      
        }
    if(loading)
      {
        return <Loading></Loading>;
      }
  
      if (isLogin) {
          return (
            <div className=' justify-content-center ' style={{marginTop:"200px",marginBottom:'200px'}}>
              <p>Please login first to view your orders.</p>
              <button  className="btn btn-dark"onClick={() => navigate('/login')}>Login</button>
            </div>
          );
        }
  
  return (

    <div className="m-4">
            <h2>Your Order</h2>
            <div className="mb-3">
                
                <select id="statusFilter" className="form-select" onChange={(e)=>setSelected(e.target.value)} >
                    <option value="recent">Recent Orders</option>
                    <option value="completed">completed</option>
                 
                </select>
            </div>
            {filteredorder.length===0?
            <div className='fs-3' style={{marginTop:'200px',marginBottom:'150px'}}>No Orders</div>
            
            :filteredorder.map(order => (
                <div className="card mb-5  border-dark border-1" key={order._id}>
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
                                <button className='btn btn-success btn-sm' onClick={() => toggleDetails(order._id)}>Paid</button>
                            </div>
                        </div>
                    </div>
                        <div className="card-body" style={{backgroundColor:'#eff1f3'}}>
                    <section className="h-50 gradient-custom text-dark">
  <div className="container py-2 h-50">
    <div className="row d-flex justify-content-center align-items-center h-50">
      <div className="col-lg-10 col-xl-12">
        <div className="card border-2" >
          {/* <div className="card-header px-4 py-3">
            <h5 className="text-muted mb-0">Thanks for your Order, <span >{order.userid.name}</span>!</h5>
          </div> */}
          <div className="card-body p-4" style={{backgroundColor:'#eff1f3'}}>
            <div className="d-flex justify-content-between align-items-center mb-2">
<p className="lead fw-normal mb-0">Details</p>
              <p className="small text-muted mb-0">Invoice : {order.orderid}</p>
            </div>
            {order.product.map((item,index)=>
            
            <div className="card shadow-0 border-0 mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-1">
                    <img src={`http://localhost:5000/upload/${item.productid.img}`} 
                      className="img-fluid"/>
                  </div>
                  <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0"><strong>{item.productid.name}</strong></p>
                  </div>
                  {/* <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">White</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Capacity: 64GB</p>
                  </div> */}
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">₹{item.productid.price}</p>
                  </div>
                </div>
                
              </div>
            </div>
            )}
           

            <div className="d-flex justify-content-between pt-2">
              <p className="fw-bold mb-0">Order Details</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> ₹{order.amount}</p>
            </div>

            <div className="d-flex justify-content-between pt-2">
              <p className="text-muted mb-0">Email : {order.userid.email}</p>
              {/* <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> $19.00</p> */}
            </div>

            <div className="d-flex justify-content-between">
              <p className="text-muted mb-0">Contact No : {order.userid.contactno}</p>
              {/* <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 123</p> */}
            </div>

            <div className="d-flex justify-content-between mb-1">
              <p className="text-muted mb-0">Address : {order.address},{order.state},{order.zip}</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
            </div>
          </div>
          <div className="card-footer border-5 px-3 py-3"
           >
            <h5 className="d-flex align-items-center justify-content-end  text-uppercase mb-0 text-dark">Total
              paid: <span className="h2 mb-0 ms-2 text-dark">₹{order.amount}</span></h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

                    </div>
                   
                    {trackOrderId === order._id && (
                      
                        <div className="row d-flex align-items-center container m-5">
                        <div className="col-md-2">
                          <p className="text-muted mb-0 small">Track Order</p>
                        </div>
                        <div className="col-md-10">
                          <div className="progress">
                            <div className="progress-bar" role="progressbar"  style={{width:`${track}`,borderRadius:'16px',backgroundColor:'#00dc00'}} 
                              aria-valuenow="20"
                              aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <div className="d-flex justify-content-around mb-1">
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">shipped</p>

                            <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                            <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                          </div>
                        </div>
                      </div>
                    )}
                 {order.ostatus!="completed"  &&   <div className="card-footer">
            <div className="d-flex justify-content-between">
       
          
              <button className="btn btn-outline-danger" onClick={() => tracktoggleDetails(order._id,order.ostatus)}>Track Order</button>
              <button className="btn btn-outline-danger" onClick={()=>handleShow(order._id)}>Cancel Order</button>
            </div>
          </div>}
                </div>
            ))}

            <Modal show={show} onHide={handleClose}  centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            {/* <i className="fas fa-exclamation-triangle text-danger me-2"></i> */}
            Cancel Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <i className="fas fa-exclamation-triangle text-danger mb-3" style={{ fontSize: '2rem' }}></i>
          <p>Are you sure you want to cancel ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="d-flex align-items-center">
            <i className="fas fa-times-circle me-2"></i> Cancel
          </Button>
          <Button variant="danger" onClick={()=>handleDelete()} className="d-flex align-items-center">
            <i className="fas fa-check-circle me-2"></i> Delete
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

  )
}
