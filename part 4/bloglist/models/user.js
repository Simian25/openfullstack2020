const mongoose = require('mongoose')
const uniqueValidator =require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username:  {
        type: String,
        unique: true,
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]

})
userSchema.set('toJSON',{
    transform: (doc,retObj)=>{
        retObj.id = retObj._id.toString();
        delete retObj.id;
        delete retObj.__v
        delete retObj.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',userSchema)