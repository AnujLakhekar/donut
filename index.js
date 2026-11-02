// server.js
import express from "express";
import cors from "cors"
import v1Router from "./src/routes/v1.router.js"
import v2Router from "./src/routes/v2.router.js";


const app = express();
app.use(express.json());
app.use(cors())


// routes

app.use("/v1", v1Router);
app.use("/v2", v2Router);

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Avatar API running on port ${PORT}`);
});
