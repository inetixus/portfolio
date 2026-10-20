# Connect real accounts later

The current `/login/`, `/signup/`, and `/forgot-password/` routes are UI previews. Their forms validate input locally, display a clear preview message, and never transmit or persist credentials. Google is a preview button. No authentication provider or user database has been installed.

To enable accounts, provide:

1. **An authentication provider and project.** A suitable option is Supabase Auth, which supports Google and email/password. If using it, provide the project URL and publishable browser key, or access to configure the project. Do not put a service-role key in frontend files.
2. **A Google Cloud OAuth project.** Enable a web OAuth client with `https://inetixus.it` as an authorized origin. The redirect URI comes from the chosen authentication provider. Its client secret belongs in the provider's settings, not in GitHub or these static pages.
3. **An email sender.** Choose the sender address and transactional email service for verification and password resets. Configure its credentials privately in the provider or deployment environment.
4. **The signed-in destination.** Decide whether clients land on a project brief, a dashboard, or another page. No authenticated dashboard is included in this UI-only change.

Production domain: `https://inetixus.it`. Local development: `http://127.0.0.1:4173`. Provider redirects and callbacks must be configured once the provider is selected; no fake callback route is deployed today.

References: [Supabase Google setup](https://supabase.com/docs/guides/auth/social-login/auth-google), [email and password setup](https://supabase.com/docs/guides/auth/passwords), [redirect URL configuration](https://supabase.com/docs/guides/auth/redirect-urls).
