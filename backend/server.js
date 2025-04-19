import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDb from "./config/connectDb.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config()
connectDb();



const app = express();
app.use(cors())
app.use(express.json())


app.use("/api/auth" , authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sessions' ,sessionRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})