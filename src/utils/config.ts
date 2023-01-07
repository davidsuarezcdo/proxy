import config from "./../config.json";

export namespace ConfigUtils {
  export function getByDomain(domain: string) {
    const domainConfig = config[domain as keyof typeof config] as { port: number; host: string };

    if (domainConfig && !domainConfig.host) {
      domainConfig.host = "127.0.0.1";
    }

    return domainConfig;
  }
}
