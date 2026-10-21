# Authentication

Authentication is now shared through `dist/portal-client.js`. Login, signup, code verification, recovery, Google callback and the project dashboard run at dashboard.inetixus.it in production. See PORTAL_SETUP.md for activation, SMTP, branded templates, owner access, domain routing, and Google branding.

The only public configuration remains Supabase's project URL and publishable key. Provider secrets, SMTP credentials, owner assignment, and database administration stay outside the browser. Auth user metadata never grants owner privileges.

The new signup flow uses the code in Supabase's Confirm signup template (`{{ .Token }}`), verified with `verifyOtp` type `email`. Confirmation must remain enabled and custom SMTP must be configured before public delivery works. The site does not generate or validate its own email codes.
