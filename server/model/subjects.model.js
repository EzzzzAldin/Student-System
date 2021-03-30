const mongoose = require('mongoose');

const subjectsSchema = new mongoose.Schema({
    subjects: {
        type: Array,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level'
    }
});

const Subjects = mongoose.model('Subjects', subjectsSchema);

module.exports = Subjects;