module.exports = io => {
    io.on('connection', socket => {
        // Lithen Event Join Chat From Chat.js
        console.log("there is connection");

        socket.on('disconnect', () => {
            console.log('Disconnect');
        })
    })
}