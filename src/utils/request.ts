export namespace RequestUtils {
  export function parse(request: Buffer): { [key: string]: string } {
    const lines = request.toString().trim().split("\r\n");
    const headers: { [key: string]: string } = {};
    for (const line of lines) {
      const parts = line.split(": ");
      if (parts.length !== 2) continue;
      let [key, value] = parts;
      let keyParts = key.split("-");
      let newKey =
        keyParts.shift()?.toLowerCase() + keyParts.map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join("");
      headers[newKey] = value;
    }
    return headers;
  }
}
