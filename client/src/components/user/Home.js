import React, { useEffect, useState } from 'react'
import './Home.css';
import myImage from './tablets.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';



export default function Home() {
const [productData,setProductData]=useState([])


useEffect(()=>{
  getData()
},[])
  const getData=async ()=>{
    let data=await fetch("http://localhost:5000/medicinehome")

    data=await data.json()

    setProductData(data)
    // console.log(data)
  }
    const settings = {
        dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1900,
            // Enable center mode

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
      };
    
  return (
    <>
    
   
      <div className="homepage-container  my-4  " style={{paddingTop:'5px',backgroundColor:'#eff1f3'}}>
      <div className="homepage-row  row align-items-center ">
        <div className="col-md-4">
          <div className="img-box ">
            <img src={myImage} alt="gs" className="img-fluid ig rounded" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="detail-box">
            <h1 className="mb-4">
              Welcome To Our <br/>
              <span className="text-primary">E - Pharmacy Store</span>
            </h1>
            <p className="lead">
            where convenience meets quality healthcare. Discover a seamless shopping experience tailored to your needs, right from the comfort of your home. Browse through our extensive range of pharmaceutical products, including medications, wellness essentials, and personal care items. With intuitive navigation and advanced search options, finding the products you need is quick and easy.
            </p>
        
          </div>
        </div>
      </div>
    

    </div>
    <div className='container' style={{ padding: 24 ,backgroundColor:'#eff1f3'}}>
   
<h2>Featured Products</h2><br></br>
      <Slider {...settings} >

      {productData.map((item,index)=>
                        <div className="">
                        <div className="product-item bg-light mb-4">
                            <div className="product-img position-relative overflow-hidden">
                                <img className="img-fluid w-100" src={`http://localhost:5000/upload/${item.img}`} style={{height:'250px'}}  alt=""/>
                                <div className="product-action">
                                    {/* <button className="btn btn-outline-dark btn-square" onClick={()=>handleAddToCart(item)}><i className="fa fa-shopping-cart"></i></button> */}
                                    <button className="btn btn-outline-dark btn-square" ><Link to={`/productdetail/${item._id}`} className='linkview text-dark'><i className="fa fa-search"></i></Link></button>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <a className="h6 text-decoration-none m-0 text-truncate" href="">{item.name.slice(0,44)}...</a>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>₹{item.price}</h5><h6 className="text-muted ml-2"><del>₹{item.price}</del></h6>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                )}


      
      </Slider>
</div>

   
    <div className="features-container mt-2">
  <div className="row">
    <div className="col-md-4 feature-item">
      <i className="fas fa-truck fa-3x"></i>
      <h3>Fast Delivery</h3>
      <p>We offer fast and reliable delivery options to get your medicines to you as quickly as possible.</p>
    </div>
    <div className="col-md-4 feature-item">
      <i className="fas fa-certificate fa-3x"></i>
      <h3>License</h3>
      <p>We are a licensed online pharmacy ensuring genuine and quality products for your health needs.</p>
    </div>
    <div className="col-md-4 feature-item">
      <i className="fas fa-headset fa-3x"></i>
      <h3>24x7 Support</h3>
      <p>Our customer support team is available 24x7 to assist you with any queries or concerns.</p>
    </div>
  </div>
</div>


<div className="how-it-works-container mb-5 ">
  <div className="section-heading text-center mb-5">
    <h2>How It Works</h2>
    <p className="lead">Easy steps to order medicines online</p>
  </div>
  <div className="row">
    <div className="col-md-4">
      <div className="step">
        <div className="step-icon">
          <i className="fas fa-search fa-3x"></i>
        </div>
        <h4>Search for Medicines</h4>
        <p>Browse our wide range of medicines or use the search bar to find specific products.</p>
      </div>
    </div>
    <div className="col-md-4">
      <div className="step">
        <div className="step-icon">
          <i className="fas fa-shopping-cart fa-3x"></i>
        </div>
        <h4>Add to Cart</h4>
        <p>Select the desired quantity and add the medicines to your shopping cart.</p>
      </div>
    </div>
    <div className="col-md-4">
      <div className="step">
        <div className="step-icon">
          <i className="fas fa-credit-card fa-3x"></i>
        </div>
        <h4>Secure Checkout</h4>
        <p>Proceed to checkout, enter your details, and make a secure payment.</p>
      </div>
    </div>
  </div>
</div>




  </>
  
  )
}
