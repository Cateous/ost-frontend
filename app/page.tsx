
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NmapScan from "@/components/tools/NmapScan";
import SubdomainEnum from "@/components/tools/SubdomainEnum";
import WhoisLookup from "@/components/tools/WhoisLookup";
import DirBrute from "@/components/tools/DirBrute";
import ReverseShell from "@/components/tools/ReverseShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// GitHub Icon Component
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/>
    </svg>
);

// Google Icon Component
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 3.08-4.75 3.08-3.83 0-6.95-3.12-6.95-6.95s3.12-6.95 6.95-6.95c2.21 0 3.63 1.02 4.48 1.82l2.44-2.44C19.09 1.38 16.27 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.28 0 12.16-5.12 12.16-12.16 0-.8-.08-1.6-.23-2.4z" fill="currentColor"/>
    </svg>
);


export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  }, [isUnlocked]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Authentication Panel Overlay */}
      <div
        className={`
          fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md 
          transition-opacity duration-500 ease-in-out
          ${isUnlocked ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <div className="w-full max-w-sm rounded-lg bg-card/60 border border-accent/20 p-8 shadow-2xl shadow-primary/20 backdrop-blur-lg animate-fade-in-up">
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-x-3 font-headline text-3xl font-bold text-primary border-2 border-accent/20 rounded-lg px-4 py-2 transition-all duration-300 hover:-translate-y-1">
                    <span>::</span>
                    <div className="text-center">
                        <div>NODE-7 SECURE</div>
                        <div>INTERFACE</div>
                    </div>
                    <span>::</span>
                </div>
            </div>
            
            <Tabs defaultValue="authenticate" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="authenticate">Authenticate</TabsTrigger>
                <TabsTrigger value="signup">Register Node</TabsTrigger>
              </TabsList>

              <TabsContent value="authenticate" className="mt-4">
                <p className="text-center mt-4 text-sm text-foreground/70">
                  Trace secured. Payloads locked. Authenticate to deploy.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); handleUnlock(); }} className="mt-4 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="user@domain.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="••••••••" />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 transition-all duration-300 hover:-translate-y-1"
                        size="lg"
                    >
                        [ INITIATE UPLINK ]
                    </Button>
                </form>

                <div className="relative mt-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-accent/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            GHOST SIGN-IN VIA SECURE CHANNEL
                        </span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button variant="outline" onClick={handleUnlock} className="transition-all duration-300 hover:scale-[1.03]">
                        <GoogleIcon className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                    <Button variant="outline" onClick={handleUnlock} className="transition-all duration-300 hover:scale-[1.03]">
                        <GitHubIcon className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="mt-4">
                <p className="text-center mt-4 text-sm text-foreground/70">
                    Bootstrapping agent... Please inject credentials...
                </p>
                <form onSubmit={(e) => { e.preventDefault(); handleUnlock(); }} className="mt-4 space-y-6">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" type="email" placeholder="agent@sec.net" />
                        </div>
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input id="signup-password" type="password" placeholder="••••••••" />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mb-2 transition-all duration-300 hover:-translate-y-1"
                        size="lg"
                    >
                        [ CREATE IDENTITY ]
                    </Button>
                </form>
              </TabsContent>
            </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <header className="text-center mb-16">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary [text-shadow:0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:translate-y-1 hover:text-accent hover:[text-shadow:0_0_25px_hsl(var(--accent)/0.6)] cursor-pointer">
            Offensive Security Toolkit (OST)
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 mt-4 max-w-3xl mx-auto">
            A suite of powerful, browser-based reconnaissance tools designed for modern security professionals.
          </p>
        </header>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto mb-12">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <NmapScan />
              <SubdomainEnum />
              <WhoisLookup />
              <DirBrute />
              <div className="lg:col-span-2">
                <ReverseShell />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="text-center text-foreground/80 max-w-2xl mx-auto p-8 border border-accent/20 rounded-lg bg-black/40 backdrop-blur-md">
              <h2 className="text-3xl font-bold text-primary mb-4 font-headline tracking-tight">
                Crafted by Mukund
              </h2>
              <p className="mb-8 text-lg text-foreground/70">
                This toolkit is a product of passion for cybersecurity and development. Feel free to connect or see what other projects I'm working on.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 font-code">
                <a
                  href="https://www.linkedin.com/in/mukund-rao-36293a251/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:text-primary transition-colors duration-300 hover:underline"
                >
                  &gt; /dev/linkedin
                </a>
                <a
                  href="https://github.com/Cateous"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:text-primary transition-colors duration-300 hover:underline"
                >
                  &gt; /src/github
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="w-full py-6 text-center text-muted-foreground text-sm font-code">
        &gt;_ Built by Mukund
      </footer>
    </div>
  );
}
