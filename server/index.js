const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fbpage';
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
    

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', UserSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and compare passwords
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, jwtSecretKey, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
