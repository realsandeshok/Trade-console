// controllers/userController.js
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET=""

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userModel.getUserByEmailAndPassword(email, password);
      if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, "kahaanSecret", { expiresIn: "1h" });
        res.json({ message: 'Valid user', token, role: user.role });
        // res.json({ message: 'Valid user' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async deleteUser(req, res) {
    const { id } = req.params;
    // console.log(id);
    try {
      // Delete the user from the database
      const result = await userModel.deleteUserById(id);
    // console.log(id);

      if (result.rowCount > 0) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async signupUser(req, res) {
    const { username, email, password, role } = req.body;
    try {
      // Perform validation if needed
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
      }

      // Check if the email already exists
      const existingUser = await userModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      // Hash the password before storing it
      const hashedPassword = password;

      // Insert the new user into the database
      const newUser = await userModel.addUser({ username, email, password: hashedPassword, role });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
