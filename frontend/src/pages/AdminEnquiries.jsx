import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, RefreshCw, Inbox, FileText } from "lucide-react";
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
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Admin</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[#1E1A5E]">
            Enquiries{items ? ` (${items.length})` : ""}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/content"
            data-testid="admin-to-content"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-500"
          >
            <FileText size={15} /> Site Content
          </Link>
          <button
            onClick={load}
            data-testid="admin-refresh-button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-500"
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            onClick={logout}
            data-testid="admin-logout-button"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E1A5E] px-5 py-2.5 text-sm font-semibold text-white transition hover:shadow-[0_10px_30px_-8px_rgba(30,26,94,0.5)]"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      {items === null ? (
        <p className="mt-16 text-center font-mono text-xs uppercase tracking-[0.25em] text-slate-400">Loading…</p>
      ) : items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
          <Inbox size={28} className="text-slate-300" />
          <p className="mt-4 text-sm text-slate-500">No enquiries yet. New website submissions will appear here.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {items.map((e, i) => (
            <article
              key={e.id || i}
              data-testid={`enquiry-card-${i + 1}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-[#1E1A5E]">{e.name}</h2>
                  <a href={`mailto:${e.email}`} className="font-mono text-xs text-blue-600 hover:text-blue-500">
                    {e.email}
                  </a>
                  {e.phone ? <p className="mt-1 font-mono text-xs text-slate-400">{e.phone}</p> : null}
                </div>
                <span className="font-mono text-xs text-slate-400">{fmt(e.created_at)}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.service ? (
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-blue-700">
                    {e.service}
                  </span>
                ) : null}
                {e.budget ? (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-500">
                    {e.budget}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{e.message}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
