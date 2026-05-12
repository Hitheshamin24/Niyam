const express = require("express");
const cors = require("cors");
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

app.use(errorHandler);

app.get("/health", (req, res) => {
  res.json({
    message: "Niyam API is running",
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
