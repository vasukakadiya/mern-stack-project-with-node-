import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cookie from 'js-cookie'
import './ProductPage.css'



export default function ProductPge (props) {
    
    const [products, setProducts] = useState([]);
    const [cat, setCat] = useState([]);

    const [filtered, setfilter] = useState([]);

    let token=cookie.get("token")
    const [loading, setLoading] = useState(true);
    const [check,setCheck]=useState([]);
    const [ck,setck]=useState();

    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showErrModal, setShowErrModal] = useState(false);

    const [search, setsearch] = useState();


    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate=useNavigate()
    useEffect(()=>{
        // setck(false)

        // console.log(props.product)
        getProduct();
        
        setLoading(false)
        setCheck([])
        setck(false)

        setTimeout(()=>{
            setck()
        },1000)

    

    },[props.product])

    useEffect(() => {
        let filteredProducts=products
        
        
        if(check.length>0){
            filteredProducts = filteredProducts.filter((product) => check.includes(product.pro_subcat.subcatname));
       
           
        }

        if (selectedPriceRanges.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedPriceRanges.some(range => {
                    const [min, max] = range;
                    return product.price >= min && product.price <= max;
                })
            );
        }
        if(search)
            {
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.indicator.some(indicator => indicator.toLowerCase().includes(search.toLowerCase()))
                );
            }

        setfilter(filteredProducts)
    }, [check,products,selectedPriceRanges,search]);

    useEffect(()=>{
       
        // console.log(selectedProduct)
        if(selectedProduct)
            {
                addcart()

            }
    },[selectedProduct])
  
    const addcart=async ()=>{
        const response = await fetch("http://localhost:5000/cart", {
            method: "post",
            body: JSON.stringify({ pid: selectedProduct._id, quantity: 1 }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        // console.log(data)
if(data.st==="noToken")
    {
        //setShowErrModal(true)
        toast.error("Please Log in first...")
       // navigate('/login')

    }else if (data.st === "okk") {
           
        toast.success("Successfully Added")

        }
        
    }

    const getProduct=async ()=>{
      
        let data=await fetch(`http://localhost:5000/${props.product}`,{headers: {
            'Authorization': `Bearer ${token}`
          }})

          let catdata=await fetch(`http://localhost:5000/${props.category}`,{headers: {
            'Authorization': `Bearer ${token}`
          }})
        data =await data.json();
        catdata=await catdata.json()
        //console.log(data)
        // console.log("Response Data:", data);
        if(data.st==="noToken")
            {
                //window.location.href = '/login';
                navigate('/login')

               
        return 
        
             }
             else{
                setProducts(data)
                setCat(catdata)
                     
             }
            
        //setProducts(data)
       
    }

    
    const handlecheckbox=(e)=>{
        const checked=e.target.checked
        const value=e.target.value
        console.log(value,checked)
        if(checked)
            {
                setCheck([...check,value])
                // console.log(check)
            }else{
                setCheck(prevcheck=>prevcheck.filter(category=>category!==value))
            }

            // console.log(check)
    }

    const handlePriceCheckbox = (e, min, max) => {
        const range = [min, max];
        setSelectedPriceRanges(prevRanges =>
            e.target.checked
                ? [...prevRanges, range]
                : prevRanges.filter(r => r[0] !== min || r[1] !== max)
        );
    };
    const handleCloseErrModal = () => {
        setShowErrModal(false);
    }
    const handleCloseModal = () => {
    setShowModal(false);
}
const handleAddToCart =async (product) => {
    console.log('Adding to cart:', product);

     setSelectedProduct(product)
        if(selectedProduct==product)
            {
                addcart()
            }
       
}

if (loading) {
    return (<div style={{marginTop:'350px',marginBottom:'350px'}}>loading....</div>); // Render null while loading
}
      
  return (
    <div>
       <div className="container-fluid" style={{marginTop:'10px'}}>
        <div className="row px-xl-5">
          
            <div className="col-lg-3 col-md-4">
                
                <h5 className="section-title   mb-3"><span className=" pr-3">FILTER BY CATEGORY</span></h5>
                <div className=" p-4 mb-30" style={{backgroundColor:'#ffffff'}}>
                    
                        
                       {cat.map((item,index)=>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" className="custom-control-input" checked={ck}  id={item._id}  onChange={handlecheckbox}  value={item.subcatname}/>
                        <label className="custom-control-label" for={item._id}>{item.subcatname}</label>
                        
                    </div>
                    )}
                   
                </div>

                <h5 className="section-title position-relative text-uppercase mb-3 mt-3"><span className=" pr-3">Filter BY PRICE</span></h5>
                <div className="p-4 mb-30" style={{backgroundColor:'#ffffff'}}>
                    <form>
                        
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" onChange={(e) => handlePriceCheckbox(e, 1, 100)} id="price-1"/>
                            <label className="custom-control-label" for="price-1">1-100</label>

                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" onChange={(e) => handlePriceCheckbox(e, 101, 200)} id="price-2"/>
                            <label className="custom-control-label" for="price-2">101-200</label>
                     
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" onChange={(e) => handlePriceCheckbox(e, 201, 300)} id="price-3"/>
                            <label className="custom-control-label" for="price-3">201-300</label>
                          
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" className="custom-control-input" onChange={(e) => handlePriceCheckbox(e, 301, 400)} id="price-4"/>
                            <label className="custom-control-label" for="price-4">301-400</label>
                         
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between  mb-3">
                            <input type="checkbox" className="custom-control-input" onChange={(e) => handlePriceCheckbox(e, 401, 500)} id="price-5"/>
                            <label className="custom-control-label" for="price-5">401-500</label>
                   
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between  mb-3">
                            <input type="checkbox" className="custom-control-input" onChange={(e) => handlePriceCheckbox(e, 501, 1000)} id="price-6"/>
                            <label className="custom-control-label" for="price-6">501-1000</label>
                   
                        </div>

                        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between  mb-3s">
                            <input type="checkbox" className="custom-control-input" onChange={(e) => handlePriceCheckbox(e, 1001, 10000)} id="price-7"/>
                            <label className="custom-control-label" for="price-7">1000-10,000</label>
                   
                        </div>
                    </form>
                </div>
               
                
            </div>
    


          
            <div className="col-lg-9 col-md-8">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center  mb-4">
                        <input type="text" className=" w-100 mt-2 ml-3 p-2 rounded-5" placeholder="Search products..." onChange={(e)=>setsearch(e.target.value)}  value={search} />
                               
                        </div>

                
                    </div>
                    
                   {filtered.length===0?<div className="fs-3" style={{marginTop:'200px'}}> No Products</div>:
                   
                   filtered.map((item,index)=>
                        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
                        <div className=" product-item bg-light mb-4">
                            <div className="product-img position-relative overflow-hidden">
                                <img className="img-fluid w-100" src={`http://localhost:5000/upload/${item.img}`} style={{height:'250px'}}  alt=""/>
                                <div className="product-action">
                                    <button className="btn btn-outline-dark btn-square" onClick={()=>handleAddToCart(item)}><i className="fa fa-shopping-cart"></i></button>
                                    <Link to={`/productdetail/${item._id}`} className='linkview text-dark'><button className="btn btn-outline-dark btn-square" ><i className="fa fa-search"></i></button></Link>
                                </div>
                            </div>
                            <div className="text-center py-4" style={{backgroundColor:'#ffffff'}}>
                                <p className="h6 text-decoration-none text-truncate" >{item.name}</p>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>₹{item.price}</h5><h6 className="text-muted ml-2"><del>₹{item.price}</del></h6>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                )}
                    
                   
                   
                    
                </div>
            </div>
          
        </div>
    </div>
   
    </div>
  )
}
