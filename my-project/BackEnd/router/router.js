const express = require("express");
const router = express.Router();
const Todo = require("../model/todoSchema");
const User = require("../model/userSchema");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // Create user (password ko raw save karo, schema hashing karega)
    const user = new User({ email, password });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1d" });

    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Get todos for logged-in user
router.get("/todos", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
});

// Add todo for logged-in user
router.post("/todos", auth, async (req, res) => {
  try {
    const todo = new Todo({ ...req.body, user: req.user });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update todo
router.patch("/todos/:id", auth, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(todo);
});

// Delete todo
router.delete("/todos/:id", auth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Deleted" });
});

module.exports = router;