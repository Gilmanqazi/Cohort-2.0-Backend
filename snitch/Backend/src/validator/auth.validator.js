import {body,validationResult} from "express-validator"

function validationRequest(req,res,next){
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
 
  }
  next()
}

export const registerValidator = [
  body("fullname").notEmpty().withMessage("FullName is required")
  .isLength({min:(3)}).withMessage("FullName must be contains at least 3 character long"),
  body("contact").notEmpty().withMessage("contact is required")
  .matches(/^\d{10}$/).withMessage("Contact must be a 10 digit number"),
  body("email").isEmail().withMessage("Invalid email formate"),
body("password").isLength({min:(6)}).withMessage("Password should be at least 6 characters long"),
// body("isSaller").isBoolean().withMessage("isSaller must be a Boolean value"),

validationRequest
]

export const loginValidator = [
  body("email").isEmail().withMessage("invalid email formatte"),
  body("password").notEmpty().withMessage("Password is required"),
  
  validationRequest
]