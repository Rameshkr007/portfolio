const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');

const generateToken = (id, username) => jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { username, password } = req.body;
    let admin = await Admin.findOne({ username });
    if (!admin && process.env.ADMIN_USERNAME && username === process.env.ADMIN_USERNAME) {
      admin = new Admin({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD });
      await admin.save();
    }
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin._id, admin.username);
    return res.status(200).json({ success: true, token, admin: { username: admin.username, lastLogin: admin.lastLogin } });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getProfile = (req, res) => res.status(200).json({ success: true, admin: req.admin });
