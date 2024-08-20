import { Server as socketIo } from 'socket.io';

let io;

const init = (httpServer) => {
    io = new socketIo(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

export { init, getIO };
