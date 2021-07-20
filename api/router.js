require('dotenv').config();
const express = require('express')
const router = express()
// const db = require('../models/user')
const User = require('../models/user');
var db = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uuid } = require('uuidv4');
const { check, validationResult } = require('express-validator');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    console.log(authHeader,'authheader')
    if((authHeader !==undefined) && (authHeader.split(" ")[0] === "Bearer")){
        try{
           const token =authHeader.split(" ")[1];
           console.log('token_______',authHeader.split(' ')[1])

           jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
               if(err){
                   console.log('eroooooooooooooooooooo')
                   
                   return res.status(503).send({message:'error token'})
               }else{
                   console.log('adddddddddddddddddd')
                   req.token = decoded;
                   next()
               }
           })
           //tokenに含まれるidと受け取ったリクエストのuserのidが一致するか調べる
           //tokenの有効期限が切れてないかチェックする
           

        }catch(e){
            return res.status(401).send({message:`invalid token ${e.message}`})
        }
    }else{
        return res.status(401).send({message:`invalid token `})
    }
}

router.get('/',verifyToken,(req,res)=>{
    console.log('aaaaaaaaaaaa',req)
    console.log('get /',req.headers)
    res.send(200,{message:'you can do it'})
})

router.get('/users',async(req,res,next)=>{

   try{
    await db.user.findAll()
    .then((response)=>{
       console.log(response)
       res.send(200)
       
    })

   }catch(e){
       console.log(message,e.message)
       res.send({'error':error.message})
   }


})


router.get('/recipes',async(req,res)=>{
    try{
     await db.recipe.findAll()
     .then((response)=>{
         res.send(response)
     })
     .catch(()=>{
         res.send({'error':e.message})
     })
 
    }
    catch(e){
        res.send({'error':e.message})
    }
 
 
 })

 router.get('/user/:id',verifyToken,async(req,res)=>{
    const bearToken = await req.headers['authorization'];
    const userId = req.params.id
     db.user.findOne({where:{id:userId}})
     .then(user=>{
        console.log('user',user)
         res.send(user)
     })
     .catch((e)=>{
         res.send({'userId_error':e.message})
     })
 })

 router.post('/login',async(req,res,next)=>{
     try{
         //passwordとidが入っているか判定
       if(!(req.body.email) || !(req.body.password)){
           console.log('req.body',req.body.email)
           return res.status(200).send({message:'params miss'})
       }
       console.log(13)
       const email = req.body.email;
       const password = req.body.password
　　　　　　//入力されたpasswordをハッシュ化する
       const salt = await bcrypt.genSalt()
       const hashed_password= bcrypt.hashSync(password, salt);
       const match = await bcrypt.compare(
        password,
        hashed_password
       );      
       console.log(2)
       if(!match)return res.status(200).send({message:'パスワードまたはメールアドレスに間違いがあります。'})
       const params ={
           where:{
            email:email,
           }
       }
       console.log(1)
　　　　//該当するuserが存在する場合
       const userData = await db.user.findOne(params)
       console.log(userData,'userData')

       if(userData == null){
           return res.status(401).send(JSON.stringify({message:'ユーザーが見つかりません。'}))
       }
       console.log(userData.id,'userData')
　　　　
       const token = jwt.sign(
 　　　　　{id:userData.id},
          process.env.JWT_SECRET,
          { expiresIn: 40 }
       );
       console.log('token',token)
       return res.json({token})

     }catch(e){

     };
 })


 router.post('/register',async(req,res)=>{
     try{
         //id password がDBにあるかを照合する
　　　　　const user = await db.user.findOne({where:{email:req.body.email}})
         console.log('user',user)
         if(!(user==null)){
            const match = await bcrypt.compare(
                req.body.password,
                user.password
            );
            console.log('match',match)
            if(match) return res.json({message:'このメールアドレスのユーザーが存在します。別のメールアドレスを使用して下さい。'})    
         }

        //id password を新規作成する
        const id = uuid()
        const now = Date()
        const hashed_password = await bcrypt.hash(req.body.password,10);
        const params = {
                id:id,
                name:req.body.name,
                email:req.body.email,
                password:hashed_password,
                created_at: now,
                updated_at:now,
        }
        await db.user.create(params)
        .then((user)=>{
            console.log(user,'create user');
            res.status(200).send({message:'create new user'})
        })
     
        .catch((e)=>{
            console.log(e.message,'error________')
            res.send(503)
        })

        
     }catch(err){
           res.status(200).send({message:err.message})
     }
 })

module.exports = router;