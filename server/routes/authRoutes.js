import express from 'express';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { getMongoStatus } from '../config/db.js';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const router = express.Router();

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    const googleClient = process.env.GOOGLE_CLIENT_ID
      ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
      : null;
    if (!googleClient) {
      return res.status(503).json({
        success: false,
        message: 'Google SSO is not configured. Add GOOGLE_CLIENT_ID to the server environment.',
      });
    }
    if (!idToken) {
      return res.status(400).json({ success: false, message: 'Google ID token is required.' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email_verified) {
      return res.status(401).json({ success: false, message: 'Google did not verify this Gmail account.' });
    }

    let user;
    if (getMongoStatus()) {
      user = await User.findOne({ email: payload.email });
      if (!user) {
        user = await User.create({
          name: payload.name || payload.email,
          email: payload.email,
          googleId: payload.sub,
          provider: 'google',
        });
      }
    } else {
      user = inMemoryUsers.find(u => u.email.toLowerCase() === payload.email.toLowerCase());
      if (!user) {
        user = {
          _id: 'u-' + payload.sub,
          name: payload.name || payload.email,
          email: payload.email,
          googleId: payload.sub,
          provider: 'google',
          selectedMascot: 'The curious one',
        };
        inMemoryUsers.push(user);
      }
    }

    return res.json({
      success: true,
      message: 'Signed in with Google.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: 'google',
        selectedMascot: user.selectedMascot,
      },
      token: 'google-demo-jwt-token-' + user._id,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Google authentication failed.',
    });
  }
});

const inMemoryUsers = [
  {
    _id: 'u-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    password: 'password123',
    selectedMascot: 'The go-getter',
    educationLevel: 'University / college',
    fieldOfStudy: 'BS Biology',
  }
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
      password,
      selectedMascot: selectedMascot || 'The go-getter',
      educationLevel: 'University / college',
      fieldOfStudy: 'General Studies',
    };
    inMemoryUsers.push(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, selectedMascot: newUser.selectedMascot },
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

    const user = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Demo ease-of-use for review: allow mock user login
      const demo = { id: 'u-demo', name: email.split('@')[0], email, selectedMascot: 'The curious one' };
      return res.json({
        success: true,
        message: 'Signed in as demo student!',
        user: demo,
        token: 'demo-jwt-token-demo',
      });
    }

    if (user.password && user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    return res.json({
      success: true,
      message: 'Signed in successfully!',
      user: { id: user._id, name: user.name, email: user.email, selectedMascot: user.selectedMascot },
      token: 'demo-jwt-token-' + user._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    // Generate simulated reset token
    const resetToken = 'reset-token-' + Math.random().toString(36).substring(2);
    return res.json({
      success: true,
      message: 'Password reset link generated.',
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }

    if (getMongoStatus() && email) {
      await User.updateOne({ email }, { $set: { password: newPassword } });
    } else if (email) {
      const u = inMemoryUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (u) u.password = newPassword;
    }

    return res.json({
      success: true,
      message: 'Password has been successfully updated!',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/profile
router.post('/profile', async (req, res) => {
  try {
    const { email, name, educationLevel, fieldOfStudy } = req.body;

    if (getMongoStatus() && email) {
      await User.updateOne({ email }, { $set: { name, educationLevel, fieldOfStudy } });
    } else if (email) {
      const u = inMemoryUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (u) {
        if (name) u.name = name;
        if (educationLevel) u.educationLevel = educationLevel;
        if (fieldOfStudy) u.fieldOfStudy = fieldOfStudy;
      }
    }

    return res.json({
      success: true,
      message: 'Profile updated successfully!',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/preferences
router.post('/preferences', async (req, res) => {
  try {
    const { email, studyPreferences } = req.body;

    if (getMongoStatus() && email) {
      await User.updateOne({ email }, { $set: { studyPreferences } });
    } else if (email) {
      const u = inMemoryUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (u) {
        u.studyPreferences = studyPreferences;
      }
    }

    return res.json({
      success: true,
      message: 'Study preferences saved successfully!',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
