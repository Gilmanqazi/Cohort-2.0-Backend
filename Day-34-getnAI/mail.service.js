import nodemailer from "nodemailer"

const transporter  = nodemailer.createTransport({
  service:"gmail",
  auth:{
    type:"OAuth2",
    user:process.env.GOOGLE_USER,
   refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
   clientId:process.env.GOOGLE_CLIENT_ID,
   clientSecret:process.env.GOOGLE_CLIENT_SECRET
  },
  tls:{
    rejectUnauthorized:false
  },
})
transporter.verify()
.then(()=>{console.log("Email transporter is ready to send email")})
  .catch(()=>{console.log("Emial transporter verification failed")})


export async function sendMail({to,subject,html,text=""}){


const mailOption  = {

  from:process.env.GOOGLE_USER,
  to,subject,html,text

}

const details = transporter.sendMail(mailOption)

console.log(details)

return "email sent seccessfully, to " + to;

  }