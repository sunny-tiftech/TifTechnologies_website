import json
from pathlib import Path

# Detail content per service, keyed by num. Each gets slug, overview, process,
# technologies, faq, stats, whyUs, deliverables.
DETAIL = {
    "01": {
        "slug": "web-development",
        "overview": "We design and build modern, responsive, high-performance websites and web platforms that load fast, rank well, and convert visitors into customers. From a company's first marketing site to a complex customer portal, every build is engineered for speed, security, and scale.",
        "deliverables": [
            "Corporate and marketing websites",
            "Product and SaaS web platforms",
            "Customer and partner portals",
            "E-commerce storefronts",
            "Progressive web apps",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We map your goals, audience, and content to a clear site plan."},
            {"num": "02", "title": "Design", "desc": "Wireframes and high-fidelity screens shaped around your brand."},
            {"num": "03", "title": "Build", "desc": "Performance-first development with clean, maintainable code."},
            {"num": "04", "title": "Launch & grow", "desc": "Deployment, analytics, and ongoing optimisation after go-live."},
        ],
        "technologies": ["Next.js", "React.js", "Node.js", "Tailwind CSS", "MySQL", "PostgreSQL"],
        "stats": [
            {"value": "10+", "label": "Web platforms shipped"},
            {"value": "<2s", "label": "Target page load"},
            {"value": "100%", "label": "Responsive builds"},
        ],
        "whyUs": [
            {"title": "Performance-first", "desc": "Every build is optimised for speed, Core Web Vitals, and SEO from day one."},
            {"title": "Built to scale", "desc": "Architecture that grows from first visitor to high-traffic production."},
            {"title": "Design that converts", "desc": "Clean, brand-led interfaces focused on turning visitors into enquiries."},
        ],
        "faq": [
            {"q": "How long does a website take to build?", "a": "A marketing site typically takes 2-4 weeks; a custom web platform 6-12 weeks depending on scope and integrations."},
            {"q": "Will my website work on mobile?", "a": "Yes. Every site we build is fully responsive and tested across phones, tablets, and desktops."},
            {"q": "Do you provide hosting and maintenance?", "a": "Yes. We can deploy, host, and maintain your site, or hand over a self-hosting package with full documentation."},
        ],
    },
    "02": {
        "slug": "mobile-app-development",
        "overview": "We build feature-rich mobile applications for Android and iOS that feel native and perform flawlessly. Using Flutter and React Native, we ship one codebase to both stores — faster to market and easier to maintain.",
        "deliverables": [
            "Android and iOS applications",
            "Cross-platform Flutter apps",
            "React Native apps",
            "App-store submission and release",
            "Push notifications and analytics",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We define features, user flows, and the minimum lovable product."},
            {"num": "02", "title": "Design", "desc": "Native-feel screens and prototypes tested with real users."},
            {"num": "03", "title": "Build", "desc": "Iterative development with regular builds you can install."},
            {"num": "04", "title": "Launch & grow", "desc": "Store submission, monitoring, and version updates."},
        ],
        "technologies": ["Flutter", "React Native", "Dart", "Firebase", "Node.js", "MySQL"],
        "stats": [
            {"value": "2", "label": "Platforms, one codebase"},
            {"value": "100%", "label": "Store-ready delivery"},
        ],
        "whyUs": [
            {"title": "One codebase, both stores", "desc": "Flutter and React Native cut cost and time without compromising quality."},
            {"title": "Native performance", "desc": "Smooth, responsive apps that users can't tell from fully native."},
            {"title": "End-to-end delivery", "desc": "From design to store submission, we handle the whole journey."},
        ],
        "faq": [
            {"q": "Should I build native or cross-platform?", "a": "For most products, cross-platform (Flutter/React Native) gives native feel at lower cost. We'll recommend the right fit for your needs."},
            {"q": "How much does a mobile app cost?", "a": "It depends on features and integrations. We scope a minimum viable product first so you launch lean and iterate."},
            {"q": "Do you handle app store approval?", "a": "Yes. We prepare store listings, screenshots, and manage the submission and review process for both stores."},
        ],
    },
    "03": {
        "slug": "backend-custom-software",
        "overview": "We engineer robust backend systems, APIs, and custom business software that power your operations. From internal tools and automation to customer-facing platforms, we build the reliable foundation your business runs on.",
        "deliverables": [
            "REST and GraphQL APIs",
            "Custom business applications",
            "Internal tools and dashboards",
            "Third-party system integrations",
            "Legacy platform modernisation",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We understand your workflows, data, and integration points."},
            {"num": "02", "title": "Architect", "desc": "We design a scalable, secure system and data model."},
            {"num": "03", "title": "Build", "desc": "Clean, tested, documented code with CI/CD."},
            {"num": "04", "title": "Launch & grow", "desc": "Deployment, monitoring, and iterative improvement."},
        ],
        "technologies": ["Node.js", "Python", "Django", "MySQL", "PostgreSQL", "MongoDB"],
        "stats": [
            {"value": "99.9%", "label": "Uptime focus"},
            {"value": "Secure", "label": "By design"},
        ],
        "whyUs": [
            {"title": "Engineered for reliability", "desc": "Systems built for uptime, security, and real business load."},
            {"title": "Integration-first", "desc": "We connect your tools, data, and workflows into one system."},
            {"title": "Maintainable code", "desc": "Documented, tested code your team can build on for years."},
        ],
        "faq": [
            {"q": "Can you integrate with our existing software?", "a": "Yes. We regularly connect CRMs, payment gateways, ERPs, and third-party APIs into a unified system."},
            {"q": "Do you modernise legacy systems?", "a": "Yes. We can incrementally modernise legacy platforms without disrupting your day-to-day operations."},
            {"q": "How do you handle data security?", "a": "We follow security best practices — encryption, access control, and audit trails — tailored to your compliance needs."},
        ],
    },
    "04": {
        "slug": "leads-management-systems",
        "overview": "We build customized lead management systems that capture, organise, track, and convert leads into customers. From ad click to closed deal, every enquiry is captured, routed, and followed up automatically.",
        "deliverables": [
            "Custom CRM and lead pipelines",
            "Meta Lead Ads integration",
            "Automated lead syncing",
            "Follow-up and task automation",
            "Sales reporting and dashboards",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We map your sales process and lead sources end to end."},
            {"num": "02", "title": "Design", "desc": "Pipeline stages, routing rules, and dashboards shaped to your team."},
            {"num": "03", "title": "Build", "desc": "CRM, integrations, and automation built and connected."},
            {"num": "04", "title": "Launch & grow", "desc": "Team onboarding, reporting, and continuous tuning."},
        ],
        "technologies": ["Node.js", "React.js", "MySQL", "Meta Lead Ads API", "WhatsApp API", "SMS gateways"],
        "stats": [
            {"value": "0", "label": "Leads lost"},
            {"value": "24/7", "label": "Automated capture"},
        ],
        "whyUs": [
            {"title": "Never lose a lead", "desc": "Every enquiry is captured and routed instantly, from any source."},
            {"title": "Built for your process", "desc": "Pipelines and automation shaped around how your team actually sells."},
            {"title": "Clear ROI", "desc": "Dashboards show exactly which sources and campaigns convert."},
        ],
        "faq": [
            {"q": "Can you pull leads from Meta and Google ads?", "a": "Yes. We integrate Meta Lead Ads, Google Ads, and website forms so every lead lands in one place automatically."},
            {"q": "Can it send automatic follow-ups?", "a": "Yes. We set up WhatsApp, SMS, and email follow-ups triggered by lead stage and activity."},
            {"q": "Will it work for my sales team size?", "a": "Yes. We build for solo founders through to large sales teams with roles, territories, and permissions."},
        ],
    },
    "05": {
        "slug": "ai-solutions-api-integrations",
        "overview": "We integrate AI APIs into your websites, mobile apps, and business systems to unlock intelligent features — content processing, conversational experiences, smart search, and workflow automation that save time and delight users.",
        "deliverables": [
            "LLM API integrations",
            "AI chat and assistants",
            "Intelligent content processing",
            "Smart search and recommendations",
            "Document and data extraction",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We identify where AI creates real value in your product or workflow."},
            {"num": "02", "title": "Design", "desc": "We design prompts, flows, and guardrails for reliable output."},
            {"num": "03", "title": "Build", "desc": "API integration, testing, and cost-efficient model selection."},
            {"num": "04", "title": "Launch & grow", "desc": "Monitoring, evaluation, and continuous refinement."},
        ],
        "technologies": ["OpenAI", "Claude", "Gemini", "Node.js", "Python", "Vector databases"],
        "stats": [
            {"value": "10x", "label": "Faster workflows"},
            {"value": "24/7", "label": "AI availability"},
        ],
        "whyUs": [
            {"title": "Practical AI", "desc": "We focus on AI that solves real problems, not hype."},
            {"title": "Cost-efficient", "desc": "Right-sized models and caching keep your AI bills predictable."},
            {"title": "Safe and reliable", "desc": "Guardrails, fallbacks, and evaluation keep output trustworthy."},
        ],
        "faq": [
            {"q": "Which AI models do you work with?", "a": "We integrate OpenAI, Claude, Gemini, and other leading models, choosing the best fit for your use case and budget."},
            {"q": "Is my data safe with AI integrations?", "a": "Yes. We design integrations that protect your data and respect privacy, with clear data-handling practices."},
            {"q": "How much does AI integration cost?", "a": "It varies by usage. We design for cost efficiency and give you visibility into usage and spend."},
        ],
    },
    "06": {
        "slug": "ai-agents-automation",
        "overview": "We build AI-powered agents and automated workflows that streamline operations and boost productivity. From autonomous agents that handle routine tasks to tool integrations that connect your stack, we put your business on autopilot.",
        "deliverables": [
            "Autonomous AI agents",
            "Workflow and process automation",
            "Tool and API orchestration",
            "Automated reporting",
            "Human-in-the-loop review flows",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We find the repetitive, high-volume tasks worth automating."},
            {"num": "02", "title": "Design", "desc": "We map agent behaviour, tools, and human checkpoints."},
            {"num": "03", "title": "Build", "desc": "Agents and automations built, tested, and hardened."},
            {"num": "04", "title": "Launch & grow", "desc": "Monitoring, guardrails, and expanding automation scope."},
        ],
        "technologies": ["Python", "Node.js", "LLM APIs", "Workflow engines", "Webhooks", "Message queues"],
        "stats": [
            {"value": "80%", "label": "Routine tasks automated"},
            {"value": "24/7", "label": "Always-on agents"},
        ],
        "whyUs": [
            {"title": "Real automation", "desc": "We automate end-to-end processes, not just single steps."},
            {"title": "Human in control", "desc": "Review checkpoints keep people in charge of important decisions."},
            {"title": "Measurable impact", "desc": "We track time saved and errors reduced so you see the ROI."},
        ],
        "faq": [
            {"q": "What can AI agents actually do?", "a": "Agents can handle support queries, process documents, update systems, generate reports, and coordinate multi-step workflows."},
            {"q": "Is automation reliable enough for my business?", "a": "Yes. We add guardrails, logging, and human review so automation is dependable and auditable."},
            {"q": "How do we get started with automation?", "a": "We start with one high-impact workflow, prove the value, then expand across your operations."},
        ],
    },
    "07": {
        "slug": "news-websites-crm",
        "overview": "We build digital publishing platforms and newsroom CRMs that let editorial teams publish fast, manage workflows, and grow audience. From breaking-news portals to video-first shows, we power modern newsrooms end to end.",
        "deliverables": [
            "Digital news publishing platforms",
            "Custom newsroom CRM",
            "Editorial workflow management",
            "Breaking news distribution",
            "Subscription and membership flows",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We understand your editorial workflow, roles, and content model."},
            {"num": "02", "title": "Design", "desc": "Reader experience and newsroom tools designed together."},
            {"num": "03", "title": "Build", "desc": "Fast public site plus a CRM built for editorial speed."},
            {"num": "04", "title": "Launch & grow", "desc": "SEO, analytics, and audience growth after launch."},
        ],
        "technologies": ["Next.js", "React.js", "Node.js", "PostgreSQL", "Redis", "CDN"],
        "stats": [
            {"value": "4+", "label": "Live news platforms"},
            {"value": "<1s", "label": "Article page loads"},
        ],
        "whyUs": [
            {"title": "Newsroom-proven", "desc": "We've shipped multiple live news platforms used by real editorial teams."},
            {"title": "Speed where it matters", "desc": "Publishing and page loads engineered for breaking news."},
            {"title": "Built-in CRM", "desc": "A newsroom CRM tailored to editorial roles and workflow."},
        ],
        "faq": [
            {"q": "Have you built news platforms before?", "a": "Yes. We've built and shipped multiple live news portals with custom newsroom CRMs, including national and regional outlets."},
            {"q": "Can it handle high traffic on breaking news?", "a": "Yes. We engineer for high-traffic news days with caching, CDN, and resilient infrastructure."},
            {"q": "Can editors publish without technical help?", "a": "Yes. The newsroom CRM is built for editors — publish, schedule, and manage content with no code."},
        ],
    },
    "08": {
        "slug": "social-media-marketing",
        "overview": "We grow your brand on social media with strategy, content, and engagement that builds visibility and drives enquiries. From content calendars to community management, we turn followers into customers.",
        "deliverables": [
            "Social media strategy",
            "Content calendars and creatives",
            "Audience engagement and community",
            "Paid social campaigns",
            "Performance reporting",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We audit your brand, audience, and competitors."},
            {"num": "02", "title": "Design", "desc": "Strategy, content pillars, and a monthly calendar."},
            {"num": "03", "title": "Build", "desc": "Content creation, publishing, and community engagement."},
            {"num": "04", "title": "Launch & grow", "desc": "Reporting, optimisation, and audience growth."},
        ],
        "technologies": ["Content strategy", "Design tools", "Scheduling platforms", "Analytics", "Paid social", "Community management"],
        "stats": [
            {"value": "3x", "label": "Engagement growth"},
            {"value": "Daily", "label": "Consistent presence"},
        ],
        "whyUs": [
            {"title": "Strategy-led", "desc": "Every post ladders up to a clear brand and growth goal."},
            {"title": "Consistent output", "desc": "Reliable calendars keep your brand visible every day."},
            {"title": "Measured results", "desc": "Clear reporting shows reach, engagement, and enquiries."},
        ],
        "faq": [
            {"q": "Which platforms do you manage?", "a": "We manage Instagram, Facebook, LinkedIn, X, and YouTube, tailored to where your audience actually is."},
            {"q": "Do you create the content too?", "a": "Yes. We handle strategy, copy, creatives, and publishing so you have a complete, hands-off presence."},
            {"q": "How soon will we see results?", "a": "Engagement typically improves within the first month; meaningful follower and enquiry growth builds over 3-6 months."},
        ],
    },
    "09": {
        "slug": "search-engine-optimization",
        "overview": "We improve your search visibility, organic traffic, and digital discoverability with technical SEO, content, and authority building. The result: customers find you when they search, not your competitors.",
        "deliverables": [
            "Technical SEO audits and fixes",
            "Keyword and content strategy",
            "On-page optimisation",
            "Authority and link building",
            "Local SEO",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "Full audit of your site, keywords, and competitors."},
            {"num": "02", "title": "Design", "desc": "Keyword map and content plan aligned to search demand."},
            {"num": "03", "title": "Build", "desc": "Technical fixes, content, and authority building."},
            {"num": "04", "title": "Launch & grow", "desc": "Rank tracking, reporting, and continuous optimisation."},
        ],
        "technologies": ["Technical SEO", "Keyword research", "Content optimisation", "Core Web Vitals", "Schema markup", "Analytics"],
        "stats": [
            {"value": "Top 3", "label": "Target rankings"},
            {"value": "Organic", "label": "Sustainable traffic"},
        ],
        "whyUs": [
            {"title": "Technical depth", "desc": "We're engineers first — we fix the technical issues others miss."},
            {"title": "Content that ranks", "desc": "Search-driven content that also converts readers."},
            {"title": "Transparent reporting", "desc": "You see rankings, traffic, and enquiries every month."},
        ],
        "faq": [
            {"q": "How long does SEO take to work?", "a": "You'll typically see movement in 3-4 months, with strong results building over 6-12 months of consistent work."},
            {"q": "Do you guarantee rankings?", "a": "No one can guarantee rankings, but we follow proven, white-hat practices that deliver sustainable results."},
            {"q": "Is SEO a one-time thing?", "a": "SEO compounds over time. Ongoing optimisation keeps you ahead as search and competitors evolve."},
        ],
    },
    "10": {
        "slug": "loyalty-program-solutions",
        "overview": "We build technology-driven loyalty programs and customer engagement platforms that turn one-time buyers into repeat customers. From points and rewards to deep analytics, we help brands keep customers coming back.",
        "deliverables": [
            "Points and rewards engine",
            "Customer engagement platform",
            "Earn and redeem flows",
            "Location-wise analytics",
            "Campaign and ROI reporting",
        ],
        "process": [
            {"num": "01", "title": "Discover", "desc": "We design a program structure that fits your business and margins."},
            {"num": "02", "title": "Design", "desc": "Earn/redeem rules, tiers, and customer experience."},
            {"num": "03", "title": "Build", "desc": "Loyalty platform, integrations, and analytics."},
            {"num": "04", "title": "Launch & grow", "desc": "Rollout, campaigns, and engagement optimisation."},
        ],
        "technologies": ["Python", "Django", "MySQL", "MongoDB", "SMS/WhatsApp", "Analytics"],
        "stats": [
            {"value": "AI", "label": "Powered insights"},
            {"value": "360°", "label": "Customer view"},
        ],
        "whyUs": [
            {"title": "Proven platform", "desc": "We've built and run loyalty platforms for malls and retail brands."},
            {"title": "Deep analytics", "desc": "Track earn, redeem, repeat purchases, and campaign ROI."},
            {"title": "End-to-end", "desc": "From program design to technology and campaigns."},
        ],
        "faq": [
            {"q": "Have you built loyalty programs before?", "a": "Yes. We've built AI-powered loyalty platforms for malls and retail brands with rewards, analytics, and campaign intelligence."},
            {"q": "Can it integrate with our billing/POS?", "a": "Yes. We integrate loyalty with billing, POS, and CRM so earning and redeeming is seamless."},
            {"q": "How do customers earn and redeem?", "a": "Through a reward desk, app, or web — customers register, earn on purchases, and redeem rewards with OTP-verified flows."},
        ],
    },
}


def enrich(services):
    out = []
    for s in services:
        d = DETAIL[s["num"]]
        merged = dict(s)
        merged.update(d)
        out.append(merged)
    return out


def main():
    seed_path = Path("/app/backend/seed_content.json")
    seed = json.loads(seed_path.read_text())
    seed["services"] = enrich(seed["services"])
    seed_path.write_text(json.dumps(seed, indent=2, ensure_ascii=False) + "\n")
    print("seed_content.json updated")

    data_path = Path("/app/frontend/src/lib/data.js")
    content = json.loads(Path("/app/backend/seed_content.json").read_text())
    js = "export const defaultContent = " + json.dumps(content, indent=2, ensure_ascii=False) + ";\n"
    data_path.write_text(js)
    print("data.js updated")


if __name__ == "__main__":
    main()
