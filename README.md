# Inetixus portfolio

Live at https://inetixus.it. This repository contains the static website served by Vercel; no build command is required. Use a static HTTP server from the repository root for local preview.

Project content and package amounts are in site-content.json. The client area uses Supabase Auth for Google OAuth with PKCE, email/password signup and login, confirmation, recovery, session refresh, and logout. Pages are /login/, /signup/, /forgot-password/, /reset-password/, /auth/callback/, and /account/.

Only the public project URL and publishable key are in auth-config.js. Provider secrets belong in Supabase. See AUTH_SETUP.md for provider configuration, SMTP requirements, Google testing status, and verification limits.

The avatar uses the owner's actual Roblox model and textures. Its body transforms match the supplied pose reference, and background floor cubes persist and tilt through pricing. No generated images are used.
