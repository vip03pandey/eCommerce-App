const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.user.id).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ message: "Invalid Token" }); 
        }
    } else {
        res.status(401).json({ message: "Not Authorised" });
    }
};

// middleware to check if user is admin
const admin = (req, res, next) => {
    
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        res.status(403).json({ message: "You are not authorized as an admin" })
    }
}

module.exports = {protect,admin};
