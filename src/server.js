import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";

config();
connectDB();

const app = express();


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5001;

app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)
app.use("/watchlist", watchListRoutes)

app.get("/", (_, res) => {
    res.json({ message: "Hello, World!" });
    console.log("Someone accessed the root route");
})

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// Error handling for unhandled promise rejections, uncaught exceptions, and SIGTERM signals
process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
})

process.on("uncaughtException", (err) => {
    console.log("uncaughtException: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
})

process.on("SIGTERM", (err) => {
    console.log("SIGTERM received: ", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
})

