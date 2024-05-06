const jwt= require("jsonwebtoken")
const verifyJwt=(req,res,next)=>{
    const authorization =req.headers.authorization || req.headers.Authorization
    if(!authorization?.startsWith("Bearer ")){
        return res.status(400).send("Unathotization")
    }
    const token=authorization.split(" ")[1]
    jwt.verify(token,
        process.env.TOKEN_PASSWORD,
        (err,decoded)=>{
        if(err){
            return res.status(403).send("Forbidden")
        }
        req.user=decoded
        next()
    
    })

}
module.exports=verifyJwt
