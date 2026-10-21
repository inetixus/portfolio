# Dashboard, verification, and custom email setup

Prepared in this repository: responsive client and owner dashboard, project requests, private project conversations, quote requests/replies, progress updates, email-code verification, sitemap, and branded email templates. These are wired to Supabase, not a browser-only data store. Live data requires the migration below. Design previews use clearly labeled sample data and never send anything.

## 1. Turn on the private database

In the existing project (aocfndxbjmnqmfyoqjfz), open SQL Editor → New query. Paste `supabase/migrations/202610210001_client_portal.sql`, then Run once. This creates the tables, RLS policies, verified-email checks, profile synchronization, and Realtime publication entries. It does not assign any admin account.

Sign up and verify the account you want to use as owner. Then open `supabase/grant-owner.sql`, replace `__OWNER_EMAIL__` with that account’s email, and run it in SQL Editor. This account will see the owner workspace automatically. Clients cannot set this role via signup metadata or browser code. Keep this script outside the public static directory.

Before inviting clients, test with two separate client accounts and the owner. A client must not be able to select another client’s projects, messages, updates, quotes, or profile. A client cannot change project status/progress, answer quotes, publish milestones, or assign admins. No service-role key belongs in the frontend. Browser QA mocks do not prove that policies have been applied to the live project.

## 2. Connect dashboard.inetixus.it

The existing Vercel project must deploy the latest GitHub `main`. Add `dashboard.inetixus.it` under that project’s Domains. In Register.it DNS, add the exact CNAME record Vercel shows for `dashboard`; keep the existing root website and mailbox records. Wait for Vercel to show a valid domain/certificate.

The supplied `vercel.json` rewrites `/` on the dashboard hostname to `dashboard/index.html`, and moves legacy main-site auth routes to the dashboard domain. Both domains serve the same static deployment. Do not point `dashboard` at Supabase; Supabase is the API/auth service, not this dashboard’s frontend host.

If you deploy `dist` as a Vercel output directory instead of this repo’s static-root GitHub checkout, place `dist/vercel.json` at the Vercel project root as well. The `github-portfolio` checkout receives the correct root file automatically.

Set Supabase Authentication → URL Configuration:

- Site URL: `https://dashboard.inetixus.it`
- Add Redirect URL: `https://dashboard.inetixus.it/auth/callback/`
- Add Redirect URL: `https://dashboard.inetixus.it/reset-password/`
- Keep the old main-domain callback/reset URLs during migration for already-issued links.

Login, verification, OAuth callback and dashboard all run on the dashboard origin. Tokens are never transferred in a URL between the portfolio and dashboard domains. Existing users signed in only on the old origin need to sign in once on the new domain.

## 3. Create info@inetixus.it (receiving inbox)

If Register.it still manages the domain: Control panel → select inetixus.it in Domini e prodotti → Email → Crea → enter `info` and choose a mailbox password. If the account has no email service, enable one with your provider first. Open Register.it webmail to check the inbox.

Resend is the outgoing delivery service; it does not create this inbox. Keep the mailbox provider’s MX records. If `info@inetixus.it` will be your owner login, create that inbox first, sign up with it, verify the account, then run the owner-assignment script above. Tell Codex once the mailbox is active before replacing the existing public contact address.

Provider instructions: https://www.register.it/assistenza/attivare-email/

## 4. Configure branded outgoing email

Open your Resend account, add/verify `inetixus.it`, and copy the DNS records Resend gives you into Register.it. Use the exact record names and values for that domain; do not replace the existing mailbox MX records or publish multiple SPF records at the same hostname. Resend’s sending/return-path subdomain records are separate from receiving mail at the root domain.

In Supabase Authentication → Email / SMTP settings, enable custom SMTP:

- Sender name: `Inetixus`
- Sender email: `info@inetixus.it`
- SMTP host: `smtp.resend.com`
- Port: `465` (TLS)
- Username: `resend`
- Password: your Resend sending API key

Enter the API key directly into Supabase, not the site, GitHub, or chat. Supabase’s default sender is restricted and not suitable for public signups. Keep email click/open tracking disabled for auth messages.

The email’s visible sender and body can use only Inetixus branding. Delivery/authentication headers still identify the infrastructure involved; email software can display transport details. The supplied templates contain no provider logo, promotional text, or tracking pixels.

References: https://resend.com/docs/send-with-smtp and https://supabase.com/docs/guides/auth/auth-smtp

## 5. Enable verification codes

In Supabase Authentication settings, keep email signup and Confirm email enabled. Set the email OTP length to 6 digits and choose an expiry suitable for signup (for example 10 minutes). Keep the server’s resend rate limits enabled.

Under Authentication → Email Templates → Confirm signup:

- Subject: `Your Inetixus verification code`
- Body: paste `supabase/email-templates/confirm-signup.html`

The important token is `{{ .Token }}`. Do not replace it with a hardcoded code. Signup now opens `/verify-email/`; the user enters their email and code. The site calls `verifyOtp({ email, token, type: 'email' })`, then opens the dashboard after a verified session is returned. The resend button uses the signup resend endpoint and a 60-second UI cooldown; Supabase also enforces server-side limits. The form accepts 6–10 digits so it remains compatible if you change Supabase’s configured OTP length.

Under Reset password, use subject `Reset your Inetixus password` and paste `supabase/email-templates/reset-password.html`.

Test with an address outside your Supabase team: signup → receive code → verify → dashboard, then log out/log in and test password reset. Do not disable Confirm email just to bypass SMTP setup.

Reference: https://supabase.com/docs/guides/auth/auth-email-templates

## 6. Make Google show Inetixus

Google Auth Platform → Branding:

- App name: `Inetixus`
- App home page: `https://inetixus.it`
- Privacy policy: `https://inetixus.it/privacy/`
- Terms: `https://inetixus.it/terms/`
- Authorized domain: `inetixus.it`
- Use your verified support email. Verify domain ownership with Google when requested and submit brand verification if required.

Google Auth Platform → Clients → your existing Web client:

- Add JavaScript origin: `https://dashboard.inetixus.it`
- Keep the existing redirect URI: `https://aocfndxbjmnqmfyoqjfz.supabase.co/auth/v1/callback`

Publishing/brand verification and the app display name can improve the consent screen. They do not necessarily replace the underlying Supabase hostname shown by Google.

To replace that hostname, configure a Supabase custom auth domain, such as `auth.inetixus.it`. This is a paid add-on for projects on a paid plan. It is separate from the free-standing dashboard website domain and SMTP email setup. Once Supabase has verified and activated the custom domain:

1. Add `https://auth.inetixus.it/auth/v1/callback` in Google’s authorized redirect URIs; keep the original callback during migration.
2. Change `supabaseUrl` in `dist/auth-config.js` to `https://auth.inetixus.it` and publish the site.
3. Test Google sign-in on the dashboard domain before removing any old settings.

Do not change the API URL before Supabase activates that custom domain.

References: https://supabase.com/docs/guides/auth/social-login/auth-google and https://supabase.com/docs/guides/platform/custom-domains

## 7. Sitemap

`https://inetixus.it/sitemap.xml` lists public indexable pages only. `/sitemap/` is the human-readable site map. Authentication and dashboard pages carry noindex and are omitted. Submit the XML sitemap in Google Search Console after the main domain is serving the deployment.

## Preview

`/dashboard/?preview=client` and `/dashboard/?preview=owner` are explicitly labeled design previews with sample data. They never expose real project data or perform writes. Remove `preview` to use the authenticated live app. Real clients start at `https://dashboard.inetixus.it/signup/` or `/login/`.
