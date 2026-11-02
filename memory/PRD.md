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
- LIGHT THEME redesign (user rejected dark layout): light corporate theme — #F7F8FB base, navy #1E1A5E headings, blue #2563EB accents, white cards.
- Portfolio now uses REAL screenshots of live sites (captured 2026-10-27 into /app/frontend/public/assets/work/): News Arena India, Khabar Gaon, News 4 Himachal, Jist News, HomeIVF, Dr Gauri Agarwal, Genestring Lab, Future Shift Labs (+tracker), GovernBetter. New items added: Jist News, GovernBetter; Future Shift Labs links tracker.futureshiftlabs.com. Sansadflix keeps stock image (no URL provided).
- Fundle Loyalty Program: user's own dashboard screenshots in /app/frontend/public/assets/fundle/ (8 total: home, analytics x2, reports x2, customer registration, program setup, SMS configure) used as card image + case study gallery; content informed by fundle.ai. URL: newu.fundlezone.com. Stats updated: 12 products, 10 services, 4 news platforms.
- Tech stack corrections per user (2026-10-27): news sites (all 4) = Next.js/React.js + Node.js + PostgreSQL; HomeIVF/DrGauri/Genestring = Next.js/React.js + Node.js + MySQL; Fundle = Python, Django, MySQL, MongoDB. Sansadflix got real URL sansadflix.com + captured screenshot. Display font changed Syne -> Sora (bold) after user reported font looked improper.
- CMS admin (2026-10-27): ALL site content lives in MySQL (site_content table, seeded from seed_content.json; defaults in frontend data.js). Admin editor at /admin/content with tabs: Home, Services, Portfolio, Contact & Site, Pages. Public GET /api/content; protected PUT /api/admin/content. Custom pages: CRUD via /api/admin/pages, public /p/:slug + footer links. Verified e2e: hero edit from admin appeared on homepage, created + deleted a test page via UI.
- MYSQL MIGRATION (2026-10-27, user request — they will self-host): backend fully migrated from MongoDB to MySQL/MariaDB via SQLAlchemy 2.1 async + aiomysql. Tables: users, login_attempts, site_content (JSON doc), custom_pages, contact_messages, status_checks — auto-created on startup; admin + content auto-seeded. Connection via MYSQL_URL in backend/.env (MONGO_URL key left in place but unused). MariaDB installed locally for preview (datadir /root/mariadb_data, supervisor program "mariadb", self-healing launcher /app/scripts/start-mariadb.sh reinstalls binaries after pod wipes). scripts/setup-mysql.sh provisions DB+user on their own server. Verified: all endpoints, auth, content save, pages CRUD, enquiry storage with ₹ (utf8mb4), browser admin login. Old MongoDB test enquiries were NOT migrated (test data only). NOTE: Emergent's own Deploy provisions MongoDB only — MySQL backend is meant for their self-hosted server.
- Gallery screenshots per project (2026-11-02): captured 2-3 extra real screenshots per site (scroll positions) into /app/frontend/public/assets/work/; every case study now has an "Inside the product" gallery (3 imgs each, FutureShift 4 incl. tracker, GovernBetter 2, Fundle 8 user-provided). Galleries stored in MySQL content; seed_content.json + data.js defaults regenerated from live content. Package refreshed: /app/tif-technologies-website.zip + /app/tif_db_dump.sql.

## Backlog
- P0: Set OWNER_EMAIL to the owner's real inbox (currently a test address); replace placeholder email hello@tiftechnologies.com; add phone/WhatsApp/location.
- P1: SEO metadata per page, sitemap/robots, enquiry export (CSV), reply-from-inbox deep links.
- P2: Testimonials, careers page, blog.
