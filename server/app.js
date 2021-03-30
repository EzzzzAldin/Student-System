require('dotenv').config();

// Init Express And Mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



// Create Server
const app = express();
const server = require("http").Server(app);





// DB Connect
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// Check DB Connect
mongoose.connection.once('open', () => console.log('DB is connect'));



// MiddelWare
app.use(express.json());
app.use(cors());

// Routers
const adminRouter = require('./router/admin.route');
const loginRouter = require('./router/login.route');
const studentRouter = require('./router/student.route');

// PORT Server
const PORT = process.env.PORT || 5000;

// Use Routers
app.use('/admin', adminRouter);
app.use('/', loginRouter);
app.use('/student', studentRouter);

server.listen(PORT, () => {
    console.log(`Server Work to Port ${PORT}`);
});

// Chat Between Student And Admin

const io = require('socket.io')(server);

io.on('connection', socket => {
    // Lithen Event Of Client
    socket.on('newMsg', (data, room, name) => {
        // Create New Event To Send Msg To clniet
        socket.to(room).emit("clientMsg", {'name': name, "msg": data, "type": 'message'})
    });

    socket.on('joinRoom', data => {
        console.log(`user Join this room ${data}`);
        // Create New Event To Send Msg To clniet
        socket.join(data)
    });
});
