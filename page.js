'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ''));
  }, []);
  return (
    <div>
      <h2>Welcome to Vault360</h2>
      {email ? <p>Signed in as <b>{email}</b>.</p> : <p><a href="/login">Sign in</a></p>}
      <p><a href="/app/vault">Go to My Vault</a></p>
    </div>
  );
}
