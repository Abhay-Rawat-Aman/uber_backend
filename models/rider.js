const mongoose = require('mongoose')
const bycrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const {Schema} = mongoose;

const riderScheme = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

//hlo
riderScheme.pre('save',async function (next){
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password,salt);
    next();
})

//compared password
riderScheme.methods.comparePassword = async function (enteredPassword)
{
    return await bycrypt.compare(enteredPassword,this.password);
}

//JWT Token
riderScheme.methods.getJWTToken = function ()
{
    return jwt.sign(this._id.toString(),process.env.JWT_SECRET);
}

module.exports = mongoose.model("rider",riderScheme);