import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Save, Plus, Trash2, Inbox, ExternalLink, ArrowLeft } from "lucide-react";
import { api, formatApiErrorDetail } from "@/lib/AuthContext";
import { useContent } from "@/lib/content";
import { iconMap } from "@/lib/icons";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200";

function setIn(obj, path, value) {
  const next = JSON.parse(JSON.stringify(obj));
  const keys = path.split(".");
  let cur = next;
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
  cur[keys[keys.length - 1]] = value;
  return next;
}

const lines = (s) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const toLines = (a) => (Array.isArray(a) ? a.join("\n") : "");
const pairs = (s, ka, kb) =>
  lines(s).map((l) => {
    const [a, ...rest] = l.split("|");
    return { [ka]: (a || "").trim(), [kb]: rest.join("|").trim() };
  });
const pairsToLines = (a, ka, kb) => (Array.isArray(a) ? a.map((x) => `${x[ka]} | ${x[kb]}`).join("\n") : "");

const Label = ({ children }) => (
  <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500">{children}</span>
);

const Group = ({ title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
    <h3 className="mb-4 font-display text-sm font-semibold text-[#1E1A5E]">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const TABS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact & Site" },
  { id: "pages", label: "Pages" },
];

export default function AdminContent() {
  const { content, refresh } = useContent();
  const [tab, setTab] = useState("home");
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content && content.hero && !draft) setDraft(JSON.parse(JSON.stringify(content)));
  }, [content, draft]);

  const set = (path, value) => setDraft((d) => setIn(d, path, value));
  const setEvt = (path) => (e) => set(path, e.target.value);

  const save = async () => {
    setSaving(true);
    try {
      await api.put("/admin/content", draft);
      refresh();
      toast.success("Content saved — the site is updated.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setSaving(false);
    }
  };

  if (!draft) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">Loading…</span>
      </main>
    );
  }

  const iconOptions = Object.keys(iconMap);

  return (
    <main data-testid="admin-content-page" className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Admin</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[#1E1A5E]">Site Content</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/enquiries"
            data-testid="admin-to-enquiries"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-500"
          >
            <Inbox size={15} /> Enquiries
          </Link>
          {tab !== "pages" && (
            <button
              onClick={save}
              disabled={saving}
              data-testid="admin-content-save"
              className="inline-flex items-center gap-2 rounded-full bg-[#1E1A5E] px-5 py-2.5 text-sm font-semibold text-white transition hover:shadow-[0_10px_30px_-8px_rgba(30,26,94,0.5)] disabled:opacity-60"
            >
              <Save size={15} /> {saving ? "Saving…" : "Save changes"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            data-testid={`admin-tab-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              tab === t.id
                ? "bg-[#1E1A5E] text-white"
                : "border border-slate-300 text-slate-600 hover:text-[#1E1A5E]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {tab === "home" && (
          <>
            <Group title="Hero">
              <div><Label>Eyebrow (small label)</Label><input className={inputCls} value={draft.hero.eyebrow} onChange={setEvt("hero.eyebrow")} data-testid="edit-hero-eyebrow" /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><Label>Headline line 1</Label><input className={inputCls} value={draft.hero.line1} onChange={setEvt("hero.line1")} data-testid="edit-hero-line1" /></div>
                <div><Label>Headline line 2</Label><input className={inputCls} value={draft.hero.line2} onChange={setEvt("hero.line2")} data-testid="edit-hero-line2" /></div>
                <div><Label>Accent word (highlighted in line 2)</Label><input className={inputCls} value={draft.hero.accent} onChange={setEvt("hero.accent")} data-testid="edit-hero-accent" /></div>
                <div><Label>Headline line 3</Label><input className={inputCls} value={draft.hero.line3} onChange={setEvt("hero.line3")} data-testid="edit-hero-line3" /></div>
              </div>
              <div><Label>Subtext</Label><textarea rows={3} className={inputCls} value={draft.hero.sub} onChange={setEvt("hero.sub")} data-testid="edit-hero-sub" /></div>
              <div>
                <Label>Stats (one per line: value | label)</Label>
                <textarea rows={3} className={inputCls} defaultValue={pairsToLines(draft.hero.stats, "value", "label")} onBlur={(e) => set("hero.stats", pairs(e.target.value, "value", "label"))} data-testid="edit-hero-stats" />
              </div>
            </Group>

            <Group title="About section">
              <div><Label>Eyebrow</Label><input className={inputCls} value={draft.about.eyebrow} onChange={setEvt("about.eyebrow")} /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><Label>Heading</Label><input className={inputCls} value={draft.about.heading} onChange={setEvt("about.heading")} /></div>
                <div><Label>Heading accent (blue part)</Label><input className={inputCls} value={draft.about.headingAccent} onChange={setEvt("about.headingAccent")} /></div>
              </div>
              <div><Label>Lead paragraph</Label><textarea rows={3} className={inputCls} value={draft.about.lead} onChange={setEvt("about.lead")} /></div>
              <div><Label>Body paragraph</Label><textarea rows={4} className={inputCls} value={draft.about.body} onChange={setEvt("about.body")} /></div>
              <Label>Highlight cards</Label>
              {draft.about.highlights.map((h, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <Label>Icon</Label>
                      <select className={inputCls} value={h.icon} onChange={setEvt(`about.highlights.${i}.icon`)}>
                        {iconOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                      </select>
                    </div>
                    <div><Label>Title</Label><input className={inputCls} value={h.title} onChange={setEvt(`about.highlights.${i}.title`)} /></div>
                    <div><Label>Sub</Label><input className={inputCls} value={h.sub} onChange={setEvt(`about.highlights.${i}.sub`)} /></div>
                  </div>
                </div>
              ))}
            </Group>

            <Group title="Approach steps">
              {draft.approach.map((s, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="grid gap-3 sm:grid-cols-[80px_1fr_2fr]">
                    <div><Label>Num</Label><input className={inputCls} value={s.num} onChange={setEvt(`approach.${i}.num`)} /></div>
                    <div><Label>Title</Label><input className={inputCls} value={s.title} onChange={setEvt(`approach.${i}.title`)} /></div>
                    <div><Label>Description</Label><input className={inputCls} value={s.desc} onChange={setEvt(`approach.${i}.desc`)} /></div>
                  </div>
                </div>
              ))}
            </Group>

            <Group title="Technology stack groups">
              {draft.techGroups.map((g, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <div><Label>Group label</Label><input className={inputCls} value={g.label} onChange={setEvt(`techGroups.${i}.label`)} /></div>
                  <div className="mt-3">
                    <Label>Items (one per line)</Label>
                    <textarea rows={4} className={inputCls} defaultValue={toLines(g.items)} onBlur={(e) => set(`techGroups.${i}.items`, lines(e.target.value))} />
                  </div>
                </div>
              ))}
            </Group>

            <Group title="Call-to-action band (all pages)">
              <div><Label>Text before highlight</Label><input className={inputCls} value={draft.cta.line1} onChange={setEvt("cta.line1")} /></div>
              <div><Label>Highlighted text</Label><input className={inputCls} value={draft.cta.accent} onChange={setEvt("cta.accent")} /></div>
              <div><Label>Subtext</Label><input className={inputCls} value={draft.cta.sub} onChange={setEvt("cta.sub")} /></div>
            </Group>
          </>
        )}

        {tab === "services" && (
          <>
            <Group title="Services page heading">
              <div className="grid gap-3 sm:grid-cols-3">
                <div><Label>Line 1</Label><input className={inputCls} value={draft.servicesPage.line1} onChange={setEvt("servicesPage.line1")} /></div>
                <div><Label>Line 2</Label><input className={inputCls} value={draft.servicesPage.line2} onChange={setEvt("servicesPage.line2")} /></div>
                <div><Label>Accent word</Label><input className={inputCls} value={draft.servicesPage.accent} onChange={setEvt("servicesPage.accent")} /></div>
              </div>
              <div><Label>Subtext</Label><textarea rows={3} className={inputCls} value={draft.servicesPage.sub} onChange={setEvt("servicesPage.sub")} /></div>
            </Group>

            {draft.services.map((s, i) => (
              <Group
                key={i}
                title={`Service ${s.num} — ${s.title}`}
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => set("services", draft.services.filter((_, x) => x !== i))}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50"
                    data-testid={`service-remove-${i}`}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-[90px_1fr_160px]">
                  <div><Label>Num</Label><input className={inputCls} value={s.num} onChange={setEvt(`services.${i}.num`)} /></div>
                  <div><Label>Title</Label><input className={inputCls} value={s.title} onChange={setEvt(`services.${i}.title`)} data-testid={`service-title-${i}`} /></div>
                  <div>
                    <Label>Icon</Label>
                    <select className={inputCls} value={s.icon} onChange={setEvt(`services.${i}.icon`)}>
                      {iconOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                    </select>
                  </div>
                </div>
                <div><Label>Description</Label><textarea rows={2} className={inputCls} value={s.desc} onChange={setEvt(`services.${i}.desc`)} /></div>
                <div>
                  <Label>Features (one per line)</Label>
                  <textarea rows={3} className={inputCls} defaultValue={toLines(s.features)} onBlur={(e) => set(`services.${i}.features`, lines(e.target.value))} />
                </div>
              </Group>
            ))}

            <button
              type="button"
              onClick={() =>
                set("services", [
                  ...draft.services,
                  { num: String(draft.services.length + 1).padStart(2, "0"), icon: "globe", title: "New Service", desc: "", features: [] },
                ])
              }
              data-testid="service-add"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
            >
              <Plus size={15} /> Add service
            </button>
          </>
        )}

        {tab === "portfolio" && (
          <>
            <Group title="Portfolio page heading">
              <div className="grid gap-3 sm:grid-cols-3">
                <div><Label>Line 1</Label><input className={inputCls} value={draft.portfolioPage.line1} onChange={setEvt("portfolioPage.line1")} /></div>
                <div><Label>Line 2</Label><input className={inputCls} value={draft.portfolioPage.line2} onChange={setEvt("portfolioPage.line2")} /></div>
                <div><Label>Accent word</Label><input className={inputCls} value={draft.portfolioPage.accent} onChange={setEvt("portfolioPage.accent")} /></div>
              </div>
              <div><Label>Subtext</Label><textarea rows={3} className={inputCls} value={draft.portfolioPage.sub} onChange={setEvt("portfolioPage.sub")} /></div>
            </Group>

            {draft.portfolio.map((p, i) => (
              <Group key={i} title={`${p.name}`}>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-500">
                    <input type="checkbox" checked={!!p.featured} onChange={(e) => set(`portfolio.${i}.featured`, e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                    Featured on homepage
                  </label>
                  <button
                    type="button"
                    onClick={() => set("portfolio", draft.portfolio.filter((_, x) => x !== i))}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50"
                    data-testid={`portfolio-remove-${i}`}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div><Label>Name</Label><input className={inputCls} value={p.name} onChange={setEvt(`portfolio.${i}.name`)} data-testid={`portfolio-name-${i}`} /></div>
                  <div><Label>Slug (URL)</Label><input className={inputCls} value={p.slug} onChange={setEvt(`portfolio.${i}.slug`)} /></div>
                  <div><Label>Category</Label><input className={inputCls} value={p.category} onChange={setEvt(`portfolio.${i}.category`)} /></div>
                  <div><Label>Domain (shown)</Label><input className={inputCls} value={p.domain} onChange={setEvt(`portfolio.${i}.domain`)} /></div>
                  <div><Label>Live URL</Label><input className={inputCls} value={p.url || ""} onChange={setEvt(`portfolio.${i}.url`)} /></div>
                  <div><Label>Card image path</Label><input className={inputCls} value={p.image} onChange={setEvt(`portfolio.${i}.image`)} /></div>
                </div>
                <div><Label>Short description</Label><textarea rows={2} className={inputCls} value={p.description} onChange={setEvt(`portfolio.${i}.description`)} /></div>
                <div><Label>Overview (case study)</Label><textarea rows={3} className={inputCls} value={p.overview} onChange={setEvt(`portfolio.${i}.overview`)} /></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div><Label>Tech stack (one per line)</Label><textarea rows={3} className={inputCls} defaultValue={toLines(p.tech)} onBlur={(e) => set(`portfolio.${i}.tech`, lines(e.target.value))} /></div>
                  <div><Label>What we built (one per line)</Label><textarea rows={3} className={inputCls} defaultValue={toLines(p.built)} onBlur={(e) => set(`portfolio.${i}.built`, lines(e.target.value))} /></div>
                  <div><Label>Gallery images (one per line)</Label><textarea rows={3} className={inputCls} defaultValue={toLines(p.gallery)} onBlur={(e) => set(`portfolio.${i}.gallery`, lines(e.target.value))} /></div>
                  <div><Label>Extra links (label | url)</Label><textarea rows={3} className={inputCls} defaultValue={pairsToLines(p.extraLinks, "label", "url")} onBlur={(e) => set(`portfolio.${i}.extraLinks`, pairs(e.target.value, "label", "url"))} /></div>
                </div>
              </Group>
            ))}

            <button
              type="button"
              onClick={() =>
                set("portfolio", [
                  ...draft.portfolio,
                  {
                    slug: `new-project-${draft.portfolio.length + 1}`,
                    name: "New Project",
                    domain: "example.com",
                    url: "",
                    category: "Websites & Platforms",
                    description: "",
                    overview: "",
                    tech: [],
                    built: [],
                    image: "",
                    gallery: [],
                    extraLinks: [],
                    featured: false,
                  },
                ])
              }
              data-testid="portfolio-add"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
            >
              <Plus size={15} /> Add project
            </button>
          </>
        )}

        {tab === "contact" && (
          <>
            <Group title="Site details (header/footer)">
              <div><Label>Brand name</Label><input className={inputCls} value={draft.site.brand} onChange={setEvt("site.brand")} /></div>
              <div><Label>Tagline</Label><input className={inputCls} value={draft.site.tagline} onChange={setEvt("site.tagline")} /></div>
              <div><Label>Contact email</Label><input className={inputCls} value={draft.site.email} onChange={setEvt("site.email")} data-testid="edit-site-email" /></div>
            </Group>
            <Group title="Contact page">
              <div className="grid gap-3 sm:grid-cols-3">
                <div><Label>Line 1</Label><input className={inputCls} value={draft.contactPage.line1} onChange={setEvt("contactPage.line1")} /></div>
                <div><Label>Line 2</Label><input className={inputCls} value={draft.contactPage.line2} onChange={setEvt("contactPage.line2")} /></div>
                <div><Label>Accent word</Label><input className={inputCls} value={draft.contactPage.accent} onChange={setEvt("contactPage.accent")} /></div>
              </div>
              <div><Label>Subtext</Label><textarea rows={3} className={inputCls} value={draft.contactPage.sub} onChange={setEvt("contactPage.sub")} /></div>
              <div>
                <Label>Budget options (one per line)</Label>
                <textarea rows={4} className={inputCls} defaultValue={toLines(draft.contactPage.budgets)} onBlur={(e) => set("contactPage.budgets", lines(e.target.value))} data-testid="edit-budgets" />
              </div>
              <div>
                <Label>"What happens next" steps (num | text)</Label>
                <textarea rows={3} className={inputCls} defaultValue={pairsToLines(draft.contactPage.steps, "num", "text")} onBlur={(e) => set("contactPage.steps", pairs(e.target.value, "num", "text"))} />
              </div>
            </Group>
          </>
        )}

        {tab === "pages" && <PagesTab />}
      </div>
    </main>
  );
}

function PagesTab() {
  const { pages, refresh } = useContent();
  const [form, setForm] = useState(null);
  const [editingSlug, setEditingSlug] = useState(null);
  const [busy, setBusy] = useState(false);

  const startNew = () => {
    setEditingSlug(null);
    setForm({ slug: "", title: "", intro: "", body: "" });
  };

  const startEdit = async (slug) => {
    try {
      const r = await api.get(`/pages/${slug}`);
      setEditingSlug(slug);
      setForm({ slug: r.data.slug, title: r.data.title, intro: r.data.intro, body: r.data.body });
    } catch {
      toast.error("Could not load page");
    }
  };

  const savePage = async () => {
    setBusy(true);
    try {
      if (editingSlug) await api.put(`/admin/pages/${editingSlug}`, form);
      else await api.post("/admin/pages", form);
      toast.success(editingSlug ? "Page updated" : "Page created");
      setForm(null);
      refresh();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  const del = async (slug) => {
    if (!window.confirm(`Delete page "${slug}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/pages/${slug}`);
      toast.success("Page deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (form) {
    return (
      <Group title={editingSlug ? `Edit page: ${editingSlug}` : "New page"}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Title</Label>
            <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} data-testid="page-title-input" />
          </div>
          <div>
            <Label>Slug (URL: /p/your-slug)</Label>
            <input className={inputCls} placeholder="about-us" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase() })} data-testid="page-slug-input" />
          </div>
        </div>
        <div>
          <Label>Intro (lead paragraph)</Label>
          <textarea rows={2} className={inputCls} value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
        </div>
        <div>
          <Label>Body (blank line between paragraphs)</Label>
          <textarea rows={8} className={inputCls} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} data-testid="page-body-input" />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={savePage}
            disabled={busy || !form.title.trim() || !form.slug.trim()}
            data-testid="page-save-button"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E1A5E] px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
          >
            <Save size={15} /> {busy ? "Saving…" : "Save page"}
          </button>
          <button
            onClick={() => setForm(null)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600"
          >
            <ArrowLeft size={15} /> Back
          </button>
        </div>
      </Group>
    );
  }

  return (
    <Group title="Custom pages (shown at /p/slug and linked in the footer)">
      {pages.length === 0 ? (
        <p className="text-sm text-slate-500">No custom pages yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {pages.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-semibold text-[#1E1A5E]">{p.title}</p>
                <p className="font-mono text-xs text-slate-400">/p/{p.slug}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/p/${p.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
                >
                  <ExternalLink size={13} /> View
                </Link>
                <button
                  onClick={() => startEdit(p.slug)}
                  data-testid={`page-edit-${p.slug}`}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(p.slug)}
                  data-testid={`page-delete-${p.slug}`}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-500 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="pt-3">
        <button
          onClick={startNew}
          data-testid="page-add-button"
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
        >
          <Plus size={15} /> New page
        </button>
      </div>
    </Group>
  );
}
