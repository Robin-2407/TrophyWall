const router = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcryptjs");

// signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    if (username.length < 3 || username.length > 20) {
      return res
        .status(400)
        .json({ error: "Username must be between 3 and 20 characters" });
    }
    if (password.length < 6 || password.length > 20) {
      return res
        .status(400)
        .json({ error: "Password must be between 6 and 20 characters" });
    }

    const usernameExists = await user.findOne({ username: username });
    if (usernameExists) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const useremailExists = await user.findOne({ email: email });
    if (useremailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const currentUser = await user.findOne({ username: username });
    if (!currentUser) {
      // Log the specific error server-side but return generic message
      console.log(`Login failed: username ${username} not found`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) {
      // Log the specific error server-side but return generic message
      console.log(`Login failed: incorrect password for user ${username}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

module.exports = router;
