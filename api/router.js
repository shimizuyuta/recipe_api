require('dotenv').config();
const express = require('express')
const router = express()
var db = require('../models/');
const bcrypt = require('bcrypt');

const {keyCheck,validatorError,loginCheckParams} = require('./validator')
const { check, validationResult } = require('express-validator');
const {CreateUser} = require('./controllers/CreateUser')
const {GetUsers,GetOneUser} = require('./controllers/GetUser')
const {verifyToken,generateToken} = require('./token')
const Auth = require('./controllers/Auth')
const getRecipes = require('./controllers/GetRecipes')


router.post('/users',verifyToken,async(req,res)=>{
    const users = await GetUsers(req)
    return res.status(200).send(users)
})

router.post('/user/id',verifyToken,async(req,res)=>{
    const user = await GetOneUser(req)
    console.log(user,'user_____')
    return (user===undefined)?res.send({message:'userが存在しません。'}):res.send(user)
})

router.post('/recipes',getRecipes.main)
router.post('/logout',verifyToken,Auth.logout)
router.post('/login',loginCheckParams,Auth.login)




 router.post('/register',async(req,res)=>{
     try{
         //id password がDBにあるかを照合する
         const user = await GetOneUser(req)
         console.log('user11111111',user)
        return (user==null)?CreateUser(req,res):res.status(200).send({message:'このメールアドレスは使用済みです'})
        
     }catch(err){
           res.status(200).send(err.message)
     }
 })

module.exports = router;