const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", userRoute);

// Database connection
mongoose
  .connect("mongodb://localhost:27017/trophywall")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
