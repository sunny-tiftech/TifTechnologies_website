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
- POST/GET /api/contact verified with curl and a real form submission through the browser.
- Lenis smooth scroll, masked line reveals, hover micro-interactions, editorial tech marquee, parallax hero visual.

## Backlog
- P0: Replace placeholder email hello@tiftechnologies.com with real contact details; add phone/WhatsApp/location.
- P1: Admin enquiries inbox (view submissions), email notification on new enquiry (Resend), SEO metadata per page.
- P2: Individual case-study pages per portfolio project, testimonials, careers page.

## Next Tasks
1. Real contact details on Contact page + footer.
2. Admin panel to read enquiries.
3. Email notifications for new enquiries.
