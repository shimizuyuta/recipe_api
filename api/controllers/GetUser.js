
const { response } = require('express');
var db = require('../../models');
const bcrypt = require('bcrypt');

const GetUsers = async(req,res,next) =>{
   try{
        const users = await db.user.findAll({})
        return users
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
        console.log(params,'params')

         const oneUser = await db.user.findOne({where:params,raw:true})
         console.log(oneUser,'get user')
         let match = true;
         if(req.body.password!=undefined){
              match = await bcrypt.compare(
                 req.body.password,
                 oneUser.password
             )
         }
         if(oneUser!=null && match){
             console.log('aaa')
             return oneUser
         }
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