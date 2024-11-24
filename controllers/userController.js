const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users (Admin/Superadmin only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user (Superadmin only)
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update user details (Admin/Superadmin only)
const updateUser = async (req, res) => {
    const { name, email, role } = req.body;
  
    try {
      // Find user by ID
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Update the user details
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
  
      // Save the updated user
      await user.save();
  
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: "User updated successfully",
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error: " + err.message });
    }
  };
  
  module.exports = { registerUser, loginUser, getUsers, deleteUser, updateUser };
  
// module.exports = { registerUser, loginUser, getUsers, deleteUser };
