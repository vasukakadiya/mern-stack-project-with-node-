import React, { useEffect } from 'react'
import { useState } from "react";
import {toast} from 'react-toastify'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


export default function Addproduct() {

    useEffect(()=>{
        catdata();
     
       
    },[])
    const [cat,setCat]=useState([])
    const [subcat,setsubcat]=useState([])
    const[prd,setprd]=useState([])

    const [selcat,setselcat]=useState()
    const [selsubcat,setselsubcat]=useState()

    const[name,setName]=useState()
    const [price,setPrice]=useState()
    const [Manufacturer,setMenufacturer]=useState()
    const [indicators,setIndicators]=useState()
    const [effects,setEffects]=useState()



    const [des,setdes]=useState()
    const [img,setimg]=useState()


  
      
      
        const handleData = async (e) => {
            e.preventDefault()
          if(name && price && Manufacturer && indicators && effects && selcat && selsubcat && des && img)
            {
              // console.log(img)
          let formdata=new FormData()
          formdata.append("name",name)
          formdata.append("pimg",img)
          formdata.append("pro_cat",selcat)
          formdata.append("pro_subcat",selsubcat)
          formdata.append("price",price)
          formdata.append("description",des)
          formdata.append("company",Manufacturer)
          formdata.append("indicator",indicators)
          formdata.append("sideeffect",effects)



          let result = await fetch("http://localhost:5000/addproduct", {
            method: "POST",
             body: formdata,
           
          });
         
          result = await result.json();
          if(result.status==="true")
            {
              toast.success("product has been added...")
            }
            else{
              toast.error('something went wrong')
            }
          // console.log(result);

            } else {
              toast.error('please enter detail perfactly...')
            }
          
        };

        const catdata=async (req,res)=>{

            let data= await fetch("http://localhost:5000/cat")

            data=await data.json()
            setCat(data)}

      


            

            const getsubcat=async (req,res)=>{

              if(selcat && selcat!="product type")
              {
                let data= await fetch(`http://localhost:5000/category/${selcat}`)
    
                data=await data.json()
                setsubcat(data)
                // console.log(data)
              }
              else{
                setsubcat([])
              }
            }
        
      
  return (
    <>
    <div>
        <section className="p-3 p-md-4 p-xl-5">
        <div className="">
          <div className="row justify-content-center ">
            <div className="col-12 col-md-9 col-lg-7 col-xl-10 col-xxl-12">
              <div className="card border-0 shadow-sm rounded-4 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h3">Add Product</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Enter details for your product
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleData}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-md-12 text-start">
                        <label className="form-label">Producrt Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ex.crossin"
                          name="name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          required
                          
                        />
                        <div className="text-danger fs-6"></div>
                      </div>

                      <div className="col-md-12 text-start">
                        <label className="form-label">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          
                          name="image"
                          
                          onChange={(e)=>setimg(e.target.files[0])}
                          required
                        />
                      </div>
                      <div className="col-md-12 text-start">
                        <label className="form-label" >Product type</label>
                        {/* <p>{selcat}</p> */}
                        <select className="form-select" aria-label="Default select example" onClick={getsubcat} onChange={(e)=>setselcat(e.target.value)}>
                           <option>product type</option>
                            {cat.map((item,index)=>
                            <option value={item._id}>{item.catname}</option>
                        )}
                            
                            
                        </select>
                      </div>
                      <div className="col-md-12 text-start">
                        <label className="form-label">Product subcategory</label>
                        <select className="form-select" aria-label="Default select example" onChange={(e)=>setselsubcat(e.target.value)}>
                         
                            <option >Open this select menu</option>
                            {subcat.map((item,index)=>
                            <option value={item._id}>{item.subcatname}</option>
                        )}
                        </select>
                      </div>

                      <div className="col-md-6 text-start">
                        <label className="form-label">Price</label>
                        <input type="Number" className="form-control" min={1} value={price} required  name="contactno" onChange={(e)=>setPrice(e.target.value)} />
                      </div>

                      <div className="col-md-6 text-start">
                        <label className="form-label fw-bold">Manufacturer</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="XYZ Company"
                          value={Manufacturer}
                          onChange={(e)=>setMenufacturer(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-12 text-start">
                        <label className="form-label">Discription</label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Description about product..."
                          name="discription"
                          value={des}
                          onChange={(e)=>setdes(e.target.value)}
                          rows={3}
                          required
                        />
                      </div>

                      <div className="col-md-6 text-start">
                        <label className="form-label">Indicators</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="benifits (seperated by comma)"
                          value={indicators}
                          onChange={(e)=>setIndicators(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6 text-start">
                        <label className="form-label">Side Effects</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="side effect (seperated by comma)"
                          value={effects}
                          onChange={(e)=>setEffects(e.target.value)}
                          required
                        />
                      </div>

                      

                      {/* <div className="col-12">
                  <div className="d-grid">
                    <button className="btn bsb-btn-2xl btn-primary" type="submit">Sign up</button>
                  </div>
                </div> */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            
                            className="btn btn-dark btn-lg"
                            type="submit"
                          >
                            Add Product
                          </button>
                        </div>
                      </div>
                    </div>
                  
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      
                     
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

               
    </div>
  
    </>
  )
}
