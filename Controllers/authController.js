import { sanitizeInput } from "../Utils/sanitizeInput.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

// Sign Up
export const signUp = async (req, res, next) => {
    try {
        // Sanitize body
        const sanitizeBody = sanitizeInput(req.body);
        const { username, email, password } = sanitizeBody;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) return res.status(403).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Return response
        res.status(201).json({
            message: "User created successfully",
            newUser: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        next(error);
    }
};

// Login
export const login = async (req, res, next) => {
    try {
        const sanitizeBody = sanitizeInput(req.body);
        const { username, email, password } = sanitizeBody;

        // Find user by username OR email
        const userExists = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (!userExists) return res.status(403).json({ message: "Invalid credentials!" });

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) return res.status(403).json({ message: "Invalid credentials!" });

        // Generate JWT
        const token = jwt.sign(
            { id: userExists._id, username: userExists.username, email: userExists.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: userExists._id, username: userExists.username, email: userExists.email }
        });
    } catch (error) {
        next(error);
    }
};
