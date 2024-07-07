import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET; // Access JWT secret from environment variables
const ADMIN_KEY = process.env.ADMIN_KEY; // Access admin key from environment variables

const registerAdmin = async (req, res) => {
  const { username, email, password, adminkey } = req.body;

  // Validate admin key
  if (adminkey !== ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Invalid admin key' });
  }

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newAdmin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: newAdmin.id }, JWT_SECRET, { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Max age in milliseconds (1 hour)

    res.status(201).json({
      success: true,
      message: 'Admin registered and logged in successfully',
      data: {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    if (error.meta && error.meta.target === 'Admin_email_key') {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    if (error.meta && error.meta.target === 'Admin_username_key') {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    console.error('Error registering admin:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Max age in milliseconds (1 hour)

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const logoutAdmin = async (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logout successful' });
};

export { registerAdmin, loginAdmin, logoutAdmin };
