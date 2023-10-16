import { Server } from "socket.io";

// Del lado del backend por convencion se lo llama io
let io;

export const init = (httpServer) => {

    io = new Server(httpServer);

    // listener on()

    // cuando se connecto un nuevo cliente
    io.on("connection", (socketClient) => {

        console.log(` ${socketClient.id}`);
    });

    console.log("Server socket running!");
};

export const emitFromApi = (event, data) => io.emit(event, data)