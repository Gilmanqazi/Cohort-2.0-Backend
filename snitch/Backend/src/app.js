import cookieParser from "cookie-parser"
import express from "express"
import morgan from "morgan"
import authRouter from "./Routes/auth.route.js"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import passport from "passport"
import { config } from "./config/config.js"
import cors from "cors"
import Routes from "./Routes/product.route.js"
const app = express()

app.use(passport.initialize())

passport.use(new GoogleStrategy({
clientID:config.GOOGLE_CLIENT_ID,
clientSecret:config.GOOGLE_CLIENT_SECRET,
callbackURL:"http://localhost:5173/api/auth/google/callback"
},
(accessToken,refreshToken,profile,done) =>{
  return done(null, profile)
}
))

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  methods: [ "GET", "POST", "PUT", "DELETE" ],
  credentials: true
}))

app.use("/api/auth",authRouter)
app.use("/api/products",Routes)

export default app