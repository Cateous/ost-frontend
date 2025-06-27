# **App Name**: OST Web

## Core Features:

- Centralized Dashboard: Homepage with sections for Nmap, Subdomain Enumeration, WHOIS, Directory Brute Force, and Reverse Shell.
- Form Input Validation: Form input validation to prevent errors and provide a better user experience.
- Nmap Integration: Nmap scan form with dropdown to select scan options (-sV, -F, -Pn, -O, -A, etc.).
- Styled Results Output: Display returned results in a terminal-style format (monospace font, collapsible sections).
- Payload Generation: Reverse Shell Generator accepts IP and Port inputs to create reverse shell payloads.
- API Integration: Send POST requests to Flask API endpoints (/scan, /subdomain, /whois, /dirbrute, /generate-payload).
- Footer: Sticky footer: "Made with ❤️ by Cateous"

## Style Guidelines:

- Background color: Dark charcoal grey (#222222) to create a hacking/terminal aesthetic. This dark color helps set the tone.
- Primary color: Electric cyan (#7DF9FF) for text, links, and highlights. Cyan alludes to the visual styling of retro terminals.
- Accent color: Bright lime green (#32CD32) for interactive elements. Analogous to cyan, the green evokes vintage terminals.
- Body and headline font: 'Space Grotesk' (sans-serif) for a modern, techy feel, suitable for both headers and brief blocks of text.
- Code font: 'Source Code Pro' (monospace) for displaying command results and generated code.
- Simple, line-based icons to represent each tool (Nmap, Subdomain, etc.).
- Use a grid-based layout for responsiveness across devices.
- Subtle animations, such as a typewriter effect for displaying results, to enhance the terminal aesthetic.