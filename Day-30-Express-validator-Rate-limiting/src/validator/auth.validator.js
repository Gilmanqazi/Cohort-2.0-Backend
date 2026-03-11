import { body, validationResult } from "express-validator"

const validate = (req,res,next)=>{
  const errors = validationResult(req)

  if(errors.isEmpty()){
    return next()
  }

  res.status(400).json({
    errors:errors.array()
  })
}

export const registerValidation = [
  body("username").isString().withMessage("Username should be a string"),
  body("email").isEmail().withMessage("email address should be a vlaid emailaddredd"),
  body("password").isLength({min:6,max:10}).withMessage("min"),
  validate
]