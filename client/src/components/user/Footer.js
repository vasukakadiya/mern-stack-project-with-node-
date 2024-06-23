import React from 'react'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';


export default function Footer() {
  return (
    <div>
     <footer className="bg-dark text-white py-5">
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3">Company</h5>
        <ul className="list-unstyled">
          <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
          <li><Link to="/contact" className="text-white text-decoration-none">Contact Us</Link></li>
          <li><Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link></li>
          <li><Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link></li>
        </ul>
      </div>
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3">Categories</h5>
        <ul className="list-unstyled">
          <li><Link to="/medicine" className="text-white text-decoration-none">Medicine</Link></li>
          <li><Link to="/wellness" className="text-white text-decoration-none">Wellness</Link></li>
          <li><Link to="/personal-care" className="text-white text-decoration-none">Personal Care</Link></li>
        </ul>
      </div>
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3">Connect With Us</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-facebook-f"></i> Facebook</a></li>
          <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-twitter"></i> Twitter</a></li>
          <li><a href="#" className="text-white text-decoration-none"><i className="fab fa-instagram"></i> Instagram</a></li>
        </ul>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-12 text-center">
        <p className="mb-0">&copy; 2024 PharmaNetics. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</footer>

    </div>
  )
}
