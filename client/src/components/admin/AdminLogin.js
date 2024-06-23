import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import cookie from 'js-cookie'

export default function AdminLogin() {
  const [aemail, setEmail] = useState("");
  const [apassword, setPassword] = useState("");
  const [loading, setloading] = useState(true);


  let navigate = useNavigate()

  useEffect(() => {
    checkAdmin()
  }, [])
  const checkAdmin = async () => {
    const adtoken = cookie.get('adtoken')
    let data = await fetch('http://localhost:5000/verifyuser',
      {
        headers: {
          'Authorization': `Bearer ${adtoken}`
        }
      })

    data = await data.json()

    if (data.st == "noToken") {
      navigate('/admin_login')

    }
    else {
      navigate('/admin/')

    }
    setloading(false)
  }

  const adminLogin = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^[a-z A-Z 0-9 @]{2,}$/;

    if (!emailRegex.test(aemail)) {
      toast.error('Please enter a valid email address.');

    } else if (!passwordRegex.test(apassword)) {
      toast.error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');

    } else {
      let result = await fetch('http://localhost:5000/login/admin', {
        method: "POST",
        body: JSON.stringify({ aemail, apassword }),
        headers: {
          "Content-Type": "application/json",

        },
      });
      result = await result.json();

      if (result.status == "success") {
        const expires = new Date(Date.now() + result.exp * 60 * 1000);
        console.log(expires)
        localStorage.setItem("adtoken", result.adtoken)
        localStorage.setItem("isl", true)
        cookie.set('adtoken', result.adtoken, { expires })


        // localStorage.setItem('isauthenticated','true')

        toast.success("Log in successfully....")

        navigate("/admin/")


      }
      else {
        toast.error(result.msg)
        console.log(result.msg)

      }

    }



  }

  if (loading) {
    return (<div>loading.....</div>)
  }

  return (
    <div>
      <section className=" p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border-0 shadow-sm rounded-4 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h3">Admin Log in</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">Enter your details to Log in</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={adminLogin}>
                    <div className="row gy-3 overflow-hidden">

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required value={aemail} onChange={(e) => setEmail(e.target.value)} />
                          <label for="email" className="form-label">Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" id="password" placeholder="Password" required value={apassword} onChange={(e) => setPassword(e.target.value)} />
                          <label for="password" className="form-label">Password</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-dark btn-lg" type="submit" >Log in</button>
                        </div>
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
  )
}
