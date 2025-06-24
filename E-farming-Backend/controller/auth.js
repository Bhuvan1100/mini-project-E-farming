const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mini-project-123"; 

const handleSignUp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      raspberryPiId,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      raspberryPiId,
      address,
      city,
      state,
      pincode,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "5000h" }
    );

    
    // res.cookie('token', token, {
    //   maxAge: 60 * 60 * 1000,  // 1 hour expiration
    //   httpOnly: true,          // Make the cookie inaccessible via JavaScript
    //   secure: false,           // Use 'false' if you are not using https locally
    //   sameSite: 'strict',      // CSRF protection
    // });

    
    res.status(201).json({
      success: true,
      message: "Sign-up successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image || null,
        token: token,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const handleLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "5000h" }
    
    );


    
    // res.cookie('token', token, {
    //   maxAge: 60 * 60 * 1000,  // 1 hour expiration
    //   httpOnly: true,          // Make the cookie inaccessible via JavaScript
    //   secure: false,           // Use 'false' if you are not using https locally
    //   sameSite: 'strict',      // CSRF protection
    // });

    
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || null,
        token: token,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { handleSignUp, handleLogIn };
