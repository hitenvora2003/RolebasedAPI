const user = require('../model/user')
const jwt = require('jsonwebtoken')

exports.authcheck = async(req,res,next)=>{
    try{
       const token = req.headers.authorization
       if(!token)throw new Error("please attach token")

       const tokenverify = jwt.verify(token,'ten')
       if(!tokenverify)throw new Error("invalid token")

      const userverify = await user.findById(tokenverify.id)
      if(!userverify)throw new Error("invalid user")
      
        req.user = userverify

    next()
    }
    catch(error){
          res.status(500).json({
            status: "fail",
            message: error.message

        })
    }
}
exports.issuperAdmin = async(req,res,next)=>{
    if(req.user.role !== "superAdmin"){
        return res.status(403).json({
            status : 'fail',
            message : "Only superAdmin allowed"
        })
    }
    next()
}