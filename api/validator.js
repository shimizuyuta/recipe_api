const { check, validationResult } = require('express-validator');

const reqCheck = (req,res,next) =>{
    let checkFunc;
   checkFunc = check('name').not().isEmpty()
   return checkFunc
}


const keyCheck = [
    check('password').not().isEmpty().withMessage('必須項目です。'),
    check('email').not().isEmpty().withMessage('必須項目です。') 
    .isEmail().withMessage('有効なメールアドレスではありません。'),
]

const validatorError=(req,res)=>{
    const validationError = new Error()
    const errors = validationResult(req)
    console.log(errors)
    console.log(errors.errors)

    if(!errors.isEmpty()){
        return res.status(500).send({message:errors})
    }
}

module.exports={
    validatorError:validatorError,
    reqCheck:reqCheck,
    keyCheck:keyCheck,
}