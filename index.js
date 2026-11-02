// server.js
import express from "express";
import cors from "cors"
import v1Router from "./src/routes/v1.router.js"
import v2Router from "./src/routes/v2.router.js";
import rateLimit from "express-rate-limit";

const app = express();

const avatarLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 5,              // Limit to 5 requests
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please wait.'
    }
});

app.set('trust proxy', 1)
app.use(express.json());
app.use(cors())
app.use('/v1', avatarLimiter);
app.use('/v2', avatarLimiter);
app.use('/avatar', avatarLimiter);
// routes

app.use("/v1", v1Router);
app.use("/v2", v2Router);

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Avatar API running on port ${PORT}`);
});
