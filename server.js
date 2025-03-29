import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/user_route.js";

dotenv.config();
const app = express();

// Connect to DB
connectDB(process.env.MONGO_URI);

// Route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
