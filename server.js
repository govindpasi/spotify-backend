const express = require('express');
const connectDb = require('./config/db');
const cors =require('cors');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const isLoggedIn = require('./middlewares/auth');

const app =express();

app.use(express.json());
app.use(cors())
 
app.use('/',userRouter)
// app.use(isLoggedIn)
// app.use('/',isLoggedIn,postRouter)

connectDb().then(()=>{
    try {

        app.listen(process.env.PORT,()=>{
            console.log("listening to port 8080")
        })
        
    } catch (error) {

        console.log(error)
        
    }
})
