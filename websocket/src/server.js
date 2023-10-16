// http contiene funcionalidades que express no tiene implementadas
import http from "http";
import { init } from "./socket.js";
import app from "./app.js";

const port = 8080;
const server = http.createServer(app);

const httpServer = server.listen(port, () => {
  console.log(`App listen on port ${port}`);
});

init(httpServer);
