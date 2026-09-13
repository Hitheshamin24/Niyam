const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorMiddlewares");

// create express app
const app = express();

// middleware
// allow the react frontend to talk  to this server
app.use(
  cors({
    origin: process.env.CLIENT_API,
    credentials: true,
  }),
);

// parse incoming JSON requests
app.use(express.json());
// parse URL-encoded data
app.use(express.urlencoded({ extended: false }));
// parse cookies (needed for the httpOnly refreshToken cookie)
app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  res.json({
    message: "Niyam API is running",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/habits", require("./routes/habits"));

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware (must be registered last)
app.use(errorHandler);

module.exports = app;
