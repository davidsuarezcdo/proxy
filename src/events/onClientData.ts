import * as net from "net";
import { getConfigByDomain, parseRequestHeaders } from "../utils";

export function onClientData(request: Buffer, clientSocketRequest: net.Socket): void {
  const { host } = parseRequestHeaders(request);
  let clientResponse: net.Socket = new net.Socket();
  clientResponse.on("close", () => clientResponse.destroy());

  const config = getConfigByDomain(host);

  if (!config) {
    clientSocketRequest.destroy();
    return;
  }

  clientResponse.connect(config.port, config.host, () => clientResponse.write(request));
  clientResponse.on("data", (response) => clientSocketRequest.write(response));
}
