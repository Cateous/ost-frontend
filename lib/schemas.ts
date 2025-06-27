
import * as z from "zod";

const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
const ipOrDomainRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
const urlRegex = /^(https?:\/\/)?((([a-zA-Z0-9_])+\.)+[a-zA-Z]{2,63}|([0-9]{1,3}\.){3}[0-9]{1,3})(:[0-9]+)?(\/.*)?$/;
const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const nmapScanSchema = z.object({
  target: z.string().min(1, "Target is required.").regex(ipOrDomainRegex, "Invalid IP or domain format."),
  flags: z.array(z.string()),
});

export const subdomainEnumSchema = z.object({
  domain: z.string().min(1, "Domain is required.").regex(domainRegex, "Invalid domain format."),
});

export const whoisLookupSchema = z.object({
  domain: z.string().min(1, "Domain is required.").regex(domainRegex, "Invalid domain format."),
});

export const dirBruteSchema = z.object({
    url: z.string().min(1, "URL is required.").regex(urlRegex, "Invalid URL format."),
});

export const reverseShellSchema = z.object({
  ip: z.string().min(1, "IP address is required.").regex(ipRegex, "Invalid IP address format."),
  port: z.string().min(1, "Port is required.").refine(val => {
    const portNum = parseInt(val, 10);
    return !isNaN(portNum) && portNum > 0 && portNum <= 65535;
  }, "Port must be a number between 1 and 65535."),
});
