
const { response } = require('express');
var db = require('../../models');
const bcrypt = require('bcrypt');

const GetUsers = (req,res,next) =>{
   try{
        db.user.findAll()
        .then((response)=>{
        console.log(response)
        return res.status(200).send({users:response})
      })
   }catch(e){
        res.status(503).send({message:e.message})
   }
};

const GetOneUser = async(req) =>{
    try{
        const params = {}
        console.log('body___',req.body)

        for(const[key,value] of Object.entries(req.body)){
             if((key=="email") || (key=="id")){
                params[key] = req.body[key]
             }
        }

         const oneUser = await db.user.findOne({where:params,raw:true})
         let match = true;
         if(req.body.password!=undefined){
              match = await bcrypt.compare(
                 req.body.password,
                 oneUser.password
             )
         }
         if(oneUser!=null && match)return oneUser
         else{
             return null
         }

   }catch(e){
      console.log('444444444444444',e.message)
   }    
};





module.exports={ 
    GetUsers:GetUsers,
    GetOneUser:GetOneUser,

}