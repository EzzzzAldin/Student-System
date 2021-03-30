const Admin = require('../model/admin.model');
const Student = require('../model/student.model');
const validation = require('./validation/validation');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postLogin = async (req, res) => {
    try {
        // Validation Data
        const val = await validation.validateLogin(req.body);
        // Get Data Admin From DB
        const admin = await Admin.findOne({email: req.body.email});
        // Get Data Student From DB
        const student = await Student.findOne({email: req.body.email});
        // Check If Admin Username Is Found In DB
        if(!admin && !student) return res.status(400).send('Email is not Found');
        // OR Email Is Found Check Password
        if(admin) {
            // If User Is Admib
            checkUser(req, res, admin);
        } else {
            // If User Is Student
            checkUser(req, res, student);
        }
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.getLogin = async (req, res) => {
    try {
        // Get Token
        let token = req.headers.token
        // Verify Token To Get Data
        const verifed = await jwt.verify(token, process.env.TOKEN_SECRET);
        // Kind Of Status Account
        const user = await Student.findById(verifed._id);
        if (!user) return res.send({ status: 'Admin' })
        res.send({
            status: "Student"
        })
    } catch (error) {
        console.log(error);
    }
};


// Function Check If User Admin OR Student 
async function checkUser(req, res, user) {
    const comp = await bcrypt.compare(req.body.password, user.password);
        // If Password Is Wrong
        if(!comp) return res.status(400).send('Invailde Password');
        // If Password Is Correct
        // Create And Asgin A token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('token', token).send({
            message: "sucsse",
            token: token,
            user: user
        });
};