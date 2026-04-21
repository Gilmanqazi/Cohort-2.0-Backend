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
 * 🛠️ PATH CORRECTION:
 * Render par folder structure ke mutabiq frontend ko point karein.
 */
const frontendPath = path.resolve(__dirname, "..", "..", "Frontend", "dist");

// Path validation log (Terminal mein check karein)
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

// 3. API ROUTES (Pehle check hote hain)
app.use("/api/auth", authRouter)
app.use("/api/products", Routes)
app.use("/api/products", cartRoute)

// 4. STATIC FILES (Frontend ke CSS/JS assets ke liye)
app.use(express.static(frontendPath));

/**
 * 5. CATCH-ALL MIDDLEWARE:
 * Isse 'PathError' nahi aayega kyunki hum string pattern matching nahi kar rahe.
 * Yeh har non-API request ko index.html par redirect karega (SPA Routing).
 */
app.use((req, res, next) => {
    // Agar request API ki nahi hai (jaise /login, /cart, /home)
    if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(frontendPath, "index.html"));
    } else {
        // Agar /api wali request yahan tak aayi, matlab backend mein route nahi mila
        res.status(404).json({ message: "API Route not found" });
    }
});

export default app;