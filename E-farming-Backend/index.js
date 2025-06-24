const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { connectDB } = require("./connection.js");

const authenticateToken = require("./middleware/middleware.js")

const app = express();
const PORT = 8000;

connectDB("mongodb://127.0.0.1:27017/mini-project");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const path = require("path");


app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoute.js");
app.use("/auth", authRoutes);

const userRoute = require("./routes/userRoute.js");
app.use("/user", authenticateToken,  userRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
