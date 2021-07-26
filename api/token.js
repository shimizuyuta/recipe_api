require('dotenv').config();
const e = require('connect-timeout');
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    if((authHeader !==undefined) && (authHeader.split(" ")[0] === "Bearer")){
        try{
           const token =authHeader.split(" ")[1];

           jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if((!err)&&(req.session.token===authHeader.split(" ")[1])){
                    console.log('verify_token')
                    console.log('aaaaa',req.session)
                    next()
                }
                else{
                    console.log(req.session,'session__________')
                    console.log(authHeader.split(" ")[1])
                    // return res.status(503).send({message________c:err})
                    return (err==null)?res.status(200).send("再ログインしてください"):res.status(500).send({message:e})
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
    return jwt.sign({id:userData.id},process.env.JWT_SECRET,{expiresIn:"1h"})
}
module.exports={
    verifyToken:verifyToken,
    generateToken:generateToken
}