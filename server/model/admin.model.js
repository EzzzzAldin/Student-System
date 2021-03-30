const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max:1024
    }
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;

