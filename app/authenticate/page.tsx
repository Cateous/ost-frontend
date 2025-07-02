'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/auth/AuthForm';

export default function AuthenticatePage() {
  const router = useRouter();
  const [isAuthStateDetermined, setIsAuthStateDetermined] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, redirect them to the main app.
        // The loader will continue to show until the redirect is complete.
        router.push('/');
      } else {
        // User is not logged in. We can now safely show the login page.
        setIsAuthStateDetermined(true);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // While we wait for Firebase to determine the auth state, show a loader.
  // This prevents a "flash" of the login form for users who are already logged in.
  if (!isAuthStateDetermined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // If we get here, we know for sure the user is logged out.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-primary [text-shadow:0_0_15px_hsl(var(--primary)/0.4)] mb-8 animate-fade-in-up text-center px-4">
          Offensive Security Toolkit (OST)
      </h1>
      <AuthForm />
    </div>
  );
}
