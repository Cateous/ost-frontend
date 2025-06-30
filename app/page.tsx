
"use client";

import { useState, useEffect } from "react";
import { User, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "../hooks/use-toast";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import NmapScan from "../components/tools/NmapScan";
import SubdomainEnum from "../components/tools/SubdomainEnum";
import WhoisLookup from "../components/tools/WhoisLookup";
import DirBrute from "../components/tools/DirBrute";
import ReverseShell from "../components/tools/ReverseShell";
import { Button } from "../components/ui/button";
import { Loader2, LogOut } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/authenticate");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Disconnected",
        description: "You have been successfully signed out.",
      });
      // The onAuthStateChanged listener will handle the redirect to /authenticate
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Out Error",
        description: "Could not disconnect from the node. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // This is a fallback to prevent rendering the main content for a split second before redirect.
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <header className="text-center mb-16 relative">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-primary [text-shadow:0_0_15px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:translate-y-1 hover:text-accent hover:[text-shadow:0_0_25px_hsl(var(--accent)/0.6)] cursor-pointer">
            Offensive Security Toolkit (OST)
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 mt-4 max-w-3xl mx-auto">
            A suite of powerful, browser-based reconnaissance tools designed for modern security professionals.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="absolute top-0 right-0"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 font-headline tracking-tight">
                Crafted by Mukund
              </h2>
              <p className="mb-8 text-base sm:text-lg text-foreground/70">
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