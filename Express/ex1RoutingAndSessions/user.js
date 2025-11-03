const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const usersSchema =new mongoose.Schema({
    username:{
        type:mongoose.SchemaTypes.String,
        required : true,
    },
    password:{
        required:true,
        type:mongoose.SchemaTypes.String,
    }
})

const userModel = mongoose.model("user",usersSchema)


router.post("/addUser",async (req,res)=>{
    const UserName = req.body.username;
    const Password = req.body.password;
    if(await addUser(UserName,Password)){
        return res.json({message : "User added successfully"})
        next()
    }
    return res.json({message : "User not added"})
})


async function addUser(username,password){
    const user = new userModel({username : username , password : await bcrypt.hash(password,10) })  
    await user.save()
    return true;
}

async function checkUser(username, password){{
    const isExist =await userModel.findOne({username : username})
    if(isExist){
        return  bcrypt.compare(password, isExist.password)
    }
    return false
}}


module.exports = {router , checkUser , addUser}
