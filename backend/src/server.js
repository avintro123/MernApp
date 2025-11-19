import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
}
));

// Apply rate limiting middleware
app.use(rateLimiter);


// app.use((req, res, next) => {
//     console.log("We just got a new req");
//     next();
// })

app.use("/api/notes", notesRoute);
app.use('/uploads', express.static('uploads'));

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});