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
 * 🛠️ DYNAMIC PATH LOGIC (Local vs Render)
 * Render par environment variable 'RENDER' automatically true hota hai.
 */
const frontendPath = process.env.RENDER 
    ? path.join(process.cwd(), "..", "Frontend", "dist") // Render structure
    : path.resolve(__dirname, "..", "..", "Frontend", "dist"); // Local structure

// Server log for debugging
if (fs.existsSync(frontendPath)) {
    console.log("✅ Frontend Dist Found at:", frontendPath);
} else {
    console.warn("⚠️ WARNING: Frontend Dist NOT Found! Path checked:", frontendPath);
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

// 3. API ROUTES
app.use("/api/auth", authRouter)
app.use("/api/products", Routes)
app.use("/api/products", cartRoute)

// 4. STATIC FILES (Frontend build serve karein)
app.use(express.static(frontendPath));

/**
 * 5. CATCH-ALL MIDDLEWARE (SPA Routing Fix)
 * Isse /login, /cart, /register par 'Not Found' error nahi aayega.
 * 'PathError' se bachne ke liye hum generic middleware use kar rahe hain.
 */
app.use((req, res, next) => {
    if (!req.path.startsWith("/api")) {
        const indexPath = path.join(frontendPath, "index.html");
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send("Frontend build not found. Please run 'npm run build'.");
        }
    } else {
        res.status(404).json({ success: false, message: "API Route not found" });
    }
});

export default app;