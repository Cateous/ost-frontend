'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const AuthForm = dynamic(() => import('../../components/auth/AuthForm'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  ),
});

export default function AuthenticatePage() {
  return <AuthForm />;
}
