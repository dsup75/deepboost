# DeepBoost — Creative & Digital Growth Agency

Production-ready marketing site + internal CMS for DeepBoost, built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, React
Three Fiber, and Supabase.

## Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber / drei, Lucide Icons
- **Backend:** Next.js Route Handlers + Server Actions
- **Database & Auth:** Supabase (Postgres + Row Level Security + Supabase Auth)
- **Email:** Resend
- **Deployment:** Vercel

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Open the SQL editor and run the entire contents of `supabase/schema.sql`.
   This creates every table, enables Row Level Security, adds policies, and
   seeds verified starting metrics + services.
3. Create your first admin user: **Authentication → Users → Add user**
   (email + password). Then, in the SQL editor, insert a matching row so
   they can pass the `is_admin()` check used by RLS:

   ```sql
   insert into profiles (id, full_name, role)
   values ('<the-user-uuid-from-auth>', 'Your Name', 'super_admin');
   ```

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_TO_EMAIL=deepboost1@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_SITE_URL=https://deepboost.com
```

- Supabase URL/keys: **Project Settings → API**
- Resend API key: [resend.com](https://resend.com) → API Keys. Until you
  verify a sending domain, `onboarding@resend.dev` works as the `from`
  address for testing.

## 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the CMS.

**Note:** until Supabase env vars are set, the public site renders using
built-in fallback content (verified metrics, the 5 core services, and your
6 named case studies as drafts) so the site never looks broken during setup.
Once Supabase is connected and seeded, everything switches to live data
automatically — no code changes required.

## 5. Deploy

Push to GitHub and import the repo in Vercel. Add the same environment
variables in **Project Settings → Environment Variables**, then deploy.

## Replacing placeholder images

All temporary Unsplash images used for development live in **one file**:
`lib/assets.ts`. Swap any URL there (or replace usages with Supabase
Storage / Cloudinary URLs) to update images sitewide without touching
component code.

## Content management

Everything editable without touching code, from `/admin`:

- **Case Studies** — client work with metrics, published to `/work`
- **Creative Works** — portfolio pieces, filterable by category
- **Services** — the 5 homepage service cards, reorderable
- **Metrics** — the animated homepage counters (edit only with verified data)
- **Media** — a simple external-URL image library
- **Inquiries** — every contact form submission, with status tracking
- **Settings** — company name, CTA copy, footer text, social links, SEO

## Project structure

```
/app
  /(public)        marketing site routes
  /admin           CMS (auth-gated via middleware.ts)
  /api             route handlers (contact form, etc.)
/components
  /ui              logo, shared primitives
  /3d              Three.js hero visual + fallback
  /sections        homepage sections
  /case-studies    /work grid
  /forms           contact form
  /admin           sidebar, form fields
/lib               supabase clients, assets registry, resend, data fetchers
/types             shared TypeScript types
/supabase          schema.sql (run this first)
/public/brand      original SVG logo + favicon
```

## Notes

- RLS enforces that only authenticated admins (rows in `profiles`) can
  write to content tables or read `contact_submissions`. The public can
  only read published rows and insert new inquiries.
- The 3D hero degrades gracefully: it checks for WebGL support and
  `prefers-reduced-motion`, and falls back to a CSS-only glow visual when
  either is unavailable. Particle count and DPR are reduced on mobile, and
  rendering pauses when the tab is hidden.
- The contact form has server-side validation (Zod), a honeypot field, and
  basic in-memory rate limiting — swap in Upstash/Redis for multi-instance
  deployments.
