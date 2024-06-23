import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { toast } from 'react-toastify';
import cookie from 'js-cookie'
import Loading from './Loading';



export default function Cart({handleLogout}) {
    const [cartdata,setcartdata]=useState([])
    const [address,setaddress]=useState()
    const [city,setcity]=useState()
    const [pincode,setpincode]=useState()
    const [state,setstate]=useState()
    const [contactno,setcontact]=useState()




    const [isLogin,setIsLogin]=useState(false)
    const [loading, setLoading] = useState(true);
    const today = new Date(Date.now());
    const day=today.getDate()
    const month=today.getMonth()
    const year=today.getFullYear()

    const [show, setShow] = useState(false);
    const [item, setItem] = useState('Item Name');
  
    const handleClose = () => setShow(false);
    const handleShow = (ID) => {
      setItem(ID)
      setShow(true)
    }
  
    const handleDelete = () => {
      deleteCart(item)
      handleClose();
    };
  
    
  
    const nextweek= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const nextday=nextweek.getDate()
    const nextmonth=nextweek.getMonth()
    const nextyear=nextweek.getFullYear()
  
  
    let token=cookie.get("token")
    let navigate=useNavigate()
  
    useEffect(()=>{
      setTimeout(()=>{
      getcartdata()
  
      },1500)
    },[])
  
    const getcartdata=async ()=>{
      let data=await fetch('http://localhost:5000/cartdata',
      {
          headers:{
              'Authorization': `Bearer ${token}`
          }
      })
  
      data =await data.json()
  
      if(data.st=="noToken")
        {
          setIsLogin(true)
          //cookie.remove('token')
          handleLogout()
          //navigate("/login")
        }
        else
        {
          setcartdata(data.data)
          setaddress(data.address[0].address)
          setcity(data.address[0].city)
          setpincode(data.address[0].zip)
          setstate(data.address[0].state)
          setcontact(data.address[0].contactno)

          setLoading(false)
          // console.log(data)
          

        }
  
      
    }
  
    const handleQuantity= async (id,newQuantity)=>{

 
      if(newQuantity<=0)
        {
          toast.error("Quantity can not be negative")
        }
        else{
          let data=await fetch('http://localhost:5000/qty',{
            method:"post",
            body:JSON.stringify({id:id,quantity:newQuantity}),
            headers:{
              'Content-Type':'application/json'
            }

          })
          data=await data.json()

          if(data.modifiedCount===1)
            {
              getcartdata()
            }
        }
             

 
  
  
    //setcartdata(updatedCartData);
    
      
    }
  
    const totalCount=()=>{
      let total=0
     
      cartdata.map((item)=>
        total+=item.pid.price*item.quantity
      )
      // console.log('yyy'+total)
      return total
    }
    const checkout=async ()=>{
      let productData=cartdata.map(item=>
        
          ({productid:item.pid,
            quantity:item.quantity
          })
      )
      let data=await fetch('http://localhost:5000/order',{
        method:"post",
        body:JSON.stringify({amount:totalCount()}),
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      data=await data.json()
      // console.log(data)
     
      const options = {
        key: process.env.REACT_APP_RZP_kEY, 
        amount: data.amount, 
        currency: data.currency,
        name: 'PharmaNetics',
        description: 'Test Transaction',
        image: 'http://localhost:5000/upload/logo.png',
        order_id: data.id,
        handler:async (response) => {
          
  
          const paymentData={
       
            orderid:response.razorpay_order_id,
            paymentid:response.razorpay_payment_id,
            signature:response.razorpay_signature,
            product:productData,
            amount:totalCount(),
            address:address,
            city:city,
            state:state,
            zip:pincode,
            odate:new Date()
            
          }
          
  
          let verifyResponse=await fetch('http://localhost:5000/verify-order',{
            method:"post",
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(paymentData)
          })
  
          verifyResponse=await verifyResponse.json()
  
          if(verifyResponse.success)
            {
              toast.success("payment success")
              navigate("/order")
            }else{
              toast.error("payment failed..")
            }
        },
        prefill: {
        
          contact:contactno ,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#12652',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
       paymentObject.open();
  
    }
  
    const deleteCart=async (id)=>{
      // console.log("okkk")
      let data=await fetch(`http://localhost:5000/cartdelete/${id}`,{
        method:"delete",
        headers:{
          'Authorization': `Bearer ${token}`
      }
      })
      data =await data.json()
  
      if(data.deletedCount==1)
        {
          toast.success("Cart product has been removed...")
          getcartdata()
        }
  
    }
  
    if (isLogin) {
      return (
        <div className=' justify-content-center ' style={{marginTop:"200px",marginBottom:'200px'}}>
          <p>Please login first to view your cart.</p>
          <button  className="btn btn-dark"onClick={() => navigate('/login')}>Login</button>
        </div>
      );
    }
    if(loading)
      {
        return (
          <Loading></Loading>
        )
      }
  return (
    <div>
{cartdata.length===0?<p style={{margin:'250px',fontSize:'35px'}}><i className="bi bi-cart-x-fill"></i> No products in carts</p>:

    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart- {cartdata.length} Items</h5>
              </div>
              <div className="card-body">
                
               
                {
                  cartdata.map((item)=>
                   
               <div>
                 <div className="row">
                      
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                       
                        <div className="bg-image hover-overlay hover-zoom ripple rounded">
                          <img src={`http://localhost:5000/upload/${item.pid.img}`} className="img-fluid w-100" alt="Blue Jeans Jacket" />
                          <a href="#!">
                            <div className="mask"></div>
                          </a>
                        </div>
                    
                      </div>
        
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                     
                        <p><strong>{item.pid.name}</strong></p>
                        <p>Category:{item.pid.pro_subcat.subcatname}</p>
                        {/* <p></p> */}
                        <button  type="button" onClick={()=>handleShow(item.pid._id)} className="btn btn-danger btn-sm me-1 mb-2" >
                          <i className="fas fa-trash"></i>
                        </button>
                        
                       <Link to={`/productdetail/${item.pid._id}`} className="text-decoration-none"><button  type="button" className="btn btn-warning btn-sm mb-2"
                          title="Move to the wish list">
                          <i className="fas fa-search"></i>
                        </button></Link>
                        
                      </div>
        
                      <div className="row col-lg-3 col-md-6 mb-4 mb-lg-0">
                        
                        <div className="d-flex mb-4">
                          <button  className="btn btn-sm   px-3 me-2" style={{backgroundColor:'white',border:'none'}}
                            onClick={()=>handleQuantity(item._id,item.quantity-1)}>
                            <i className="fas fa-minus"></i>
                          </button>
        
                          <div  className="form-outline form-floating">
                            <input id="form1" min="0" name="quantity" value={item.quantity} type="text" className="form-control form-control-sm outline-none" />
                            <label className="form-label" for="form1">Qty</label>
                          </div>
        
                          <button className="btn btn-sm px-3 ms-2 outline-none"
                           style={{backgroundColor:'white',border:'none'}}
                           onClick={()=>handleQuantity(item._id,item.quantity+1)}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        
        
                       
                        <p className="text-start text-md-center">
                          <strong>Rs.{item.pid.price}</strong>
                        </p>
    
                        {/* <div className=''>
                          <button className='btn btn-dark btn-sm w-100'>Buy Now</button>
                        </div> */}
         
                      </div>
                      
                    </div>
                <hr className="my-4" />
    
               </div>
                
                  )
                }
               
    
             
                
    
      
    
               
            </div>
            </div>
            <div className="card mb-4 ">
              <div className="card-body ">
                <p><strong>Shipping Address</strong></p>
                <div className='row'>

                <div className="col-12 text-start">
                    <label>Address</label>
                   <input type="text" className="form-control border-dark " onChange={(e)=>setaddress(e.target.value)}  placeholder="111 , abc street..." value={address} />
                </div>


                <div className="col-4 text-start mt-1">
                    <label>City</label>
                   <input type="text" className="form-control border-dark " onChange={(e)=>setcity(e.target.value)} value={city}/>
                </div>

                <div className="col-4 text-start mt-1">
                    <label>State</label>
                   <input type="text" className="form-control border-dark " onChange={(e)=>setstate(e.target.value)}  value={state}/>
                </div>

                <div className="col-4 text-start mt-1">
                    <label>Pin Code</label>
                   <input type="Number" className="form-control border-dark " onChange={(e)=>setpincode(e.target.value)} value={pincode}/>
                </div>



                </div>
                
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p><strong>Expected shipping delivery</strong></p>
                <p className="mb-0">{day}/{month}/{year}   -   {nextday}/{nextmonth}/{nextyear}</p>
              </div>
            </div>
         
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              
              <div className="card-body">
              
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>Rs.{totalCount()}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Free</span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span><strong> Rs.{totalCount()}</strong></span>
                  </li>
                </ul>
    
                <button  type="button" onClick={()=>checkout()} className="btn btn-dark   btn-lg btn-block">
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
               
      </div>
    </section>}

 

      <Modal show={show} onHide={handleClose}  centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            {/* <i className="fas fa-exclamation-triangle text-danger me-2"></i> */}
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <i className="fas fa-exclamation-triangle text-danger mb-3" style={{ fontSize: '2rem' }}></i>
          <p>Are you sure you want to remove ?</p>
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





