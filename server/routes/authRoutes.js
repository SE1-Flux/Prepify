import express from 'express';
import { User } from '../models/User.js';
import { getMongoStatus } from '../config/db.js';

const router = express.Router();

const inMemoryUsers = [
  { _id: 'u-1', name: 'Demo Student', email: 'demo@prepify.edu', selectedMascot: 'The go-getter' }
];

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, selectedMascot } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    if (getMongoStatus()) {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with that email already exists.' });
      }
      const user = await User.create({ name, email, password, selectedMascot: selectedMascot || 'The go-getter' });
      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        user: { id: user._id, name: user.name, email: user.email, selectedMascot: user.selectedMascot },
        token: 'demo-jwt-token-' + user._id,
      });
    }

    const newUser = {
      _id: 'u-' + Date.now(),
      name,
      email,
      selectedMascot: selectedMascot || 'The go-getter',
    };
    inMemoryUsers.push(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully (In-Memory)!',
      user: newUser,
      token: 'demo-jwt-token-' + newUser._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    if (getMongoStatus()) {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }
      return res.json({
        success: true,
        message: 'Welcome back to Prepify!',
        user: { id: user._id, name: user.name, email: user.email, selectedMascot: user.selectedMascot },
        token: 'demo-jwt-token-' + user._id,
      });
    }

    const user = inMemoryUsers.find(u => u.email === email);
    if (!user) {
      // Allow demo login
      const demo = { id: 'u-demo', name: email.split('@')[0], email, selectedMascot: 'The curious one' };
      return res.json({
        success: true,
        message: 'Signed in as demo student!',
        user: demo,
        token: 'demo-jwt-token-demo',
      });
    }

    return res.json({
      success: true,
      message: 'Signed in successfully!',
      user,
      token: 'demo-jwt-token-' + user._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
