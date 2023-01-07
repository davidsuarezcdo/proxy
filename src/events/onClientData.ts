import * as net from "net";
import { ConfigUtils } from "../utils/config";
import { RequestUtils } from "../utils/request";

export function onClientData(request: Buffer, clientSocketRequest: net.Socket): void {
  const { host } = RequestUtils.parse(request);
  let clientResponse: net.Socket = new net.Socket();
  clientResponse.on("close", () => clientResponse.destroy());

  const config = ConfigUtils.getByDomain(host);

  if (!config) {
    clientSocketRequest.destroy();
    return;
  }

  clientResponse.connect(config.port, config.host, () => clientResponse.write(request));
  clientResponse.on("data", (response) => clientSocketRequest.write(response));
}
