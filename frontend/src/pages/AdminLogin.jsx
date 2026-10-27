import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { api, useAuth, formatApiErrorDetail } from "@/lib/AuthContext";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200";

export default function AdminLogin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data);
      navigate("/admin/enquiries");
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="admin-login-page" className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10"
      >
        <img src="/assets/tif-logo.webp" alt="Tif Technologies" className="h-12 w-auto" />
        <h1 className="mt-6 font-display text-2xl font-bold text-[#1E1A5E]">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-500">Access the enquiries inbox.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" data-testid="admin-login-form">
          <label className="block">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Email</span>
            <input
              className={inputCls}
              type="email"
              autoComplete="username"
              placeholder="admin@tiftechnologies.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="admin-email-input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Password</span>
            <input
              className={inputCls}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="admin-password-input"
            />
          </label>

          {error && (
            <p data-testid="admin-login-error" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1E1A5E] px-7 py-3.5 text-sm font-semibold text-white transition hover:shadow-[0_10px_30px_-8px_rgba(30,26,94,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Lock size={15} /> {loading ? "Signing in…" : "Sign in"} <ArrowRight size={15} />
          </button>
        </form>
      </motion.div>
    </main>
  );
}
