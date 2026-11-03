import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Mail, ArrowRight, RefreshCw } from "lucide-react";
import { submitEnquiry, getCaptcha } from "@/lib/api";
import { useContent } from "@/lib/content";
import { PageHero, Reveal } from "@/components/Motion";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200";

// Captcha answer input: built without inputCls's `w-full` so the width classes never conflict
// (in production builds `.w-full` is emitted after `.w-28` and would override it).
const captchaInputCls =
  "w-full shrink-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 sm:w-28";

function Field({ label, testid, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {children}
      {error && (
        <span data-testid={`${testid}-error`} className="mt-1.5 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

export default function Contact() {
  const { content } = useContent();
  const { contactPage, site, services } = content;

  const [sp] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: sp.get("service") || "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [captcha, setCaptcha] = useState({ captcha_id: "", question: "" });
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const loadCaptcha = useCallback(async () => {
    try {
      const r = await getCaptcha();
      setCaptcha(r.data);
      setCaptchaAnswer("");
    } catch {
      toast.error("Could not load captcha. Please refresh the page.");
    }
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Please enter a valid email.";
    if (!form.message.trim()) errs.message = "A few words about your project helps us respond faster.";
    if (!captchaAnswer.trim()) errs.captcha = "Please solve the captcha.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitEnquiry({ ...form, captcha_id: captcha.captcha_id, captcha_answer: captchaAnswer });
      setSent(true);
      toast.success("Enquiry received — we'll get back to you shortly.");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Something went wrong. Please try again.");
      loadCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSent(false);
    setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    setCaptchaAnswer("");
    loadCaptcha();
  };

  return (
    <main data-testid="contact-page" className="pt-24 md:pt-28">
      <PageHero
        eyebrow={contactPage.eyebrow}
        line1={contactPage.line1}
        line2={contactPage.line2}
        accent={contactPage.accent}
        sub={contactPage.sub}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-[#1E1A5E]">What happens next</h2>
              <ul className="mt-8 space-y-6">
                {contactPage.steps.map((s) => (
                  <li key={s.num} className="flex gap-5">
                    <span className="font-mono text-sm text-blue-600">{s.num}</span>
                    <p className="text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-[#EEF2FF] text-blue-600">
                  <Mail size={18} />
                </span>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Prefer email?</p>
                <a
                  href={`mailto:${site.email}`}
                  data-testid="contact-email-link"
                  className="mt-1.5 inline-block font-medium text-blue-600 hover:text-blue-500"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {sent ? (
              <motion.div
                data-testid="contact-success-card"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
                  <Check size={28} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-bold text-[#1E1A5E]">
                  Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
                  Your enquiry has been received. Our team will review it and get back to you shortly.
                </p>
                <button
                  onClick={reset}
                  data-testid="contact-send-another"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-[#1E1A5E]"
                >
                  Send another enquiry <ArrowRight size={15} />
                </button>
              </motion.div>
            ) : (
              <Reveal delay={0.1}>
                <form
                  onSubmit={onSubmit}
                  noValidate
                  data-testid="contact-form"
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-9"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" testid="contact-name" error={errors.name}>
                      <input
                        className={inputCls}
                        placeholder="Your full name"
                        value={form.name}
                        onChange={set("name")}
                        data-testid="contact-name-input"
                      />
                    </Field>
                    <Field label="Email" testid="contact-email" error={errors.email}>
                      <input
                        className={inputCls}
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={set("email")}
                        data-testid="contact-email-input"
                      />
                    </Field>
                    <Field label="Phone (optional)" testid="contact-phone">
                      <input
                        className={inputCls}
                        placeholder="+91 ..."
                        value={form.phone}
                        onChange={set("phone")}
                        data-testid="contact-phone-input"
                      />
                    </Field>
                    <Field label="Service" testid="contact-service">
                      <select
                        className={`${inputCls} appearance-none`}
                        value={form.service}
                        onChange={set("service")}
                        data-testid="contact-service-select"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.num + s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Budget (optional)" testid="contact-budget">
                      <select
                        className={`${inputCls} appearance-none`}
                        value={form.budget}
                        onChange={set("budget")}
                        data-testid="contact-budget-select"
                      >
                        <option value="">Select a range</option>
                        {contactPage.budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Message" testid="contact-message" error={errors.message}>
                      <textarea
                        rows={5}
                        className={`${inputCls} resize-none`}
                        placeholder="Tell us about your project, goals, and timeline..."
                        value={form.message}
                        onChange={set("message")}
                        data-testid="contact-message-input"
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Verify you're human" testid="contact-captcha" error={errors.captcha}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#F7F8FB] px-4 py-3">
                          <span data-testid="captcha-question" className="whitespace-nowrap font-mono text-sm font-semibold text-[#1E1A5E]">
                            {captcha.question || "Loading..."}
                          </span>
                          <button
                            type="button"
                            onClick={loadCaptcha}
                            data-testid="captcha-refresh"
                            aria-label="New captcha"
                            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-blue-600"
                          >
                            <RefreshCw size={15} />
                          </button>
                        </div>
                        <input
                          className={captchaInputCls}
                          inputMode="numeric"
                          placeholder="Answer"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          data-testid="contact-captcha-input"
                        />
                      </div>
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="contact-form-submit"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1E1A5E] px-7 py-4 text-sm font-semibold text-white transition hover:shadow-[0_10px_30px_-8px_rgba(30,26,94,0.5)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {loading ? "Sending..." : "Send Enquiry"} <ArrowRight size={16} />
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
