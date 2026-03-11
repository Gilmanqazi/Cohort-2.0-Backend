export async function registerUser (req,res,next){
// try{
//   throw new Error("Password is to weak");
// }catch(err){
// err.status = 400
//   next(err)
// }

res.status(200).json({
  message:"User register success"
})
}