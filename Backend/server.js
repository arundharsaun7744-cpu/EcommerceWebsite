require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const port = process.env.PORT || 8000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// Middlewares
app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const userRouter = require("./routes/userdata.route");
app.use("/api", userRouter);

const authRouter = require("./routes/auth.route");
app.use("/api/auth", authRouter);

// Server Start
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});