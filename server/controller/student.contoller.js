const Student = require('../model/student.model');
const Level = require('../model/level.model');
const Subjects = require('../model/subjects.model');

exports.getAllData = async (req, res) => {
    try {
        // Get Data Student
        const student = await Student.findById(req.userId._id);
        if(!student) return res.send('You Are Not Student');
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
            email: student.email,
            name: level[level.length - 1].student.name,
            Level: level[level.length - 1].level,
            subjects: subjects.subjects,
            totelDegrees: level[level.length - 1].student.degrees + '%'
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.arrangementStudent = async (req, res) => {
    try {
        // Chak Data Student
        const student = await Student.findById(req.userId._id);
        if(!student) return res.send('You Are Not Student');
        // Get Level Of This Student To find All Student Of this Level
        const studentLevel = student.level;
        // Get Data Student
        const level = await Student.find({level: studentLevel[studentLevel.length - 1]}, {}, {sort: {degrees: -1}});
        let students = [];
        // Create Loop Of Data Student Level
        for( let i = 0; i < level.length; i++) {
            let levelLest = level[i].level;
            // Get Student In Same Level Onely
            if( studentLevel[studentLevel.length - 1] === levelLest[levelLest.length - 1]) {
                students.push(level[i].name)
            }
        };
        res.send({
            students: students
        })

    } catch (error) {
        console.log(error);
    }
};

exports.getGneralData = async (req, res) => {
    try {
        // Chak Data Student
        const student = await Student.findById(req.userId._id);
        if(!student) return res.send('You Are Not Student');
        // Get Data Current Level 
        const level = await Level.find({student: student._id}).populate({
            path: 'student',
            model: 'Student',
            select: 'name degrees'
        });
        // Show data Student
        res.json({
            name: level[level.length - 1].student.name,
            Level: level[level.length - 1].level,
            totelDegrees: level[level.length - 1].student.degrees + '%'
        });
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};