import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Config/env.js";

export const authMiddleware =(req, res, next) => {
    const authHeader = req.header['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: "No token provided!"});
    }

    const token = authHeader.split('')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({message: "Invalid token!"})
    }
};