require('dotenv').config();
const express = require('express')
const router = express()
var db = require('../models/');
const bcrypt = require('bcrypt');

const {keyCheck,validatorError} = require('./validator')
const { check, validationResult } = require('express-validator');
const {CreateUser} = require('./controllers/CreateUser')
const {GetUsers,GetOneUser} = require('./controllers/GetUser')
const {verifyToken,generateToken} = require('./token')
const Auth = require('./controllers/Auth')
const getRecipes = require('./controllers/GetRecipes')


router.post('/users',verifyToken,GetUsers)
router.post('/user/id',verifyToken,GetOneUser)


router.post('/recipes',getRecipes.main)
router.post('/logout',verifyToken,Auth.logout)
router.post('/logins',verifyToken,Auth.login)

 router.post('/login',
 [
    keyCheck
 ],
 async(req,res,next)=>{
        validatorError(req,res,next)
       Auth.login(req,res)
 })



 router.post('/register',async(req,res)=>{
     try{
         //id password がDBにあるかを照合する
         const user = await GetOneUser(req)
         if(user==null){
             CreateUser(req,res)
         }else{
             return res.status(200).send({message:'このメールアドレスは使用済みです'})
         }
        
     }catch(err){
           res.status(200).send(err.message)
     }
 })

module.exports = router;