// server.js
import express from "express";
import cors from "cors"
import ApiRoutes from "./src/routes/routes.js"


const app = express();
app.use(express.json());
app.use(cors())


// routes

app.use(ApiRoutes)


export default app;

// Run local listener when not in production
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Avatar API running at http://localhost:3000");
  });
}
