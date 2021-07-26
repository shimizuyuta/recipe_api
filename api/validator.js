const { check, validationResult } = require('express-validator');



//いろいろなvalidation
const keyCheck = [
    check('password').not().isEmpty().withMessage('必須項目です。'),
    check('email').not().isEmpty().withMessage('必須項目です。') 
    .isEmail().withMessage('有効なメールアドレスではありません。'),
]

//validationError処理
const validatorError=(req,res,next)=>{
    console.log(req.body)
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(500).send(errors.errors)
    }
    console.log('next')
    next()
}

const loginCheckParams = (req,res,next) =>{
    keyCheck
    validatorError(req,res,next)
}


module.exports={
    validatorError:validatorError,
    keyCheck:keyCheck,
    loginCheckParams:loginCheckParams,
}