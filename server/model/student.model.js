const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: [{
        type: Number,
        ref: 'Level'
    }],
    subjects: [{
        type: String,
        ref: 'Subjects'
    }],
    degrees: {
        type: Number,
        required: true,
        default: 0
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;