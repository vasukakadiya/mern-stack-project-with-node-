require('dotenv').config()
const jwt=require("jsonwebtoken")

const secretKey=process.env.JWT_SECRET_KEY;

function authentication(req,res,next)
{
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    //return res.redirect('/login');
     // Redirect to login page

     return res.status(401).json({st:"noToken"})
  }

  jwt.verify(token, secretKey,   (err, decoded) => {
    if (err) {
       //return res.redirect('http://localhost:5000/showdata');
      //  Redirect to login page
      console.log(err)  
     return res.send({st:"noToken"})

    }
    req.user = decoded;
    // console.log(req.user)
    next();
  });
}

module.exports=authentication