import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCw, Inbox } from "lucide-react";
import { toast } from "sonner";
import { api, useAuth } from "@/lib/AuthContext";

export default function AdminEnquiries() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState(null);

  const load = () =>
    api
      .get("/admin/enquiries")
      .then((r) => setItems(r.data))
      .catch(() => setItems([]));

  useEffect(() => {
    load();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // cookie may already be gone
    }
    setUser(false);
    toast.success("Signed out");
    navigate("/admin");
  };

  const fmt = (iso) => {
    try {
      return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return iso;
    }
  };

  return (
    <main data-testid="admin-enquiries-page" className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Admin</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">
            Enquiries{items ? ` (${items.length})` : ""}
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={load}
            data-testid="admin-refresh-button"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/60"
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={logout}
            data-testid="admin-logout-button"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B0E17] transition hover:shadow-[0_0_24px_rgba(56,189,248,0.35)]"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      {items === null ? (
        <p className="mt-16 text-center font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-white/15 py-20 text-center">
          <Inbox size={28} className="text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">No enquiries yet. New website submissions will appear here.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {items.map((e, i) => (
            <article
              key={e.id || i}
              data-testid={`enquiry-card-${i + 1}`}
              className="rounded-2xl border border-white/8 bg-panel p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">{e.name}</h2>
                  <a href={`mailto:${e.email}`} className="font-mono text-xs text-cyan-400 hover:text-cyan-300">
                    {e.email}
                  </a>
                  {e.phone ? <p className="mt-1 font-mono text-xs text-slate-500">{e.phone}</p> : null}
                </div>
                <span className="font-mono text-xs text-slate-500">{fmt(e.created_at)}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.service ? (
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-cyan-300">
                    {e.service}
                  </span>
                ) : null}
                {e.budget ? (
                  <span className="rounded-full border border-white/10 bg-[#0E1424] px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                    {e.budget}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{e.message}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
