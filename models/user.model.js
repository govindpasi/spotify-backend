const mongoose =require('mongoose');

const userSchema =new mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String, required:true},
    year : {type:String, required:true},
    month : {type:String, required:true},
    day : {type:String, required:true},
    password : {type:String, required:true}
})

const User = mongoose.model('user',userSchema);

module.exports =User;