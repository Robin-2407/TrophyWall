const express = require("express");
const app = express();
const db = require("./connections/conn");
require("dotenv").config();
const user = require("./routes/userRoute");

//Routes create for user signup
app.use(express.json());
app.use("/api/user", user);


// post
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
