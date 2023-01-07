import * as net from "net";
import { onClientData } from "./events/onClientData";

const server = net.createServer();

server.listen(27000, "0.0.0.0", () => console.log("Proxy listening on port 27000"));

server.on("connection", (clientRequest) => {
  clientRequest.on("data", (request) => onClientData(request, clientRequest));
  clientRequest.on("error", (err) => console.error(`Connection reset error: ${err}`));
  clientRequest.on("close", () => clientRequest.destroy());
});

server.on("error", (err) => {
  console.error(`[ServerSockerError]: ${err}`);
  server.close();
});

server.on("close", () => console.log("Server closed"));
