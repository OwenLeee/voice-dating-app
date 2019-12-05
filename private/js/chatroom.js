const socket = io.connect('localhost:8080');

// socket.emit("socketObject", "abc");
function so(id) {
    socket.emit("socketObject", id);
}

// socket.emit("receiveMessage", "hello client b");
function send(id, message) {
    socket.emit("receiveMessage", {userID: id, message});
}

socket.on("message", (data) => {
    console.log(data);
})
