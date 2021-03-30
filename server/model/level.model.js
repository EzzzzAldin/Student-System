const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
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

const Level = mongoose.model('Level', levelSchema);

module.exports = Level;