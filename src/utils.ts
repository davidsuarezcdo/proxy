import config from "./config.json";

export function parseRequestHeaders(request: Buffer): { [key: string]: string } {
  const lines = request.toString().trim().split("\r\n");
  const headers: { [key: string]: string } = {};
  for (const line of lines) {
    const parts = line.split(": ");
    if (parts.length !== 2) continue;
    let [key, value] = parts;
    let keyParts = key.split("-");
    let newKey = keyParts.shift()?.toLowerCase() + keyParts.map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join("");
    headers[newKey] = value;
  }
  return headers;
}

export function getIpFromDomain(input: string): {
  domain: string | null;
  port: number | null;
} {
  if (!input) return { domain: null, port: null };
  const dnsParts = input.split(":");
  const domain = dnsParts[0];
  return { domain: domain, port: 80 };
}

export function getConfigByDomain(domain: string) {
  const domainConfig = config[domain as keyof typeof config] as { port: number; host: string };

  if (domainConfig && !domainConfig.host) {
    domainConfig.host = "127.0.0.1";
  }

  return domainConfig;
}
