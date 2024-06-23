import React, { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Modal } from 'react-bootstrap';


export default function CategoryAdmin() {
  const adtoken=cookie.get("adtoken")

    const [cat,setcat]=useState([])
    const[medicine,setMedicine]=useState([])
    const[wellness,setWellness]=useState([])
    const[personalcare,setPersonalcare]=useState([])

    const [selectedcat,setselectedcat]=useState("")
    const [inputcategory,setinputcategory]=useState()
  const navigate=useNavigate()

  const [show, setShow] = useState(false);
const [edit, setedit] = useState(false);

const [item, setItem] = useState();
const [subcatname, setsubcatname] = useState();


  const handleClose = () => setShow(false);
const handleEditClose = () => setedit(false);

useEffect(()=>{
  catdata()
  getcat()
},[])

const handleShow = (ID) => {
    setItem(ID)
    setShow(true)
}

const handleedit = (ID,NAME) => {
   
    setItem(ID)
    setsubcatname(NAME)
    setedit(true)
  }

const handleDelete = () => {
 
  deletecat()
  handleClose();
};

const handleEditData=async ()=>{
  if(subcatname!="")
    {
      let data=await fetch('http://localhost:5000/editsubcat',{
        method:"post",
        body:JSON.stringify({id:item,subcat:subcatname}),
        headers:{
            'Content-Type':'application/json'
        }
    })

    data= await data.json()
   
    

    if(data.acknowledged===true)
        {
          if(data.modifiedCount=== 1)
            {
              toast.success('Category Data updated successfully....')
              getcat()
          setedit(false)

            }
            else{
              toast.error('No change detacted....')
          setedit(false)


            }
          setedit(false)

        }
    }
    else {
      toast.error("subcategory can not be empty...")
      setedit(false)

    }
    
}


 

    const catdata=async (req,res)=>{

        let data= await fetch("http://localhost:5000/api/cat",{
            headers:{
              'Authorization': `Bearer ${adtoken}`
          }
          })

        data=await data.json()

        if(data.st=="noToken")
            {
                navigate("/admin_login")
            }else {
                setcat(data)

            }
    }

    const addcategory= async ()=>{
       
        if(!selectedcat)
            {
                toast.error('Please select category')
            }
            else if(!inputcategory)
                {
                toast.error('Please insert sub category')

                }
            else{
                let data=await fetch('http://localhost:5000/addcategory',{
                    method:'post',
                    body:JSON.stringify({subcategory:inputcategory,cat:selectedcat}),
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${adtoken}`

                    }
                })

                data=await data.json()
                // console.log(data)

                if(data)
                    {
                        toast.success('Category Added....')
                        getcat()
                    }
                    else
                    {
                        toast.error('Something went wrong...')

                    }
            }
    }

    const deletecat=async ()=>{
        

        let data =await fetch(`http://localhost:5000/deletecat/${item}`)

        data =await data.json()

        getcat()

    }
    const getcat=async (req,res)=>{

        
          let med= await fetch("http://localhost:5000/api/medicine-category",{
            headers:{
              'Authorization': `Bearer ${adtoken}`
          }
          })
          let well= await fetch("http://localhost:5000/api/wellness-category",{
            headers:{
              'Authorization': `Bearer ${adtoken}`
          }
          })
          let care= await fetch("http://localhost:5000/api/personal-category",{
            headers:{
              'Authorization': `Bearer ${adtoken}`
          }
          })


          med=await med.json()
          well=await well.json()
          care=await care.json()

          if(med.st=="noToken" && well.st=="noToken")
            {
                navigate("/admin_login")
            } else {
                setMedicine(med)
                setWellness(well)
                setPersonalcare(care)
            }

          
        
        
    
      }
  return (
    <div>
     <div className="container mt-4">
        <div className="mb-4">
        {/* <p>{selectedcat}</p> */}
            <select className="form-select" id="categorySelect" onChange={(e)=>setselectedcat(e.target.value)}>
                <option  value=""  selected >Select Category</option>
                {cat.map((item,index)=>
                <option value={item._id}>{item.catname}</option>

                )}
            </select>
        </div>
        <div className="mb-4">
            <input type="text" className="form-control" value={inputcategory} onChange={(e)=>setinputcategory(e.target.value)} placeholder="Enter subcategory"/>
            <button className="btn btn-primary mt-2" onClick={()=>addcategory()}>Add Subcategory</button>
        </div>

        <div className="row">
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-header text-start">
                    <i className="fas fa-pills mr-2"></i>
Medicine
                    </div>
                    <ul className="list-group list-group-flush text-start">
                        
                        {medicine.map((item,index)=>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        {item.subcatname}
                        <div>
                            <button className="btn btn-dark btn-sm me-2" onClick={()=>handleedit(item._id,item.subcatname)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={()=>handleShow(item._id)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                        )}
                       
                    </ul>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-header text-start">
                    <i className="fas fa-heartbeat mr-2"></i>
Wellness
                    </div>
                    <ul className="list-group list-group-flush text-start">
                        
                        {wellness.map((item,index)=>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        {item.subcatname}
                        <div>
                            <button className="btn btn-dark btn-sm me-2" onClick={()=>handleedit(item._id,item.subcatname)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={()=>handleShow(item._id)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                        )}
                       
                    </ul>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-header text-start">
                    <i className="fas fa-spa mr-2"></i>
  Personal Care
                    </div>
                    <ul className="list-group list-group-flush text-start">
                    {personalcare.map((item,index)=>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                        {item.subcatname}
                        <div>
                            <button className="btn btn-dark btn-sm me-2" onClick={()=>handleedit(item._id,item.subcatname)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={()=>handleShow(item._id)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </div>

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

      <Modal show={edit} onHide={handleEditClose}  centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            {/* <i className="fas fa-exclamation-triangle text-danger me-2"></i> */}
            Edit Subcategory
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          
          <p>Enter sub category</p>
          <input type="text" className="form-control" value={subcatname} onChange={(e)=>setsubcatname(e.target.value)} placeholder="Enter subcategory"/>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose} className="d-flex align-items-center">
            <i className="fas fa-times-circle me-2"></i> Cancel
          </Button>
          <Button variant="primary" onClick={()=>handleEditData()} className="d-flex align-items-center">
            <i className="fas fa-check-circle me-2"></i> Edit
          </Button>
        </Modal.Footer>
      </Modal>
  
    </div>
  )
}
