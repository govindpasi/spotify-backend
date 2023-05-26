const jwt =require('jsonwebtoken');
require('dotenv').config();

const isLoggedIn =(req,res,next)=>{

    let valid =req.headers['authorization'];

    if(!valid){
       return  res.send({msg:"Please login to access!"})
    }

    let token = req.headers['authorization'].split(' ')[1];

     jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return  res.send({msg:"Please provide valid token!"})

        req.body.userId =decoded.userId

        next();
     })

    



}

module.exports =isLoggedIn;