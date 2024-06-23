import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';


import cookie from 'js-cookie'



import { useNavigate } from 'react-router-dom';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [filteredData, setfilteredData] = useState([]);

  const [filtered, setfiltered] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setselected] = useState('all');

  const [p, setp] = useState();
  const [n, setn] = useState();
  const [loading, setLoading] = useState(false);
  const adtoken = cookie.get("adtoken")

  const navigate = useNavigate()


  useEffect(() => {
    catdata();


  }, [])
  useEffect(() => {
    getData()
  }, [])


  useEffect(() => {
    if (selected == "all") {
      setfiltered(products)

    }
    else {
      let filterData = products.filter((item) => item.pro_cat == selected)
      setfiltered(filterData)
      setfilteredData(filterData)

    }

  }, [selected])

  useEffect(() => {
    if (searchQuery == "") {
      if (selected == "all") {
        setfiltered(products)

      }
      else {

        setfiltered(filteredData)
      }

    } else {
      const filteredProducts = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.indicator.includes(searchQuery)
      );
      setfiltered(filteredProducts)
    }


  }, [searchQuery])

  const [cat, setCat] = useState([])
  const [subcat, setsubcat] = useState([])
  const [prd, setprd] = useState([])

  const [selcat, setselcat] = useState()
  const [selsubcat, setselsubcat] = useState()

  const [name, setName] = useState()
  const [id, setid] = useState()

  const [price, setPrice] = useState()
  const [Manufacturer, setMenufacturer] = useState()
  const [indicators, setIndicators] = useState()
  const [effects, setEffects] = useState()



  const [des, setdes] = useState()
  const [img, setimg] = useState()
  const [imgck, setimgck] = useState()

  const [show, setShow] = useState(false);
  const [edit, setedit] = useState(false);

  const [item, setItem] = useState('');

  const handleClose = () => setShow(false);
  const handleEditClose = () => setedit(false);
    
  useEffect(() => {
    getsubcat()
  }, [selcat])

  const handleShow = (ID) => {
    setItem(ID)
    setShow(true)
  }

  const handleDelete = () => {

    deleteProduct()
    handleClose();
  };








  const handleData = async (e) => {
    e.preventDefault()
    // console.log(img)
    let formdata = new FormData()
    formdata.append("id", id)

    formdata.append("name", name)

    formdata.append("pimg", img)


    formdata.append("pro_cat", selcat)
    formdata.append("pro_subcat", selsubcat)
    formdata.append("price", price)
    formdata.append("description", des)
    formdata.append("company", Manufacturer)
    formdata.append("indicator", indicators)
    formdata.append("sideeffect", effects)

    // console.log(name)
    // console.log(price)





    let result = await fetch("http://localhost:5000/updateproduct", {
      method: "POST",
      body: formdata,


    });

    result = await result.json();
    // console.log(result);

    if (result.update.acknowledged === true) {
      if (result.update.modifiedCount === 1) {
        toast.success('Product updated successfully....')
        getData()
        setselected('all')
        setedit(false)

      }
      else {
        toast.error('No change detacted....')
        setedit(false)


      }
      setedit(false)

    }
  };

  const catdata = async (req, res) => {

    let data = await fetch("http://localhost:5000/cat")

    data = await data.json()
    setCat(data)
  }






  const getsubcat = async (req, res) => {

    if (selcat && selcat != "product type") {
      let data = await fetch(`http://localhost:5000/category/${selcat}`)

      data = await data.json()
      setsubcat(data)
      console.log(data)
    }
    else {
      setsubcat([])
    }
  }


  const getData = async () => {
    let data = await fetch('http://localhost:5000/productdata', {
      headers: {
        'Authorization': `Bearer ${adtoken}`
      }
    })

    data = await data.json()
    if (data.st == "noToken") {
      navigate("/admin_login")
    } else {
      setProducts(data)
      setfiltered(data)

    }
  }



  const deleteProduct = async () => {

    let data = await fetch(`http://localhost:5000/deleteproduct/${item}`, {
      method: "delete",
      headers: {
        'Authorization': `Bearer ${adtoken}`
      }
    })
    data = await data.json()

    if (data.deletedCount === 1) {
      toast.success("product has been removed...")
      getData()
    }

  }

  const handleEdit = (data) => {
    // Implement edit functionality
    setid(data._id)
    // console.log(data._id)
    setselcat(data.pro_cat)
    setselsubcat(data.pro_subcat)
    getsubcat()

    setp(data)
    setName(data.name)
    setPrice(data.price)
    setimg(data.img)
    setimgck(data.img)
    setIndicators(data.indicator)
    setEffects(data.sideeffect)
    setdes(data.description)
    setMenufacturer(data.company)
    setLoading(true);
    setedit(true)
    // console.log('Edit product with id:', p);
  };


  return (
    <div className="container-p mt-4">


      <div className="d-flex flex-row-reverse">
        <div className="p-2">
          <select className="form-select " aria-label="Default select example" onChange={(e) => setselected(e.target.value)}>
            <option value="all" selected>All</option>
            {cat.map((item, index) =>
              <option selected={selected === item.catname ? "selected" : ""} value={item._id}>{item.catname}</option>
            )}


          </select>
        </div>

      </div>
      <div className="mb-4 search-container ">
        <input
          type="text"
          className="search-input w-100"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row">






        <Modal show={edit} size="xl" onHide={handleEditClose} aria-labelledby="example-custom-modal-styling-title" dialogClassName="modal-100w">
          <form onSubmit={handleData} >

            <Modal.Header closeButton>
              <Modal.Title className="d-flex align-items-center">
                {/* <i className="fas fa-exclamation-triangle text-danger me-2"></i> */}
                Edit Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {loading && <section className="">
                <div className="">
                  <div className="row justify-content-center ">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-10 col-xxl-12">
                      <div className="card shadow-sm rounded-4 border-dark">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                          <div className="row">
                            <div className="col-12">

                            </div>
                          </div>
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-md-12 text-start">
                              <label className="form-label">Producrt Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="ex.crossin"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required


                              />
                              <div className="text-danger fs-6"></div>
                            </div>

                            <div className="col-md-12 text-start">
                              <label className="form-label">Upload Image</label>
                              <input
                                type="file"
                                className="form-control"

                                name="pimage"

                                onChange={(e) => setimg(e.target.files[0])}
                              />
                            </div>
                            <div className="col-md-12 text-start">
                              <label className="form-label" >Product type</label>
                              {/* <p>{selcat}</p> */}
                              <select className="form-select" aria-label="Default select example" onClick={getsubcat} onChange={(e) => setselcat(e.target.value)}>
                                <option>product type</option>
                                {cat.map((item, index) =>
                                  <option selected={item._id === selcat ? "selected" : ""} value={item._id}>{item.catname}</option>
                                )}


                              </select>


                            </div>
                            <div className="col-md-12 text-start">
                              {/* <p>{selcat}</p> */}

                              <label className="form-label">Product category</label>
                              <select className="form-select" aria-label="Default select example" onChange={(e) => setselsubcat(e.target.value)}>

                                <option >Open this select menu</option>
                                {subcat.map((item, index) =>
                                  <option selected={item._id === selsubcat ? "selected" : ""} value={item._id}>{item.subcatname}</option>
                                )}
                              </select>
                            </div>

                            <div className="col-md-6 text-start">
                              <label className="form-label">Price</label>
                              <input type="Number" className="form-control" min={1} value={price} required name="contactno" onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className="col-md-6 text-start">
                              <label className="form-label fw-bold">Manufacturer</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="XYZ Company"
                                value={Manufacturer}
                                onChange={(e) => setMenufacturer(e.target.value)}
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
                                onChange={(e) => setdes(e.target.value)}
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
                                onChange={(e) => setIndicators(e.target.value)}
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
                                onChange={(e) => setEffects(e.target.value)}
                                required
                              />
                            </div>





                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose} className="d-flex align-items-center">
                <i className="fas fa-times-circle me-2"></i> Cancel
              </Button>

              <input type='submit' className=' btn btn-primary' value="Edit" ></input>
            </Modal.Footer>
          </form>

        </Modal>


        <p className='text-start ml-2'>{filtered.length}-Results</p>
        {filtered.map((product) => (
         
            <div className="col-md-4 mb-3" key={product.id}>
              <div className="card h-100">
                <img src={`http://localhost:5000/upload/${product.img}`} className="card-img-top" alt={product.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text"><strong>Price:</strong> {product.price}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleShow(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    {/* <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleHide(product.id)}
                    >
                      <i className="fas fa-eye-slash"></i>
                    </button> */}
                    <button type="button" className="btn btn-primary" onClick={() => handleEdit(product)}>
                      <i className="fas fa-edit"></i>
                    </button>


                  </div>
                </div>
              </div>
            </div>
          
        ))}

        <Modal show={show} onHide={handleClose} centered>
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
            <Button variant="danger" onClick={() => handleDelete()} className="d-flex align-items-center">
              <i className="fas fa-check-circle me-2"></i> Delete
            </Button>
          </Modal.Footer>
        </Modal>

      </div>

      <style jsx>{`
        .container-p {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
        }
        .search-input {
           
          border-radius: 30px;
          padding: 10px 20px;
          border: 1px solid #ced4da;
        }
        .card {
          border: 1px solid #dee2e6;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .card-img-top {
          width: 100%;
          height: 250px;
          object-fit: fill;
        }
        .card-body {
          padding: 15px;
        }
        .card-title {
          margin-bottom: 10px;
          font-size: 18px;
          color: #343a40;
        }
        .card-text {
          margin-bottom: 10px;
          font-size: 14px;
          color: #6c757d;
        }
        .btn {
          min-width: 40px;
        }
      `}</style>
    </div>
  )
}
