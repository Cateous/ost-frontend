
"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ost-api.onrender.com";

type ActionResult = Promise<{ data: string } | { error: string }>;

async function apiRequest(endpoint: string, body: object): ActionResult {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // The API returned an error. We'll try to parse the body for a JSON error message.
      try {
        const errorData = await response.json();
        return { error: errorData.error || `Request failed with status ${response.status}` };
      } catch (e) {
        // If parsing fails, it's not a JSON error. Return the status text.
        return { error: `Request failed: ${response.status} ${response.statusText}` };
      }
    }
    
    const responseData = await response.json();

    // Special handling for the WHOIS endpoint due to its unique response format
    if (endpoint === "/whois" && responseData.whois_info && typeof responseData.whois_info === 'string') {
        const rawWhois = responseData.whois_info;
        const jsonStartIndex = rawWhois.indexOf('{');

        if (jsonStartIndex !== -1) {
            try {
                // Attempt to parse the embedded JSON
                const jsonString = rawWhois.substring(jsonStartIndex);
                const parsedJson = JSON.parse(jsonString);
                return { data: JSON.stringify(parsedJson, null, 2) };
            } catch (e) {
                // If parsing fails, it's not valid JSON. Clean the raw string.
                return { data: rawWhois.replace(/\\n/g, '\n').replace(/\\"/g, '"') };
            }
        } else {
            // If no JSON is found, clean the raw string.
            return { data: rawWhois.replace(/\\n/g, '\n').replace(/\\"/g, '"') };
        }
    }

    // For all other endpoints, extract the main content (`output` field if it exists, otherwise the whole response)
    const dataToFormat = responseData.output ?? responseData;

    // Prettify the data if it's an object, otherwise return it as a string
    if (typeof dataToFormat === 'object') {
        return { data: JSON.stringify(dataToFormat, null, 2) };
    }
    
    return { data: String(dataToFormat) };

  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    if (error instanceof Error) {
        return { error: `An unexpected error occurred: ${error.message}` };
    }
    return { error: "An unexpected network error occurred. Please check your connection." };
  }
}

export async function runNmapScan(target: string, flags: string[]): ActionResult {
  if (!target) return { error: "Target is required." };
  const scanFlags = flags.length > 0 ? flags : ["-sn"];
  return apiRequest("/nmap", { target, flags: scanFlags });
}

export async function runSubdomainEnumeration(domain: string): ActionResult {
    if (!domain) return { error: "Domain is required." };
    return apiRequest("/subdomain", { domain });
}

export async function runWhoisLookup(domain: string): ActionResult {
    if (!domain) return { error: "Domain is required." };
    return apiRequest("/whois", { domain });
}

export async function runDirBrute(url: string): ActionResult {
    if (!url) return { error: "URL is required." };
    return apiRequest("/dirbrute", { url });
}


export async function generatePayload(ip: string, port: string): ActionResult {
    if (!ip || !port) return { error: "IP and Port are required." };
    return apiRequest("/reverseshell", { ip, port });
}