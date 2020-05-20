const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
//TODO: 4.17-4.22
userRouter.post('/',async(req,res)=>{
   const body =req.body
   const saltRounds = 10
   if(body.username && body.password){
   if(body.username.length<4){
    res.status(401).json({error:"username must be longer than 3 characters"})
  }
  else if(body.password.length<4){
    res.status(401).json({error:"password must be longer than 3 characters"})

    }
   else{
    const passwordHash = await bcrypt.hash(body.password,saltRounds)
   
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    const savedUser = await user.save();
 
    res.json(savedUser)
   }
  }else{
    res.status(401).json({error:"please enter username and password"})

  }
})
userRouter.get('/', async(req,res)=>{
    const users =await User.find({}).populate('blogs',{url: 1,title: 1,author: 1,})
    res.json(users.map(u=>u.toJSON()))
})
module.exports = userRouter
