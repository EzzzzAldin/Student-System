const Admin = require('../model/admin.model');
const Student = require('../model/student.model');
const Level = require('../model/level.model');
const Subjects = require('../model/subjects.model');
const validation = require('./validation/validation');


const bcrypt = require('bcrypt');

exports.postAdminRegister = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateRegistarAdmin(req.body);
        // Check If User Is Admin
        const oldAdmin = await Admin.findById(req.userId._id);
        if(!oldAdmin) return res.send('You Are Not Admin');
        // Check Email Is Exist
        const checkEmail = await Admin.findOne({email: req.body.email});
        // If Email Exist In DB
        if(checkEmail) return res.status(400).send('Emial Already Exist');
        // If Email Not Exist
        const saltRounds = 10;
        // Hashed Password
        const hashedpassword = await bcrypt.hashSync(req.body.password, saltRounds);
        // Create New Admin
        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword,
            repeat_password: hashedpassword
        });
        await admin.save();
        res.send({
            message: 'Done Create New Admin'
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.postStudentRegister = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateRegisterStudent(req.body);
        // Check If User Is Admin
        const admin = await Admin.findById(req.userId._id);
        if(!admin) return res.send('You Are Not Admin');
        // Check Email Exist
        const checkEmail = await Student.findOne({email: req.body.email});
        if(checkEmail) return res.status(400).send('Emial Already Exist');
        // If Email Not Exist
        const saltRounds = 10;
        // Hashed Password
        const hashedpassword = await bcrypt.hashSync(req.body.password, saltRounds);
        // Create new Student
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword,
            repeat_password: hashedpassword,
            degrees: req.body.degree
        });
        await student.save();
        res.send({
            message: 'Done Create New Student'
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.addLevelStudent = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateAddLevel(req.body);
        // Check If User Is Admin
        const admin = await Admin.findById(req.userId._id);
        if(!admin) return res.send('You Are Not Admin');
        // Get Student
        const student = await Student.findOne({email: req.body.email});
        // Check If Student not Found In DB
        if(!student) return res.status(401).send('Email Is Not Found');
        // If Email Found In DB
        // Get Data Level
        const level = req.body.level;
        // Check Level Is Exist 
        const checkLevel = await Level.findOne({level: level, student: student._id});
        if(checkLevel) return res.status(401).send('This level Already Exist');
        // Create Level And Push In Student Data
        const newLevel = await new Level({
            level: level,
            student: student._id,
        });
        await newLevel.save();
        // Push Level In Student Data
        student.level.push(level);
        await student.save();
        res.send({
            message: "Added Level"
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.addSubjects = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateAddSubjects(req.body);
        // Check If User Is Admin
        const admin = await Admin.findById(req.userId._id);
        if(!admin) return res.send('You Are Not Admin');
        // Get Student Data
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // If Student Exist Check Level Is Exist
        const level = await Level.findOne({level: req.body.level, student: student._id});
        if(!level) return res.status(401).send('Level Is Not Found');
        if(level.subjects.length > 0) return res.status(401).send('Subjects Already Added');
        // Get All Subjects
        const subjects = req.body.subjects;
        // Create New Subjects
        const newSubjects = await new Subjects({
            subjects: subjects,
            student: student._id,
            level: level._id
        });
        await newSubjects.save();
        // Get Object Subject From Array Subjects
        const arrSubjects = newSubjects.subjects;
        // Create Array To Push her Subjects
        let allSubjects = [];
        arrSubjects.forEach(subjects => allSubjects.push(subjects.subject));
        // Convert Array Subjects To String To Push In Student And Level Model 
        student.subjects.push(allSubjects.toString());
        await student.save();
        level.subjects.push(allSubjects.toString());
        await level.save();
        res.send({
            message: 'Done Added Subjects'
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.addDegrees = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateAddDegrees(req.body);
        // Check If User Is Admin
        const admin = await Admin.findById(req.userId._id);
        if(!admin) return res.send('You Are Not Admin');
        // Get Student Data
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // If Student Exist Check Level Is Exist
        const level = await Level.findOne({level: req.body.level, student: student._id});
        if(!level) return res.status(401).send('Level Is Not Found');
        // If Email And Level Found In DB Get Subject Of Student
        const subjects = await Subjects.findOne({level: level._id, student: student._id});
        // Get Data Degrees 
        const newSubjectsDegrees = req.body.subjects;
        // Add Degrees In Subjects Model
        const degreesSubjects = await Subjects.updateOne({_id: subjects._id}, {
            subjects: newSubjectsDegrees
        });
        // Add All Degeers Subjects in Level Model
        // Set New variable To Calculate All Degrees Subjects From Array Degrees
        let degreesSub = 0;
        newSubjectsDegrees.forEach(deg => degreesSub += deg.degree);
        await Level.updateOne({_id: level._id}, { degrees: degreesSub });
        // Calculate All Degrees And Add In Student
        // Get All Degrees From All Level In Array
        const degreesLevel = await Level.find({ student: student._id });
        // Set Variable Get Calculate All Degrees
        let alldegreesLevel = 0;
        // Calculate All Degrees From Array
        degreesLevel.forEach(deg => alldegreesLevel += deg.degrees);
        // Get All Number Of Subject And Level To Calculate Degrees Percent
        const subLevel = await Subjects.find({student: student._id});
        const allLevelStudent = await Level.find({student: student._id});
        // Calculate Degrees percent
        const alldegrees =(( alldegreesLevel / ( (subLevel[0].subjects.length * 100 ) * allLevelStudent.length)) * 100).toFixed(2);
        // Update New Degrees
        await Student.updateOne({_id: student._id}, { degrees: alldegrees});
        res.send({
            message: "Done Added Degrees"
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};


exports.getAllData = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateGetAllDataStudent(req.body);
        // Check If User Is Admin
        const admin = await Admin.findById(req.userId._id);
        if(!admin) return res.send('You Are Not Admin');
        // Get Data Student
        const student = await Student.findOne({email: req.body.email});
        // Check If Student Not Found In DB
        if(!student) return res.status(400).send('Email Is Not Exist');
        // Get Data Current Level 
        const level = await Level.find({student: student._id}).populate({
            path: 'student',
            model: 'Student',
            select: 'name degrees'
        });
        // Get Data Subjects & Degrees
        const subjects = await Subjects.findOne({student: student._id, level: level[level.length - 1]._id});
        // Show data Student
        res.json({
            id: level[level.length - 1].student._id,
            name: level[level.length - 1].student.name,
            Level: level[level.length - 1].level,
            subjects: subjects.subjects,
            totelDegrees: level[level.length - 1].student.degrees + '%'
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.getadminData = async (req, res) => {
    try {
        const admin = await Admin.findById(req.userId._id);
        if(!admin) return res.send('You Are Not Admin');
        res.json({
            name: admin.name,
            status: "Admin"
        })

    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
}