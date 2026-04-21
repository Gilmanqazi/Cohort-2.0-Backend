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
 * 🛠️ FOLDER STRUCTURE PATH LOGIC:
 * Aapki file 'Backend/src/app.js' mein hai. 
 * Frontend tak pahunchne ke liye humein 3 steps piche jana hoga:
 * 1. src se bahar -> Backend
 * 2. Backend se bahar -> Snitch (Root)
 * 3. Phir Frontend/dist mein entry.
 */
const frontendPath = path.resolve(__dirname, "..", "..", "..", "Frontend", "dist");

// Server logs mein ye zaroor check karein deploy ke baad
console.log("📂 Target Frontend Path:", frontendPath);

if (fs.existsSync(frontendPath)) {
    console.log("✅ Frontend Dist Found!");
} else {
    console.warn("⚠️ WARNING: Frontend Dist NOT Found! Make sure 'npm run build' is successful.");
}

// 1. GLOBAL MIDDLEWARES
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

// 2. PASSPORT CONFIG
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

// 3. API ROUTES (Inhe pehle rakhein)
app.use("/api/auth", authRouter)
app.use("/api/products", Routes)
app.use("/api/products", cartRoute)

// 4. STATIC FILES (Frontend ke assets serve karne ke liye)
app.use(express.static(frontendPath));

/**
 * 5. CATCH-ALL MIDDLEWARE (SPA Routing Fix)
 * Agar koi route API se match nahi hota, toh seedha index.html bhej dein.
 * Isse /login, /register, etc. refresh karne par 404 nahi aayega.
 */
app.use((req, res, next) => {
    if (!req.path.startsWith("/api")) {
        const indexPath = path.join(frontendPath, "index.html");
        
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            // Agar yahan tak aaya matlab build missing hai
            res.status(404).send("Frontend build not found. Check Render Build Command.");
        }
    } else {
        // Agar /api wali request galat hai
        res.status(404).json({ success: false, message: "API endpoint not found" });
    }
});

export default app;