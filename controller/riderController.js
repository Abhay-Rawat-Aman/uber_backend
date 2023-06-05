const Rider = require('../models/rider')

//Register a rider
exports.registerRider = async(req,res) => {
    try
    {
        const {fname,lname,mobile,username,password}=req.body;
        const checkUserId = await Rider.findOne({username});
        if(checkUserId)
            return res.status(400).json({
                success:false,
                message:"This username is exist"
            });
            
        if(mobile.length!=10 || mobile[0]==0)
            return res.status(401).json({
                success:false,
                message:"Please enter the correct contact no of 10 digits"
            });
        if(password.length<8)
            return res.status(401).json({
                success:false,
                message:"Password should be atleast 8 characters "
            });
        
        const user = await Rider.create({
            fname,lname,mobile,username,password
        });
        
        return res.status(201).json({
            success:true,
            user
        });
    }
    catch(err)
    {
        console.log(err.message);
    }
}

//login a Rider
exports.loginRider = async(req,res) => {
    try
    {
        const {username,password}=req.body;
        const rider = await Rider.findOne({username});
        if(!rider)
            return res.status(401).json({
                success:false,
                message:"Invalid username or password"
            });
        
        const isPasswordMatched = await rider.comparePassword(password);
        if(!isPasswordMatched)
            return res.status(401).json({
                success:false,
                message:"Invalid username or password"
            });
        const token = rider.getJWTToken();
        return res.status(200).json({
            success:true,
            token
        })
    }
    catch(err)
    {
        console.log(err.message);
    }
}
