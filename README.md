# Vault360 App (Minimal)

Pages:
- `/login` – magic link sign-in
- `/app/home` – post-login home
- `/app/vault` – upload to Supabase Storage `vault-files` and list files

## Environment Variables (set in Vercel → Project → Settings → Environment Variables)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## Supabase Auth → URL Configuration → Redirect URLs
- https://YOUR-VERCEL-DOMAIN.vercel.app/auth/callback
- https://YOUR-VERCEL-DOMAIN.vercel.app/app/home
