import { getIO } from './socket.js';
const userSocketMap = new Map();
let io;

const initSocketIO = (server) => {
    io = getIO(); 

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('register', (userId) => {
            let sockets = userSocketMap.get(userId) || new Set();
            sockets.add(socket.id);
            userSocketMap.set(userId, sockets);
            console.log(`User ${userId} registered with socket ${socket.id}`);
            console.log('userSocketMap:', userSocketMap);
        });

        socket.on('disconnect', () => {
            userSocketMap.forEach((value, key) => {
                if (value === socket.id) {
                    userSocketMap.delete(key);
                    console.log(`User ${key} disconnected and removed from map`);
                }
            });
            console.log('Client disconnected');
        });
    });

    return io; // Return the io instance
};

export { initSocketIO ,userSocketMap};