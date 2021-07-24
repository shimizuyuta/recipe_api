require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    if((authHeader !==undefined) && (authHeader.split(" ")[0] === "Bearer")){
        try{
           const token =authHeader.split(" ")[1];

           jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if((!err)&&(req.session.token===authHeader.split(" ")[1])){
                    next()
                }
                else{
                    return res.status(503).send({message________:err})
                }
              
           })         

        }
        catch(e){
            return res.status(401).send({message:`ログインしてください`})
        }
    }else{
        return res.status(401).send({message:`invalid token `})
    }
}

const generateToken = (userData)=>{    
    return jwt.sign({id:userData.id},process.env.JWT_SECRET,{expiresIn:120})
}
module.exports={
    verifyToken:verifyToken,
    generateToken:generateToken
}