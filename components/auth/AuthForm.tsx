"use client";

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useToast } from "../../hooks/use-toast";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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


export default function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("authenticate");

  useEffect(() => {
    // If a user is already logged in, redirect them to the main page.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAuthError = (error: any) => {
    console.error("Firebase Auth Error:", error);
    let message = "An unknown error occurred. Please re-establish connection.";
    switch (error.code) {
      case "auth/invalid-email":
        message = "Invalid email format. Secure channel requires a valid address.";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "Access denied. Please check your credentials.";
        break;
      case "auth/email-already-in-use":
        message = "Agent signature recognized. Please proceed to authenticate.";
        break;
      case "auth/weak-password":
        message = "Encryption key too weak. Password must be at least 6 characters.";
        break;
      case "auth/popup-closed-by-user":
        message = "Secure channel aborted. Please try again.";
        break;
      default:
        message = error.message;
    }
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: message,
    });
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("signup");
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      toast({
        title: "Identity Created",
        description: "Your node is registered. Authenticate to establish uplink.",
      });
      setActiveTab("authenticate");
       setTimeout(() => {
        const input = document.getElementById("email");
        if (input) input.focus();
      }, 100);
      setSignupEmail("");
      setSignupPassword("");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(null);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("signin");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle the redirect on success
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(null);
    }
  };
  
  const handleSocialSignIn = async (providerType: 'google' | 'github') => {
    setLoading(providerType);
    const provider = providerType === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle the redirect on success
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-primary [text-shadow:0_0_15px_hsl(var(--primary)/0.4)] mb-8 animate-fade-in-up text-center px-4">
          Offensive Security Toolkit (OST)
      </h1>
      <div 
        className="w-full max-w-sm rounded-lg bg-card/60 border border-accent/20 p-6 sm:p-8 shadow-2xl shadow-primary/20 backdrop-blur-lg animate-fade-in-up"
        style={{ animationDelay: '200ms' }}
      >
          <div className="text-center mb-6">
              <div className="inline-flex items-center gap-x-3 font-headline text-2xl sm:text-3xl font-bold text-primary border-2 border-accent/20 rounded-lg px-4 py-2 transition-all duration-300 hover:-translate-y-1">
                  <span>::</span>
                  <div className="text-center">
                      <div>NODE-7 SECURE</div>
                      <div>INTERFACE</div>
                  </div>
                  <span>::</span>
              </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="authenticate">Authenticate</TabsTrigger>
              <TabsTrigger value="signup">Register Node</TabsTrigger>
            </TabsList>

            <TabsContent value="authenticate" className="mt-4">
              <p className="text-center mt-4 text-sm text-foreground/70">
                Trace secured. Payloads locked. Authenticate to deploy.
              </p>
              <form onSubmit={handleSignIn} className="mt-4 space-y-6">
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="user@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                  </div>

                  <Button
                      type="submit"
                      className="w-full mt-4 transition-all duration-300 hover:-translate-y-1"
                      size="lg"
                      disabled={loading === 'signin'}
                  >
                      {loading === 'signin' ? <Loader2 className="animate-spin" /> : '[ INITIATE UPLINK ]'}
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
                  <Button variant="outline" onClick={() => handleSocialSignIn('google')} className="transition-all duration-300 hover:scale-[1.03]" disabled={loading === 'google'}>
                      {loading === 'google' ? <Loader2 className="animate-spin mr-2" /> : <GoogleIcon className="mr-2 h-4 w-4" />}
                      Google
                  </Button>
                  <Button variant="outline" onClick={() => handleSocialSignIn('github')} className="transition-all duration-300 hover:scale-[1.03]" disabled={loading === 'github'}>
                      {loading === 'github' ? <Loader2 className="animate-spin mr-2" /> : <GitHubIcon className="mr-2 h-4 w-4" />}
                      GitHub
                  </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="mt-4">
              <p className="text-center mt-4 text-sm text-foreground/70">
                  Bootstrapping agent... Please inject credentials...
              </p>
              <form onSubmit={handleSignUp} className="mt-4 space-y-6">
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <Input id="signup-email" type="email" placeholder="agent@sec.net" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input id="signup-password" type="password" placeholder="••••••••" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                      </div>
                  </div>

                  <Button
                      type="submit"
                      className="w-full transition-all duration-300 hover:-translate-y-1"
                      size="lg"
                      disabled={loading === 'signup'}
                  >
                      {loading === 'signup' ? <Loader2 className="animate-spin" /> : '[ CREATE IDENTITY ]'}
                  </Button>
              </form>
            </TabsContent>
          </Tabs>
      </div>
    </div>
  );
}
