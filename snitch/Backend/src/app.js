import cookieParser from "cookie-parser"
import express from "express"
import morgan from "morgan"
import authRouter from "./Routes/auth.route.js"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import passport from "passport"
import { config } from "./config/config.js"
import cors from "cors"
import Routes from "./Routes/product.route.js"
import cartRoute from "./Routes/addToCart.route.js"
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path"


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 💡 IMPORTANT: 
 * Agar app.js 'Backend/src' folder ke andar hai, toh 2 baar bahar jana hoga ("..", "..").
 * Agar app.js directly 'Backend' root mein hai, toh sirf 1 baar ("..") kaafi hai.
 */
const frontendPath = path.resolve(__dirname, "..", "..", "Frontend", "", "dist");

// Server start hote hi path validation
if (fs.existsSync(frontendPath)) {
    console.log("✅ Frontend Dist Found at:", frontendPath);
} else {
    console.warn("⚠️ WARNING: Frontend Dist NOT Found! Path checked:", frontendPath);
    console.info("👉 Tip: Run 'npm run build' inside your 'Perplexity-Frontend' folder.");
}

app.use(passport.initialize())

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://cohort-2-0-backend-16.onrender.com/api/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile)
}
))

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
  origin: [
    "https://voguenr-frontend-ecommerce.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}))

// 🔥 API ROUTES
app.use("/api/auth", authRouter)
app.use("/api/products", Routes)
app.use("/api/products", cartRoute)

// ❌ NO static / NO catch-all needed

export default app