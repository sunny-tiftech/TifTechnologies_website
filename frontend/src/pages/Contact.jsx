import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, Mail, ArrowRight } from "lucide-react";
import { submitEnquiry } from "@/lib/api";
import { services } from "@/lib/data";
import { MaskedLines, Reveal } from "@/components/Motion";

const budgets = ["Under ₹1 Lakh", "₹1 Lakh – ₹3 Lakh", "₹3 Lakh – ₹10 Lakh", "₹10 Lakh+"];

const nextSteps = [
  { num: "01", text: "We review your requirements and goals." },
  { num: "02", text: "We schedule a discovery call with you." },
  { num: "03", text: "You get a proposal with scope and timeline." },
];

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200";

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

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Please enter a valid email.";
    if (!form.message.trim()) errs.message = "A few words about your project helps us respond faster.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitEnquiry(form);
      setSent(true);
      toast.success("Enquiry received — we'll get back to you shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSent(false);
    setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  };

  return (
    <main data-testid="contact-page" className="pt-32 md:pt-40">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Contact</p>
        <MaskedLines
          delay={0.1}
          as="h1"
          className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#1E1A5E] sm:text-5xl lg:text-6xl"
          lines={["Let's build your", <>next <span className="text-blue-600">big thing.</span></>]}
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Launching a product, building a platform, integrating AI, or automating workflows — tell us where you want
          to go, and Tif Technologies will help turn your vision into reality.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-[#1E1A5E]">What happens next</h2>
              <ul className="mt-8 space-y-6">
                {nextSteps.map((s) => (
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
                  href="mailto:sales@tiftechnologies.com"
                  data-testid="contact-email-link"
                  className="mt-1.5 inline-block font-medium text-blue-600 hover:text-blue-500"
                >
                  sales@tiftechnologies.com
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
                          <option key={s.num} value={s.title}>
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
                        {budgets.map((b) => (
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
