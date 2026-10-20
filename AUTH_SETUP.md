# Authentication setup

Supabase project: https://aocfndxbjmnqmfyoqjfz.supabase.co
Production: https://inetixus.it

Google and email authentication are connected using the official Supabase browser SDK. Only the project URL and publishable key are in auth-config.js. Google secrets must remain in Supabase's Google provider settings. Do not commit the downloaded Google OAuth JSON.

## Configured redirects

Supabase Authentication > URL Configuration:
- Site URL: https://inetixus.it
- Redirect URLs: https://inetixus.it/auth/callback/ and https://inetixus.it/reset-password/

Google Cloud web OAuth client:
- Authorized JavaScript origin: https://inetixus.it
- Authorized redirect URI: https://aocfndxbjmnqmfyoqjfz.supabase.co/auth/v1/callback

Local testing with a real account requires adding the corresponding localhost return routes to the Supabase allowlist. Browser QA intercepts Auth responses instead and never sends real signup or reset emails.

## Behavior

/login/ supports Google OAuth with PKCE and email/password. /signup/ stores the supplied display name in Auth user metadata and requests confirmation email. Open confirmation and recovery links in the same browser where they were requested, because PKCE verifies that browser. /auth/callback/ completes sign-in, and /account/ verifies the user with Supabase Auth before displaying identity. Session tokens are persisted by the SDK for refresh and returning visits. Logout removes this browser's session. /forgot-password/ sends a recovery email; /reset-password/ updates the password after session verification.

No database tables or client dashboard data are included. Future client records need server authorization and Row Level Security policies.

## Before opening signups to everyone

1. Configure custom SMTP in Supabase for confirmation and reset emails to public users. The default Supabase sender is restricted to project-team recipients and is for testing. Store SMTP credentials in Supabase, not this repository.
2. The supplied Google screenshot showed the OAuth app in Testing mode. Add your test email under Google Auth Platform > Audience while testing; publish the Google OAuth app when ready for public sign-in.
3. Rotate the Google client secret shown in the supplied screenshot and update the provider if this has not been done.

## Verification

qa-auth.mjs uses the actual SDK with intercepted Auth responses for signup, mismatched passwords, invalid credentials, successful login, session persistence, getUser identity verification, logout, unauthenticated guards, recovery code exchange, password update, Google PKCE and callback failures at desktop, 390 px and 320 px. Live provider settings and the Google authorization redirect are checked separately. Real Google consent and email delivery still require a user test.

References: [Google provider](https://supabase.com/docs/guides/auth/social-login/auth-google), [PKCE](https://supabase.com/docs/guides/auth/sessions/pkce-flow), [SMTP](https://supabase.com/docs/guides/auth/auth-smtp).
