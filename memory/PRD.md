# Tif Technologies — Website PRD

## Original Problem Statement
Create a new website for Tif Technologies (Tif — The Ideaz Factory), a technology and digital solutions company. Tagline: "Turning Ideas Into Intelligent Digital Solutions". Services span web development, mobile development, backend applications, news CRM, social media marketing, and SEO. Stack: Next.js, React.js, Node.js, Python, Django, Flutter, MySQL, PostgreSQL, MS SQL Server. Portfolio includes 3 news platforms with CRM (newsarenaindia.com, khabargaon.com, news4himachal.in), 6 other websites/platforms (homeivf.com, drgauriagarwal.com, genestringlab.com, Sansadflix, futureshiftlabs.com), and the Fundle Loyalty Program (fundle.ai). User choices: dark premium tech aesthetic with light-clean execution, multi-page structure, simple contact form saving enquiries.

## Architecture
- Frontend: React (CRA + craco), react-router-dom v7, framer-motion, lenis smooth scroll, sonner toasts, Tailwind CSS. Pages: Home, Services, Portfolio, Contact. Components: Nav, Footer, Marquee, SignalVisual, Motion helpers, CtaBand. Data in src/lib/data.js. API client in src/lib/api.js.
- Backend: FastAPI (server.py), Motor + MongoDB. POST /api/contact stores enquiries (ContactMessage via BaseDocument pattern, PyObjectId), GET /api/contact lists them. Status-check endpoints retained.
- Brand assets: /app/frontend/public/assets/tif-logo.webp (user logo), /favicon.svg (derived tif mark).

## User Personas
- Prospective client: browsing services/portfolio, submits enquiry via contact form.
- Tif owner: receives enquiries in MongoDB; will later add real contact details.

## Core Requirements (static)
- Dark navy premium design (#0B0E17 base, #1E1A5E navy, cyan accents), Syne / Plus Jakarta Sans / JetBrains Mono.
- Multi-page: Home (kinetic masked-reveal hero, signal visual, tech marquee, about, services preview, portfolio preview, approach, CTA), Services (all 10), Portfolio (9 projects, category filters), Contact (form: name/email/phone/service/budget/message).
- Contact enquiries persist to MongoDB with success state + toast.

## Implemented (2026-10-27)
- All 4 pages built and verified end-to-end (desktop 1440 + mobile 390 screenshots, no overflow).
- POST/GET contact flow verified with curl and a real form submission through the browser.
- Lenis smooth scroll, masked line reveals, hover micro-interactions, editorial tech marquee, parallax hero visual.
- Case study pages for all 9 portfolio projects (/portfolio/:slug) with overview, "what we built", stack, live links.
- Admin auth (JWT httpOnly cookies, bcrypt, brute-force lockout) + protected enquiries inbox at /admin/enquiries. Admin: admin@tiftechnologies.com / TifAdmin@2026 (test credentials).
- Email notification on every new enquiry via Emergent managed Resend (verified: 202 Accepted). Recipient currently test address delivered@resend.dev — replace OWNER_EMAIL in backend/.env with the owner's real email.

## Backlog
- P0: Set OWNER_EMAIL to the owner's real inbox (currently a test address); replace placeholder email hello@tiftechnologies.com; add phone/WhatsApp/location.
- P1: SEO metadata per page, sitemap/robots, enquiry export (CSV), reply-from-inbox deep links.
- P2: Testimonials, careers page, blog.
