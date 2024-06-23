import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import cookie from 'js-cookie'


export default function ProductDetail() {

    const {pid}=useParams()
    let token=cookie.get('token')

  const [toggle,setToggle]=useState(1)
  const [qty,setQty]=useState(1)
  const [showModal, setShowModal] = useState(false);
const [showErrModal, setShowErrModal] = useState(false);

  const [detail,setdetail]=useState(null)

  const settab = (id)=>{
      setToggle(id)
  }
  useEffect( ()=>{
   getProductData()
  },[pid])



  const getProductData=async ()=>{
    
        let response = await fetch(`http://localhost:5000/productdata/${pid}`);
        let productData = await response.json();
        setdetail(productData);
        // console.log(detail)
   
  }
  const handleqty=()=>{
    if(qty==1)
        {
            setQty(1)
        }else
        {
            setQty(qty-1)
        }
  }

  const addcart=async ()=>{
   
    const response = await fetch("http://localhost:5000/cart", {
        method: "post",
        body: JSON.stringify({ pid: detail[0]._id, quantity: qty }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    // console.log(data)
if(data.st==="noToken")
{
    toast.error("Please ,Login first to add products..")
    setShowErrModal(true)
   // navigate('/login')

}else if (data.st === "okk") {
    toast.success("Product added successfully")
    
        setShowModal(true);
    }
    
}

const handleCloseErrModal = () => {
    setShowErrModal(false);
}
const handleCloseModal = () => {
setShowModal(false);
}

  if(!detail)
    {
        return (<h1>loading</h1>)
    }

  return (
    <div className="container-fluid pb-5" style={{marginTop:'20px'}}>
    <div className="row px-xl-5">
        <div className="col-lg-5 mb-30">
            <div id="product-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner bg-light" >
                    <div className="carousel-item  active" style={{height:'500px',overflow:'hidden'}}>
                        <img className="w-100 h-100" src={`http://localhost:5000/upload/${detail[0].img}`} style={{width:'100%',height:'100%',objectFit:'fill'}} alt=""/>
                    </div>
                    <div className="carousel-item">
                        <img className="w-100 h-100" src="img/product-2.jpg" alt="Image"/>
                    </div>
                    <div className="carousel-item">
                        <img className="w-100 h-100" src="img/product-3.jpg" alt="Image"/>
                    </div>
                    <div className="carousel-item">
                        <img className="w-100 h-100" src="img/product-4.jpg" alt="Image"/>
                    </div>
                </div>
             
            </div>
        </div>

        <div className="col-lg-7 h-auto mb-30 fs-5">
            <div className="h-100  p-30" style={{paddingLeft:'20px',backgroundColor:'#ffffff'}}>
                <h3 className="text-start" style={{paddingTop:'20px'}}>{detail[0].name}</h3>
                <div className="d-flex mb-3">
                    <div className="text-warning mr-2">
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star-half-alt"></small>
                        <small className="far fa-star"></small>
                    </div>
                    {/* <small className="pt-1">{detail!=null?detail[0].name:"k"}</small> */}
                </div>
                <h3 className="font-weight-semi-bold mb-4 text-start">₹{detail[0].price}</h3>
                <p className="mb-4 text-start">{detail[0].description}</p>
                <div className="d-flex mb-1">
                    <strong className="text-dark mr-3">Company :</strong>     
                            <label >{detail[0].company}</label>    
                </div>
                <div className="d-flex mb-2">
                    <strong className="text-dark mr-3">Category :</strong>
                                        
                            <label for="color-1">{detail[0].pro_subcat.subcatname}</label>
                </div>
                <div className="d-flex align-items-center mb-4 pt-2 ">
                    <div className="input-group quantity mr-3" style={{width: '130px'}}>
                        <div className=" ">
                            <button className="bg-warning border-0 btn-minus" onClick={handleqty}>
                                <i className="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-light border-0 text-center" value={qty}/>
                        <div className="">
                            <button className="bg-warning border-0 btn-plus " onClick={()=>{setQty(qty+1)}}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-dark ml-3 px-3"  onClick={()=>{addcart()}}><i className="fa fa-shopping-cart mr-1"></i> Add To
                        Cart</button>
                </div>
                <div className="d-flex pt-2">
                    <strong className="text-dark mr-2">Share on:</strong>
                    <div className="d-inline-flex">
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row px-xl-5 mt-4">
        <div className="col">
            <div className=" p-30" style={{backgroundColor:'#ffffff',paddingTop:'10px'}}>
                <div className="nav nav-tabs mb-4">
                    <p className={`nav-item nav-link text-dark  ${toggle==1?'active bg-warning':''}`} onClick={()=>settab(1)}data-target="#tab-pane-1" data-toggle="tab"   >Description</p>
                    <p className={`nav-item nav-link text-dark  ${toggle==2?'active bg-warning':''}`} onClick={()=>settab(2)} data-target="#tab-pane-2" data-toggle="tab" >Information</p>
                    {/* <p className={`nav-item nav-link text-dark  ${toggle==3?'active bg-warning':''}`} data-toggle="tab" onClick={()=>settab(3)}>Reviews (0)</p> */}
                </div>
                <div className="tab-content" style={{padding:'25px'}}>
                    <div className={`tab-pane fade text-start  ${toggle==1?'show active':''}`}   id="tab-pane-1">
                        <h4 className="mb-3 fs-2">Product Description</h4>
                        <p className="fs-5"> {detail[0].description}</p>
                        <p></p>
                        </div>
                    <div className={`tab-pane fade text-start  ${toggle==2?'show active':''}`} id="tab-pane-2">
                        <h3 className="mb-3">Additional Information</h3>
                        {/* <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p> */}
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-group list-group-flush">
                        <h5 className="mb-3">Indicators</h5>
                                   
                                    {detail[0].indicator.map((item,index)=>
                                         <li className="list-group-item px-0 fs-5">
                                         {item}
                                     </li>
                                    )}
                                  </ul> 
                            </div>
                            <div className="col-md-6">
                                <ul className="list-group list-group-flush">
                                <h5 className="mb-3">Side Effects</h5>
                                   
                                   {detail[0].sideeffect.map((item,index)=>
                                        <li className="list-group-item px-0">
                                        {item}
                                    </li>
                                   )}
                                  </ul> 
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade  ${toggle==3?'show active':''}`} id="tab-pane-3">
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className="mb-4">1 review for "Product Name"</h4>
                                <div className="media mb-4">
                                    <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: '45px'}}/>
                                    <div className="media-body">
                                        <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                        <div className="text-primary mb-2">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star-half-alt"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                        <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="mb-4">Leave a review</h4>
                                <small>Your email address will not be published. Required fields are marked *</small>
                                <div className="d-flex my-3">
                                    <p className="mb-0 mr-2">Your Rating * :</p>
                                    <div className="text-primary">
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </div>
                                </div>
                               
                                <form>
                                    <div className="form-group">
                                        <label for="message">Your Review *</label>
                                        <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label for="name">Your Name *</label>
                                        <input type="text" className="form-control" id="name"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Your Email *</label>
                                        <input type="email" className="form-control" id="email"/>
                                    </div>
                                    <div className="form-group mb-0">
                                        <input type="submit" value="Leave Your Review" className="btn btn-primary px-3"/>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {showModal && (
    <div className="err-modal-overlay">
        <div className="err-modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add to Cart</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
              
                    <p>Product Name: {detail[0].name}</p>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleCloseModal}>Add to Cart</button>
            </div>
        </div>
    </div>

    
)}
{showErrModal && (
    <div className="err-modal-overlay">
        <div className="err-modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add to Cart</h5>
                <button type="button" className="close" onClick={handleCloseErrModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                please login first to add the product....
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseErrModal}>Close</button>
                <Link to="/login" className='btn btn-dark'>LOGIN</Link>
            </div>
        </div>
    </div>
    )}

</div>

  )
}
