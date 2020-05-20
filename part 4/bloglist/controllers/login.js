const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/user')
loginRouter.post('/',async (req,res,next)=>{
    const body =req.body
    const user = await User.findOne({username: body.username})
    const passwordCorrect = (user === null) ? false : await bcrypt.compare(body.password,user.passwordHash) //false if user is null, true if password matches
    if(!(user && passwordCorrect)){
        return res.status(401).json({error:'invalid username or password'})
    }
    const userForToken = {
        username: user.username,
        id:user._id
    }
    const token = jwt.sign(userForToken,process.env.SECRET)
    res
    .status(200)
    .send({token,username:user.username,name:user.name})
})
module.exports = loginRouter