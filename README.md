# Inetixus portfolio

Live at https://inetixus.it. This repository contains the static website served by Vercel; no build command is required. Use a static HTTP server from the repository root to preview locally.

The flat, front-facing hotel elevator contains the owner's standing R6 Roblox avatar. The chair is removed. The shirt uses Roblox's public preview of the actual clothing template rather than a crop of the avatar thumbnail; accessories keep their original texture UVs. The avatar is rendered once with an orthographic camera and unlit materials, copied to a 2D canvas, and the WebGL context is released. The fallback is a browser capture of that actual model. No AI images are used.

The doors close before the cab departs. A critically damped movement follows the scroll, then the doors reopen after settling at the page's top or bottom. The bottom station adds a warm floor light. Reduced motion removes the travel and sliding animation. The legacy chair and portrait modules are not loaded.

Project content and package amounts are in site-content.json. Pricing retains its tilting background cubes and 200 / 300 / 450 Robux packages. The account pages use Supabase Auth for Google OAuth with PKCE, email signup/login, confirmation, recovery, session refresh, and logout. Only the public project URL and publishable key are in auth-config.js. See AUTH_SETUP.md for provider configuration and email-delivery requirements.
