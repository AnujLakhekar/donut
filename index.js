// server.js
import express from "express";
import cors from "cors"
import v1Router from "./src/routes/v1.router.js"
import v2Router from "./src/routes/v2.router.js";
import rateLimit from "express-rate-limit";

const app = express();

const avatar_rateLimit = rateLimit({
    windowMs: 10 * 1000,
    max: 5,
    standardHeaders: true, // Return rate limit info in headers `RateLimit-*`
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    message: {
        status: 429,
        error: 'Too many avatar requests from this IP, please try again later.'
    }
})

app.set('trust proxy', 1)
app.use(express.json());
app.use(cors())
app.use("/v1", avatar_rateLimit);

// routes

app.use("/v1", v1Router);
app.use("/v2", v2Router);

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Avatar API running on port ${PORT}`);
});
