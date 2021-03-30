const Admin = require('../../model/admin.model');

const jwt = require('jsonwebtoken');

// Function To Check If User Token Found
exports.authToken = async (req, res, next) => {
    // Get Token To Check
    const token = req.header('token');
    // If Not Token Refused res
    if(!token) return res.status(401).send('Access Denied');
    // If is Token
    // Check Is Token Expierd
    try {
        // If Token Expierd
        const verifed = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = verifed;
        const admin = await Admin.findById(req.userId._id);
        next();
    } catch (error) {
        // If Token Not Expierd User Login Again
        res.status(400).send('Invild Token');
    }
};