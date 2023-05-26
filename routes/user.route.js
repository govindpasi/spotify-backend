const express =require('express');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const userRouter =express.Router();


// /users/register ==> To register a new user.
// /users/login ==> For logging in generating a token

userRouter.post('/users/register',async(req,res)=>{

    try {
        const {name,email,year,month,day,password} =req.body;

        let isExisting =await User.findOne({email:email})

        if(isExisting){
           return res.send({msg:"Account already exists please login",status:"error"})
        }

        bcrypt.hash(password,5,async(err,hash)=>{
            if(err) res.send({
                msg:"Something went wrong in bcrypt"
            })

            const user =await  User.create({
                name,
                email,
                year,
                month,
                day,
                password:hash
            })

            res.status(201).send({msg:"Successfully created User",status:"success"})
        
        })
        
        
    } catch (error) {
        
    }
    
})


userRouter.post('/users/login',async(req,res)=>{

    try {

        let {email,password} =req.body;

        let isExisting =await User.findOne({email:email})

        if(!isExisting){
           return res.send({msg:"Account doesn't exists please register",status:"error"})
        }

        bcrypt.compare(password,isExisting.password,(err,result)=>{
            if(err) res.send({msg:"error in bcrypt compare"});

            if(!result){
               return res.send({msg:"password mismatch",status:"error"})
            }
           
           let token = jwt.sign({userId:isExisting._id},process.env.JWT_SECRET)
            
           res.send({data:isExisting,token,status:"success"})

        })
        
    } catch (error) {
        
    }

})


module.exports =userRouter;