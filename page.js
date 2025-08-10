'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? ''));
  }, []);

  async function signIn() {
    if (!email) return;
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${baseUrl}/app/home` }
    });
    if (error) setMessage(error.message);
    else setMessage('Check your email for a magic link.');
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUserEmail('');
  }

  return (
    <div>
      <h2>Sign in</h2>
      {userEmail ? (
        <p>Signed in as <b>{userEmail}</b>. <a href="/app/home">Continue</a> · <button onClick={signOut}>Sign out</button></p>
      ) : (
        <div>
          <input
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{padding:'8px',width:'280px'}}
          />
          <button onClick={signIn} style={{marginLeft:8,padding:'8px 12px'}}>Send magic link</button>
          <div style={{marginTop:8,color:'#555'}}>{message}</div>
        </div>
      )}
    </div>
  );
}
