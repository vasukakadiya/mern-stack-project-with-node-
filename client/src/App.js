import logo from './logo.svg';
import "./App.css";
import react, { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router,Route,Link,Routes, useNavigate, Navigate} from 'react-router-dom';
import cookie from'js-cookie'
import Loading from './components/user/Loading';
import UserLayout from './page/UserLayout';
import Home from './components/user/Home';
import OrderPage from './components/user/OrderPage';
import Profile from './components/user/Profile';
import Signup from './components/user/Signup';
import ProductPge from './components/user/ProductPage';
import ProductDetail from './components/user/ProductDetail';
import Login from './components/user/Login';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoutes from './components/admin/ProtectedRoutes';
import Addproduct from './components/admin/Addproduct';
import Product from './components/admin/Product';
import CategoryAdmin from './components/admin/CategoryAdmin';
import OrderAdmin from './components/admin/OrderAdmin';
import Cart from './components/user/Cart';
import AdminLayout from './page/AdminLayout';
import UserDashboard from './components/admin/UserDashboard';
import Dashboard from './components/admin/Dashboard';


function App() {

  const [isLogin, setIsLogin] = useState(false)
const [loading, setloading] = useState(true)
console.log("new",isLogin)

const handleLogin = () => {
  setIsLogin(true); // Set isLogin to true when the user logs in
};

const handleLogout = () => {
  setIsLogin(false); // Set isLogin to true when the user logs in
};
useEffect( () => {
  
  const token = cookie.get('token');

 
  checkUser(token)
 
  setTimeout(()=>{
    setloading(false)

  },1000)

}, []);


const checkUser=async (token)=>{
  //const token = localStorage.getItem('token');

  let data=await fetch('http://localhost:5000/verifyuser',
  {
      headers:{
          'Authorization': `Bearer ${token}`
      }
  })

  data =await data.json()

  if(data.st=="noToken")
    {
      cookie.remove('token')
      
    }
    else{
   
      setIsLogin(true)
      console.log("set")

     
    }
}
  return (
    <div className="App">
      {loading?
      <Loading>
        
      </Loading>:
      <div>
      <Router>
    {/* <Navbar isLogin={isLogin} ></Navbar> */}
      {/* <Signup></Signup> */}
      {/* <Viewdata></Viewdata> */}

      
      <Routes>
       
      
        
     <Route path="/" element={<UserLayout isLogin={isLogin}/> }>
     <Route index path="" element={<Home></Home>}></Route>

     <Route path="order" element={<OrderPage handleLogout={handleLogout}></OrderPage>}></Route>
        <Route path="cart" element={<Cart handleLogout={handleLogout}></Cart>}></Route>
        <Route path="profile" element={<Profile handleLogout={handleLogout} isLogin={isLogin}></Profile>}></Route>

        <Route path="register" Component={Signup}></Route> 
                {/* <Route path="/cart" Component={Check}></Route> */}



                <Route path="medicine" element={<ProductPge product="medicine" category="medicine-category"/>}></Route>
        <Route path="wellness" element={<ProductPge product="wellness" category="wellness-category"/>}></Route>
        <Route path="personal-care" element={<ProductPge product="personal-care" category="personal-category"/>}></Route>

        <Route path="productdetail/:pid" element={<ProductDetail/>}></Route>
      
     <Route path="login" element={<Login handleLogin={handleLogin} isLogin={isLogin} ></Login>}> </Route>   

       </Route> 
        
     


    
      

      



      </Routes>
      {/* <Footer></Footer> */}
    
        <Routes>
    
       <Route path="/admin_login" element={<AdminLogin/>}></Route>
        <Route path="/noe" element={<ProtectedRoutes Component={Home}></ProtectedRoutes>} />


          <Route path="/admin" element={<ProtectedRoutes Component={AdminLayout}/>}>
        <Route path="" element={<Dashboard ></Dashboard>} />

              <Route path="users" element={<UserDashboard></UserDashboard>} />
              <Route path="addproduct" element={<Addproduct></Addproduct>} />
              <Route path="products" element={<Product></Product>} />


              <Route path="category" element={<CategoryAdmin></CategoryAdmin>} />
              <Route path="orders" element={<OrderAdmin></OrderAdmin>} />

              </Route>
        </Routes>
        
      </Router></div>}

    </div>
  );
}

export default App;
