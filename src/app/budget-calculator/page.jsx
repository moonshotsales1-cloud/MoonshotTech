"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Calculator,
  Send,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Layout,
  Code2,
  ShoppingCart,
  Shield,
  CreditCard,
  FileText,
  Search,
  Plug,
  Languages,
  BarChart3,
  Clock,
  Rocket,
  Timer,
  Sparkles,
  CheckCircle2,
  Loader2,
  Building2,
  ChevronRight,
  ChevronDown,
  Receipt,
  Mail,
  ListChecks,
  Layers,
  Wrench,
  Palette,
  Bot,
  Megaphone,
  Database,
  Server,
  Bell,
  CalendarCheck,
  Users,
  Store,
  Workflow,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const AnimatedCounter = ({ value, prefix = "$" }) => {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const end = value;
    const duration = 700;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prev.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return (
    <>
      {prefix}
      {display.toLocaleString()}
    </>
  );
};

const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      })),
    [],
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D42290]/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const GlowCard = ({ children, isActive, onClick, className = "" }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,34,144,0.3), transparent 60%)`,
        }}
      />
      <div
        className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${isActive ? "border-[#D42290]" : "border-white/10 group-hover:border-white/20"}`}
      />
      <div
        className={`relative z-10 h-full p-5 md:p-6 rounded-2xl transition-colors duration-300 ${isActive ? "bg-[#D42290]/5" : "bg-white/2"}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const APP_TYPES = [
  {
    id: "single-feature",
    label: "Single Feature",
    price: 75,
    desc: "One specific feature or integration.",
    icon: Wrench,
  },
  {
    id: "simple-website",
    label: "Simple Website",
    price: 1000,
    desc: "Basic web presence with essential pages.",
    icon: Layout,
  },
  {
    id: "business-website",
    label: "Business Website",
    price: 2500,
    desc: "Professional web presence with modern design.",
    icon: Building2,
  },
  {
    id: "brand-identity",
    label: "Brand Identity",
    price: 8000,
    desc: "Complete brand design and visual identity.",
    icon: Palette,
  },
  {
    id: "ecommerce",
    label: "E-commerce Store",
    price: 10000,
    desc: "Online store with cart and checkout.",
    icon: ShoppingCart,
  },
  {
    id: "ai-automation",
    label: "AI/Automation",
    price: 12000,
    desc: "Chatbots, AI agents, workflow automation.",
    icon: Bot,
  },
  {
    id: "marketing",
    label: "Marketing Campaign",
    price: 12000,
    desc: "Full-scale digital marketing strategy and execution.",
    icon: Megaphone,
  },
  {
    id: "webapp",
    label: "Web Application",
    price: 15000,
    desc: "Custom SaaS, portals, or internal tools.",
    icon: Code2,
  },
  {
    id: "startup-mvp",
    label: "Startup MVP",
    price: 18000,
    desc: "Minimum viable product for validation.",
    icon: Rocket,
  },
  {
    id: "crm-erp",
    label: "Custom CRM/ERP",
    price: 20000,
    desc: "Business process automation systems.",
    icon: Database,
  },
  {
    id: "mobile",
    label: "Mobile App",
    price: 25000,
    desc: "iOS/Android native or cross-platform.",
    icon: Smartphone,
  },
  {
    id: "enterprise",
    label: "Enterprise Application",
    price: 30000,
    desc: "Large-scale enterprise systems and platforms.",
    icon: Server,
  },
];

const INDUSTRIES = [
  {
    id: "general",
    label: "General Business",
    multiplier: 1.0,
    desc: "",
    color: "text-white/50",
  },
  {
    id: "healthcare",
    label: "Healthcare/HIPAA",
    multiplier: 1.35,
    desc: "Compliance, security",
    color: "text-yellow-400",
  },
  {
    id: "finance",
    label: "Finance/Fintech",
    multiplier: 1.4,
    desc: "Regulatory compliance",
    color: "text-yellow-400",
  },
  {
    id: "ecommerce",
    label: "E-commerce/Retail",
    multiplier: 1.1,
    desc: "Payment integrations",
    color: "text-yellow-400",
  },
  {
    id: "education",
    label: "Education/EdTech",
    multiplier: 1.15,
    desc: "Accessibility and compliance",
    color: "text-yellow-400",
  },
  {
    id: "realestate",
    label: "Real Estate",
    multiplier: 1.1,
    desc: "MLS integrations",
    color: "text-yellow-400",
  },
  {
    id: "legal",
    label: "Legal Services",
    multiplier: 1.2,
    desc: "Document management",
    color: "text-yellow-400",
  },
  {
    id: "nonprofit",
    label: "Nonprofit",
    multiplier: 0.85,
    desc: "15% discount",
    color: "text-emerald-400",
  },
];

const COMPLEXITIES = [
  {
    id: "basic",
    label: "Basic",
    multiplier: 0.8,
    desc: "Template-based, clean design.",
  },
  {
    id: "custom",
    label: "Custom",
    multiplier: 1.0,
    desc: "Tailored UI/UX with unique branding.",
  },
  {
    id: "premium",
    label: "Premium",
    multiplier: 1.3,
    desc: "Rich animations, micro-interactions.",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    multiplier: 1.6,
    desc: "Scalable architecture, complex logic.",
  },
];

const FEATURES = [
  {
    id: "auth",
    label: "User Authentication",
    price: 2000,
    desc: "Login, registration, password recovery, social auth.",
    icon: Shield,
  },
  {
    id: "payments",
    label: "Payment Processing",
    price: 3500,
    desc: "Stripe/PayPal integration, subscriptions, invoicing.",
    icon: CreditCard,
  },
  {
    id: "api",
    label: "API Integrations",
    price: 2500,
    desc: "Connect to CRMs, ERPs, or third-party services.",
    icon: Plug,
  },
  {
    id: "admin",
    label: "Admin Dashboard",
    price: 4500,
    desc: "Manage users, content, orders, and analytics.",
    icon: Layout,
  },
  {
    id: "analytics",
    label: "Advanced Analytics",
    price: 3500,
    desc: "Custom dashboards, reports, and data visualization.",
    icon: BarChart3,
  },
  {
    id: "notifications",
    label: "Email/SMS Notifications",
    price: 1800,
    desc: "Automated emails, SMS alerts, push notifications.",
    icon: Bell,
  },
  {
    id: "search",
    label: "Advanced Search",
    price: 2500,
    desc: "Filters, faceted search, autocomplete, AI search.",
    icon: Search,
  },
  {
    id: "multilingual",
    label: "Multi-language (i18n)",
    price: 3500,
    desc: "Full internationalization and RTL support.",
    icon: Languages,
  },
  {
    id: "chat",
    label: "Live Chat/AI Chatbot",
    price: 3000,
    desc: "Real-time support with AI-powered responses.",
    icon: Bot,
  },
  {
    id: "cms",
    label: "Content Management",
    price: 3000,
    desc: "Easy content editing without developer help.",
    icon: FileText,
  },
  {
    id: "booking",
    label: "Booking/Scheduling",
    price: 3500,
    desc: "Appointment booking with calendar integration.",
    icon: CalendarCheck,
  },
  {
    id: "membership",
    label: "Membership System",
    price: 4000,
    desc: "Gated content, subscription tiers, member portal.",
    icon: Users,
  },
  {
    id: "marketplace",
    label: "Marketplace Features",
    price: 6000,
    desc: "Multi-vendor support, commissions, payouts.",
    icon: Store,
  },
  {
    id: "workflow",
    label: "Workflow Automation",
    price: 4000,
    desc: "Automated processes, triggers, and actions.",
    icon: Workflow,
  },
];

const TIMELINES = [
  {
    id: "relaxed",
    label: "Relaxed",
    multiplier: 0.9,
    desc: "3+ Months",
    subtext: "Best value",
    icon: Clock,
    color: "text-emerald-400",
  },
  {
    id: "standard",
    label: "Standard",
    multiplier: 1.0,
    desc: "1 – 3 Months",
    subtext: "Recommended",
    icon: Timer,
    color: "text-blue-400",
  },
  {
    id: "rush",
    label: "Rush",
    multiplier: 1.3,
    desc: "Under 1 Month",
    subtext: "+30% surcharge",
    icon: Rocket,
    color: "text-amber-400",
  },
];

const STEPS = [
  { title: "Project Type", subtitle: "What are you building?" },
  { title: "Industry", subtitle: "What space are you in?" },
  { title: "Complexity", subtitle: "How custom do you need?" },
  { title: "Features", subtitle: "What custom features do you need?" },
  { title: "Timeline", subtitle: "How fast do you need it?" },
  { title: "Summary", subtitle: "Review your estimate" },
];

// ═══════════════════════════════════════════════════════════════════
// SHARED HOOKS
// ═══════════════════════════════════════════════════════════════════

function useCalculator() {
  const [selections, setSelections] = useState({
    appType: null,
    industry: null,
    complexity: "custom",
    features: [],
    timeline: "standard",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle");

  const toggleFeature = (id) => {
    setSelections((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }));
  };
  const updateSelection = (key, value) =>
    setSelections((prev) => ({ ...prev, [key]: value }));

  const cost = useMemo(() => {
    let base = 0;
    if (selections.appType) {
      const app = APP_TYPES.find((a) => a.id === selections.appType);
      if (app) base += app.price;
    }
    let featuresTotal = 0;
    selections.features.forEach((fid) => {
      const f = FEATURES.find((ft) => ft.id === fid);
      if (f) featuresTotal += f.price;
    });
    base += featuresTotal;
    const complexMod =
      COMPLEXITIES.find((c) => c.id === selections.complexity)?.multiplier || 1;
    const timeMod =
      TIMELINES.find((t) => t.id === selections.timeline)?.multiplier || 1;
    const industryMod =
      INDUSTRIES.find((i) => i.id === selections.industry)?.multiplier || 1;
    const exact = base * complexMod * timeMod * industryMod;
    const min = Math.round((exact * 0.9) / 50) * 50;
    const max = Math.round((exact * 1.1) / 50) * 50;
    return {
      min,
      max,
      exact: Math.round(exact),
      base,
      featuresTotal,
      complexMod,
      timeMod,
    };
  }, [selections]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Please enter a valid email.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildSummaryText = () => {
    const appType = APP_TYPES.find((a) => a.id === selections.appType);
    const industry = INDUSTRIES.find((i) => i.id === selections.industry);
    const complexity = COMPLEXITIES.find((c) => c.id === selections.complexity);
    const timeline = TIMELINES.find((t) => t.id === selections.timeline);
    const selectedFeatures = FEATURES.filter((f) =>
      selections.features.includes(f.id),
    );
    let text = `PROJECT ESTIMATE\n================\n\n`;
    text += `Project Type: ${appType?.label || "N/A"} ($${appType?.price?.toLocaleString() || 0})\n`;
    text += `Industry: ${industry?.label || "N/A"}\n`;
    text += `Complexity: ${complexity?.label || "N/A"} (${complexity?.multiplier || 1}x)\n`;
    text += `Timeline: ${timeline?.label || "N/A"} - ${timeline?.desc || ""}\n\n`;
    if (selectedFeatures.length > 0) {
      text += `Add-on Features:\n`;
      selectedFeatures.forEach((f) => {
        text += `  - ${f.label}: $${f.price.toLocaleString()}\n`;
      });
      text += `\n`;
    }
    text += `ESTIMATED RANGE: $${cost.min.toLocaleString()} - $${cost.max.toLocaleString()}\n\n`;
    text += `From: ${formData.name}\nEmail: ${formData.email}\n`;
    if (formData.company) text += `Company: ${formData.company}\n`;
    if (formData.message) text += `Message: ${formData.message}\n`;
    return text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus("loading");
    const summary = buildSummaryText();
    const subject = encodeURIComponent(
      `Project Estimate: $${cost.min.toLocaleString()} - $${cost.max.toLocaleString()}`,
    );
    const body = encodeURIComponent(summary);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.open(
      `mailto:info@gmail.com?subject=${subject}&body=${body}`,
      "_self",
    );
    setFormStatus("success");
  };

  const reset = () => {
    setFormStatus("idle");
    setSelections({
      appType: null,
      industry: null,
      complexity: "custom",
      features: [],
      timeline: "standard",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
    setFormErrors({});
  };

  return {
    selections,
    formData,
    formErrors,
    formStatus,
    cost,
    toggleFeature,
    updateSelection,
    setFormData,
    handleSubmit,
    reset,
  };
}

// ═══════════════════════════════════════════════════════════════════
// SHARED FORM & SUMMARY
// ═══════════════════════════════════════════════════════════════════

const ContactForm = ({
  formData,
  setFormData,
  formErrors,
  formStatus,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-xs text-white/40 font-sora mb-2 uppercase tracking-wider">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          placeholder="John Doe"
          className={`w-full bg-white/3 border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors ${formErrors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#D42290]"}`}
        />
        {formErrors.name && (
          <p className="text-xs text-red-400 mt-1.5">{formErrors.name}</p>
        )}
      </div>
      <div>
        <label className="block text-xs text-white/40 font-sora mb-2 uppercase tracking-wider">
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((p) => ({ ...p, email: e.target.value }))
          }
          placeholder="john@example.com"
          className={`w-full bg-white/3 border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors ${formErrors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#D42290]"}`}
        />
        {formErrors.email && (
          <p className="text-xs text-red-400 mt-1.5">{formErrors.email}</p>
        )}
      </div>
    </div>
    <div>
      <label className="block text-xs text-white/40 font-sora mb-2 uppercase tracking-wider">
        Company
      </label>
      <input
        type="text"
        value={formData.company}
        onChange={(e) =>
          setFormData((p) => ({ ...p, company: e.target.value }))
        }
        placeholder="Acme Inc."
        className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#D42290] transition-colors"
      />
    </div>
    <div>
      <label className="block text-xs text-white/40 font-sora mb-2 uppercase tracking-wider">
        Project Details
      </label>
      <textarea
        value={formData.message}
        onChange={(e) =>
          setFormData((p) => ({ ...p, message: e.target.value }))
        }
        placeholder="Tell us more about your vision..."
        rows="4"
        className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#D42290] transition-colors resize-none"
      />
    </div>
    <motion.button
      type="submit"
      disabled={formStatus === "loading"}
      className="w-full relative overflow-hidden bg-linear-to-r from-[#D42290] to-[#5227FF] text-white font-sora font-semibold py-4 px-8 rounded-xl hover:shadow-[0_0_40px_rgba(212,34,144,0.3)] transition-shadow disabled:opacity-60"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {formStatus === "loading" ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Sending Estimate...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <Send className="w-5 h-5" />
          Send Estimate & Get Proposal
        </span>
      )}
    </motion.button>
  </form>
);

const CostBreakdown = ({ selections, cost }) => {
  const appType = APP_TYPES.find((a) => a.id === selections.appType);
  const complexity = COMPLEXITIES.find((c) => c.id === selections.complexity);
  const timeline = TIMELINES.find((t) => t.id === selections.timeline);
  const industry = INDUSTRIES.find((i) => i.id === selections.industry);
  const selectedFeatures = FEATURES.filter((f) =>
    selections.features.includes(f.id),
  );
  return (
    <div className="rounded-2xl border border-white/10 bg-white/2 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Receipt className="w-5 h-5 text-[#D42290]" />
        <h4 className="font-sora font-semibold text-white">Cost Breakdown</h4>
      </div>
      <div className="space-y-4">
        {appType && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/60">{appType.label}</span>
            <span className="text-sm font-sora text-white">
              From ${appType.price.toLocaleString()}
            </span>
          </div>
        )}
        {selectedFeatures.length > 0 && (
          <div>
            <div className="text-xs text-white/30 uppercase tracking-wider mb-2 font-sora">
              Add-ons
            </div>
            {selectedFeatures.map((f) => (
              <div
                key={f.id}
                className="flex justify-between items-center py-1"
              >
                <span className="text-sm text-white/50">{f.label}</span>
                <span className="text-sm font-sora text-white/80">
                  +${f.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="border-t border-white/10 pt-3 space-y-2">
          {complexity && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/50">
                {complexity.label} Complexity
              </span>
              <span className="text-sm font-sora text-white/60">
                &times;{complexity.multiplier}
              </span>
            </div>
          )}
          {timeline && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/50">
                {timeline.label} Timeline
              </span>
              <span className="text-sm font-sora text-white/60">
                &times;{timeline.multiplier}
              </span>
            </div>
          )}
          {industry && industry.multiplier !== 1 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/50">{industry.label}</span>
              <span className={`text-sm font-sora ${industry.color}`}>
                &times;{industry.multiplier}
              </span>
            </div>
          )}
        </div>
        <div className="border-t border-[#D42290]/30 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-sora font-semibold text-white">
              Estimated Range
            </span>
            <span className="text-lg font-sora font-bold text-[#D42290]">
              ${cost.min.toLocaleString()} – ${cost.max.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
        {industry && (
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50 font-sora">
            {industry.label}
          </span>
        )}
        {timeline && (
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50 font-sora">
            {timeline.desc}
          </span>
        )}
      </div>
    </div>
  );
};

const SuccessScreen = ({ cost, onReset }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
    >
      <CheckCircle2 className="w-12 h-12 text-emerald-400" />
    </motion.div>
    <h3 className="font-sora text-3xl font-bold text-white mb-4">
      Estimate Sent!
    </h3>
    <p className="text-white/50 max-w-md mx-auto mb-8">
      Your project estimate of{" "}
      <span className="text-[#D42290] font-semibold">
        ${cost.min.toLocaleString()} – ${cost.max.toLocaleString()}
      </span>{" "}
      has been prepared. Check your email client to complete sending.
    </p>
    <button
      onClick={onReset}
      className="px-8 py-3 rounded-full bg-white/10 text-white font-sora font-medium hover:bg-white/20 transition-colors"
    >
      Start New Estimate
    </button>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// MODE 1: MULTI-STEP WIZARD
// ═══════════════════════════════════════════════════════════════════

const StepProgress = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / (totalSteps - 1)) * 100;
  return (
    <div className="relative mb-12 md:mb-16">
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-linear-to-r from-[#D42290] to-[#5227FF]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {STEPS.map((s, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-sora font-semibold border-2 transition-colors duration-300 ${
                  isCompleted
                    ? "bg-[#D42290] border-[#D42290] text-white"
                    : isActive
                      ? "bg-[#D42290]/20 border-[#D42290] text-[#D42290]"
                      : "bg-[#0a1628] border-white/20 text-white/40"
                }`}
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
              </motion.div>
              <span
                className={`mt-3 text-xs font-sora transition-colors duration-300 ${isActive ? "text-[#D42290]" : isCompleted ? "text-white/70" : "text-white/30"}`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/60 font-sora">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-sm text-[#D42290] font-sora font-medium">
            {STEPS[currentStep].title}
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-[#D42290] to-[#5227FF] rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

const MultistepCalculator = ({ calc }) => {
  const {
    selections,
    formData,
    formErrors,
    formStatus,
    cost,
    toggleFeature,
    updateSelection,
    setFormData,
    handleSubmit,
    reset,
  } = calc;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const topRef = useRef(null);
  const totalSteps = STEPS.length;

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((s) => s + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const goPrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return !!selections.appType;
      case 1:
        return !!selections.industry;
      case 2:
        return !!selections.complexity;
      case 3:
        return true;
      case 4:
        return !!selections.timeline;
      case 5:
        return true;
      default:
        return false;
    }
  }, [step, selections]);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {APP_TYPES.map((type) => {
                const isActive = selections.appType === type.id;
                const Icon = type.icon;
                return (
                  <motion.div key={type.id} variants={itemVariants}>
                    <GlowCard
                      isActive={isActive}
                      onClick={() => updateSelection("appType", type.id)}
                    >
                      <h4 className="font-sora font-semibold text-white mb-1">
                        {type.label}
                      </h4>
                      <p className="text-sm text-white/40 mb-3 leading-relaxed">
                        {type.desc}
                      </p>
                      <div
                        className={`text-sm font-sora font-bold transition-colors duration-300 ${isActive ? "text-[#D42290]" : "text-white/60"}`}
                      >
                        From ${type.price.toLocaleString()}
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {INDUSTRIES.map((ind) => {
                const isActive = selections.industry === ind.id;
                return (
                  <motion.div key={ind.id} variants={itemVariants}>
                    <GlowCard
                      isActive={isActive}
                      onClick={() => updateSelection("industry", ind.id)}
                    >
                      <h4 className="font-sora font-semibold text-white mb-1">
                        {ind.label}
                      </h4>
                      {ind.desc ? (
                        <p className={`text-sm font-sora ${ind.color}`}>
                          {ind.multiplier > 1
                            ? `+${Math.round((ind.multiplier - 1) * 100)}%`
                            : ind.multiplier < 1
                              ? `-${Math.round((1 - ind.multiplier) * 100)}%`
                              : ""}{" "}
                          ({ind.desc})
                        </p>
                      ) : (
                        <p className="text-sm text-white/40">Base pricing</p>
                      )}
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {COMPLEXITIES.map((level, idx) => {
                const isActive = selections.complexity === level.id;
                return (
                  <motion.div key={level.id} variants={itemVariants}>
                    <GlowCard
                      isActive={isActive}
                      onClick={() => updateSelection("complexity", level.id)}
                    >
                      <div className="flex flex-col items-center text-center py-3">
                        <div className="flex gap-1.5 mb-4">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-2.5 h-8 rounded-full transition-colors duration-300 ${i <= idx ? (isActive ? "bg-[#D42290]" : "bg-white/30") : "bg-white/10"}`}
                              animate={
                                isActive && i <= idx
                                  ? { scaleY: [1, 1.2, 1] }
                                  : {}
                              }
                              transition={{
                                duration: 1,
                                delay: i * 0.1,
                                repeat: Infinity,
                              }}
                            />
                          ))}
                        </div>
                        <h4
                          className={`font-sora font-bold text-lg mb-1 transition-colors duration-300 ${isActive ? "text-[#D42290]" : "text-white"}`}
                        >
                          {level.label}
                        </h4>
                        <p className="text-xs text-white/40 mb-3">
                          {level.desc}
                        </p>
                        <span
                          className={`text-sm font-sora font-semibold px-3 py-1 rounded-full transition-colors duration-300 ${isActive ? "bg-[#D42290]/20 text-[#D42290]" : "bg-white/5 text-white/40"}`}
                        >
                          {level.multiplier}x multiplier
                        </span>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-white/40 text-sm mb-6 font-sora">
              ({selections.features.length} selected)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FEATURES.map((feature) => {
                const isActive = selections.features.includes(feature.id);
                return (
                  <motion.div key={feature.id} variants={itemVariants}>
                    <GlowCard
                      isActive={isActive}
                      onClick={() => toggleFeature(feature.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-300 mt-0.5 ${isActive ? "border-[#D42290] bg-[#D42290]" : "border-white/20"}`}
                        >
                          {isActive && (
                            <Check className="w-3.5 h-3.5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-sora font-semibold text-white text-sm">
                            {feature.label}
                          </h4>
                          <p className="text-xs text-white/40 mt-0.5">
                            {feature.desc}
                          </p>
                          <span
                            className={`text-sm font-sora font-bold mt-1.5 block transition-colors duration-300 ${isActive ? "text-[#D42290]" : "text-white/50"}`}
                          >
                            +${feature.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TIMELINES.map((time) => {
                const isActive = selections.timeline === time.id;
                const Icon = time.icon;
                return (
                  <motion.div key={time.id} variants={itemVariants}>
                    <GlowCard
                      isActive={isActive}
                      onClick={() => updateSelection("timeline", time.id)}
                      className="h-full"
                    >
                      <div className="flex flex-col items-center text-center py-6">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${isActive ? "bg-[#D42290]/20" : "bg-white/5"}`}
                          animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Icon
                            className={`w-8 h-8 transition-colors duration-300 ${isActive ? "text-[#D42290]" : time.color}`}
                          />
                        </motion.div>
                        <h4
                          className={`font-sora font-bold text-xl mb-1 transition-colors duration-300 ${isActive ? "text-[#D42290]" : "text-white"}`}
                        >
                          {time.label}
                        </h4>
                        <p className="text-sm text-white/60 mb-1">
                          {time.desc}
                        </p>
                        <span className="text-xs text-white/30">
                          {time.subtext}
                        </span>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      case 5:
        if (formStatus === "success")
          return (
            <SuccessScreen
              cost={cost}
              onReset={() => {
                reset();
                setStep(0);
              }}
            />
          );
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <CostBreakdown selections={selections} cost={cost} />
              </div>
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-white/10 bg-white/2 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-[#D42290]" />
                    <h4 className="font-sora font-semibold text-white">
                      Get Your Detailed Proposal
                    </h4>
                  </div>
                  <p className="text-sm text-white/40 mb-8">
                    We&apos;ll send you a detailed breakdown and get back to you
                    within 24 hours.
                  </p>
                  <ContactForm
                    formData={formData}
                    setFormData={setFormData}
                    formErrors={formErrors}
                    formStatus={formStatus}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={topRef}>
      <StepProgress currentStep={step} totalSteps={totalSteps} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-8"
        >
          <h2 className="font-sora text-2xl md:text-3xl font-semibold text-white">
            {STEPS[step].subtitle}
          </h2>
        </motion.div>
      </AnimatePresence>
      <div className="min-h-100">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      {step < 5 && (
        <motion.div
          className="flex items-center justify-between mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={goPrev}
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-sora font-medium text-sm transition-all ${step === 0 ? "text-white/20 cursor-not-allowed" : "text-white/60 hover:text-white bg-white/5 hover:bg-white/10"}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <motion.button
            onClick={goNext}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-sora font-semibold text-sm transition-all ${canProceed ? "bg-linear-to-r from-[#D42290] to-[#5227FF] text-white hover:shadow-[0_0_30px_rgba(212,34,144,0.3)]" : "bg-white/10 text-white/30 cursor-not-allowed"}`}
            whileHover={canProceed ? { scale: 1.03 } : {}}
            whileTap={canProceed ? { scale: 0.97 } : {}}
          >
            {step === 4 ? "View Estimate" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
      {/* Floating Price Bar */}
      <AnimatePresence>
        {selections.appType && step < 5 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div className="bg-[#0a0f1a]/90 backdrop-blur-xl border-t border-white/10">
              <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 text-white/40 text-sm">
                    <Calculator className="w-4 h-4 text-[#D42290]" />
                    <span className="font-sora">Estimated Total</span>
                  </div>
                  <div className="font-sora font-bold text-xl md:text-2xl text-white">
                    <AnimatedCounter value={cost.min} />{" "}
                    <span className="text-[#D42290] mx-1">–</span>{" "}
                    <AnimatedCounter value={cost.max} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selections.features.length > 0 && (
                    <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-[#D42290]/10 text-[#D42290] text-xs font-sora">
                      {selections.features.length} add-on
                      {selections.features.length !== 1 ? "s" : ""}
                    </span>
                  )}
                  <motion.button
                    onClick={() => {
                      setDirection(1);
                      setStep(5);
                      topRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D42290] text-white text-sm font-sora font-semibold hover:bg-[#D42290]/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden md:inline">Get Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MODE 2: ACCORDION CALCULATOR
// ═══════════════════════════════════════════════════════════════════

const AccordionSection = ({ title, step, children, isOpen, onToggle }) => (
  <motion.div
    className="mb-5 rounded-2xl border border-white/10 bg-white/2 overflow-hidden transition-colors hover:border-white/15"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: step * 0.08 }}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 md:p-6 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#D42290]/15 text-[#D42290] font-sora font-semibold text-sm">
          {step}
        </div>
        <h3 className="font-sora text-base md:text-lg text-white font-medium">
          {title}
        </h3>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="px-5 pb-6 md:px-6 md:pb-8 border-t border-white/5 pt-5">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const AccordionCalculator = ({ calc }) => {
  const {
    selections,
    formData,
    formErrors,
    formStatus,
    cost,
    toggleFeature,
    updateSelection,
    setFormData,
    handleSubmit,
    reset,
  } = calc;
  const [openSections, setOpenSections] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggleSection = (n) =>
    setOpenSections((prev) => ({ ...prev, [n]: !prev[n] }));

  if (formStatus === "success")
    return <SuccessScreen cost={cost} onReset={reset} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Sections */}
      <div className="lg:col-span-2">
        {/* App Type */}
        <AccordionSection
          title="What are you building?"
          step={1}
          isOpen={openSections[1]}
          onToggle={() => toggleSection(1)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {APP_TYPES.map((type) => {
              const isActive = selections.appType === type.id;
              const Icon = type.icon;
              return (
                <div
                  key={type.id}
                  onClick={() => updateSelection("appType", type.id)}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${isActive ? "bg-[#D42290]/10 border-[#D42290]" : "bg-white/2 border-white/10 hover:border-white/25"}`}
                >
                  <div className="min-w-0">
                    <span className="font-sora font-medium text-sm text-white">
                      {type.label}
                    </span>
                    <p className="text-xs text-white/40 mt-0.5">{type.desc}</p>
                    <span
                      className={`text-sm font-sora font-bold mt-2 block ${isActive ? "text-[#D42290]" : "text-white/50"}`}
                    >
                      From ${type.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionSection>

        {/* Industry */}
        <AccordionSection
          title="What industry are you in?"
          step={2}
          isOpen={openSections[2]}
          onToggle={() => toggleSection(2)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind) => {
              const isActive = selections.industry === ind.id;
              return (
                <div
                  key={ind.id}
                  onClick={() => updateSelection("industry", ind.id)}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${isActive ? "bg-[#D42290]/10 border-[#D42290]" : "bg-white/2 border-white/10 hover:border-white/25"}`}
                >
                  <span className="font-sora font-medium text-sm text-white block">
                    {ind.label}
                  </span>
                  {ind.desc ? (
                    <span
                      className={`text-xs font-sora mt-1 block ${ind.color}`}
                    >
                      {ind.multiplier > 1
                        ? `+${Math.round((ind.multiplier - 1) * 100)}%`
                        : ind.multiplier < 1
                          ? `-${Math.round((1 - ind.multiplier) * 100)}%`
                          : ""}{" "}
                      ({ind.desc})
                    </span>
                  ) : (
                    <span className="text-xs text-white/40 mt-1 block">
                      Base pricing
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </AccordionSection>

        {/* Complexity */}
        <AccordionSection
          title="How complex is your project?"
          step={3}
          isOpen={openSections[3]}
          onToggle={() => toggleSection(3)}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {COMPLEXITIES.map((level, idx) => {
              const isActive = selections.complexity === level.id;
              return (
                <div
                  key={level.id}
                  onClick={() => updateSelection("complexity", level.id)}
                  className={`p-4 rounded-xl border text-center transition-all duration-300 cursor-pointer ${isActive ? "bg-[#D42290]/10 border-[#D42290]" : "bg-white/2 border-white/10 hover:border-white/25"}`}
                >
                  <div className="flex gap-1 justify-center mb-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-5 rounded-full transition-colors ${i <= idx ? (isActive ? "bg-[#D42290]" : "bg-white/30") : "bg-white/10"}`}
                      />
                    ))}
                  </div>
                  <h4
                    className={`font-sora font-bold text-sm mb-0.5 ${isActive ? "text-[#D42290]" : "text-white"}`}
                  >
                    {level.label}
                  </h4>
                  <p className="text-[11px] text-white/40">{level.desc}</p>
                  <span
                    className={`text-xs font-sora mt-2 inline-block ${isActive ? "text-[#D42290]" : "text-white/30"}`}
                  >
                    {level.multiplier}x
                  </span>
                </div>
              );
            })}
          </div>
        </AccordionSection>

        {/* Features */}
        <AccordionSection
          title="What custom features do you need?"
          step={4}
          isOpen={openSections[4]}
          onToggle={() => toggleSection(4)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((feature) => {
              const isActive = selections.features.includes(feature.id);
              return (
                <div
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-3 ${isActive ? "bg-[#D42290]/10 border-[#D42290]" : "bg-white/2 border-white/10 hover:border-white/25"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all mt-0.5 ${isActive ? "border-[#D42290] bg-[#D42290]" : "border-white/20"}`}
                  >
                    {isActive && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-sora font-medium text-sm text-white">
                      {feature.label}
                    </span>
                    <p className="text-[11px] text-white/40 mt-0.5">
                      {feature.desc}
                    </p>
                    <span
                      className={`text-xs font-sora font-bold mt-1 block ${isActive ? "text-[#D42290]" : "text-white/40"}`}
                    >
                      +${feature.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </AccordionSection>

        {/* Timeline */}
        <AccordionSection
          title="What is your timeline?"
          step={5}
          isOpen={openSections[5]}
          onToggle={() => toggleSection(5)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TIMELINES.map((time) => {
              const isActive = selections.timeline === time.id;
              const Icon = time.icon;
              return (
                <div
                  key={time.id}
                  onClick={() => updateSelection("timeline", time.id)}
                  className={`p-5 rounded-xl border text-center transition-all duration-300 cursor-pointer ${isActive ? "bg-[#D42290]/10 border-[#D42290]" : "bg-white/2 border-white/10 hover:border-white/25"}`}
                >
                  <Icon
                    className={`w-7 h-7 mx-auto mb-3 transition-colors ${isActive ? "text-[#D42290]" : time.color}`}
                  />
                  <h4
                    className={`font-sora font-bold mb-1 ${isActive ? "text-[#D42290]" : "text-white"}`}
                  >
                    {time.label}
                  </h4>
                  <p className="text-xs text-white/50">{time.desc}</p>
                  <span className="text-[11px] text-white/30">
                    {time.subtext}
                  </span>
                </div>
              );
            })}
          </div>
        </AccordionSection>
      </div>

      {/* Right: Sticky Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-32 space-y-6">
          {/* Price display */}
          <motion.div
            className="rounded-2xl border border-[#D42290]/30 bg-linear-to-b from-[#D42290]/5 to-transparent p-6 text-center"
            animate={
              selections.appType
                ? {
                    boxShadow: [
                      "0 0 20px rgba(212,34,144,0.1)",
                      "0 0 40px rgba(212,34,144,0.15)",
                      "0 0 20px rgba(212,34,144,0.1)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-white/40 text-sm font-sora mb-2">
              Estimated Range
            </p>
            {selections.appType ? (
              <div className="text-2xl md:text-3xl font-sora font-bold text-white">
                <AnimatedCounter value={cost.min} />
                <span className="text-[#D42290] mx-1">–</span>
                <AnimatedCounter value={cost.max} />
              </div>
            ) : (
              <p className="text-white/30 text-sm font-sora">
                Select a project type
              </p>
            )}
            <p className="text-white/25 text-xs mt-2">
              *Rough estimate. Final pricing after scoping.
            </p>
          </motion.div>

          {/* Breakdown */}
          <CostBreakdown selections={selections} cost={cost} />

          {/* Form */}
          <div className="rounded-2xl border border-white/10 bg-white/2 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-[#D42290]" />
              <h4 className="font-sora font-semibold text-white text-sm">
                Get Your Proposal
              </h4>
            </div>
            <ContactForm
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              formStatus={formStatus}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// MODE SELECTOR
// ═══════════════════════════════════════════════════════════════════

const ModeSelector = ({ onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="max-w-3xl mx-auto"
  >
    <p className="text-center text-white/50 font-sora text-sm mb-8 uppercase tracking-widest">
      Choose your experience
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Multistep */}
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect("multistep")}
        className="group relative cursor-pointer rounded-2xl border-2 border-white/10 hover:border-[#D42290]/50 bg-[#00050A] hover:bg-[#00050A]/5 p-8 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#D42290]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#D42290]/15 flex items-center justify-center mb-5 group-hover:bg-[#D42290]/25 transition-colors">
            <Layers className="w-7 h-7 text-[#D42290]" />
          </div>
          <h3 className="font-sora font-bold text-xl text-white mb-2">
            Guided Wizard
          </h3>
          <p className="text-sm text-white/40 leading-relaxed mb-5">
            Step-by-step guided experience. Answer one question at a time with
            animated transitions.
          </p>
          <div className="flex items-center gap-2 text-[#D42290] text-sm font-sora font-medium">
            <span>Start Wizard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>

      {/* Accordion */}
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect("accordion")}
        className="group relative cursor-pointer rounded-2xl border-2 border-white/10 hover:border-[#5227FF]/50 bg-[#00050A] hover:bg-[#5227FF]/5 p-8 transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#5227FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#5227FF]/15 flex items-center justify-center mb-5 group-hover:bg-[#5227FF]/25 transition-colors">
            <ListChecks className="w-7 h-7 text-[#5227FF]" />
          </div>
          <h3 className="font-sora font-bold text-xl text-white mb-2">
            All-in-One View
          </h3>
          <p className="text-sm text-white/40 leading-relaxed mb-5">
            See everything at a glance. Expand and collapse sections with
            toggles on a single page.
          </p>
          <div className="flex items-center gap-2 text-[#5227FF] text-sm font-sora font-medium">
            <span>Open Calculator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════

export default function CostCalculator() {
  const [mode, setMode] = useState(null); // null | "multistep" | "accordion"
  const calc = useCalculator();

  return (
    <div
      className="bg-repeat"
      style={{ backgroundImage: 'url("/images/hero-bg.png")' }}
    >
      <Navbar />

      <div className="relative w-full min-h-screen text-white font-poppins overflow-x-clip">
        <FloatingParticles />
        <div className="absolute top-0 left-1/4 w-[60vw] h-[50vh] bg-[#D42290]/10 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[40vw] h-[40vh] bg-[#5227FF]/10 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[30vw] h-[30vh] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div
          className="relative z-10 max-w-9xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-20"
          style={{ mixBlendMode: "screen" }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/3 border border-white/10 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-[#D42290]" />
              <span className="text-sm text-white/60 font-sora">
                Instant Project Estimator
              </span>
            </motion.div>

            <div className="relative">
              <div
                className="absolute inset-0 -top-[20%]"
                style={{ mixBlendMode: "exclusion" }}
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="mt-50 md:mt-100 w-100 h-100 md:w-125 md:h-125 1600:w-150 1600:h-150 rounded-full blur-[180px]"
                    style={{
                      background:
                        "linear-gradient(45deg, rgba(40, 100, 255, 0.60) 15.91%, rgba(250, 40, 137, 0.60) 52.98%, rgba(35, 141, 250, 0.60) 73.58%, rgba(62, 95, 249, 0.60) 107.45%)",
                    }}
                  />
                </div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-1/2 mx-auto h-auto object-contain opacity-90"
                  style={{
                    mixBlendMode: "screen",
                    transform: "rotate(2.075deg) scale(0.85)",
                  }}
                >
                  <source
                    src="/videos/hero/service-video.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* Desktop heading */}
              <div className="hidden md:block space-y-3 text-center">
                <h1
                  className="text-3xl 480:text-4xl md:text-5xl 840:text-6xl lg:text-[clamp(80px,11vw,238px)] italic tracking-[-2px] 1920:tracking-[-7.2px]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Budget
                </h1>
                <h1 className="text-3xl 480:text-4xl md:text-5xl 840:text-6xl lg:text-[clamp(60px,11vw,238px)] font-sora tracking-[-2px] 1920:tracking-[-6.56px]">
                  Calculator
                </h1>
              </div>
            </div>
            <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Build your custom estimate in minutes. Select your options and see
              real-time pricing.
            </p>

            {/* Mode switch button when inside a mode */}
            {mode && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setMode(null);
                  calc.reset();
                }}
                className="relative z-10 mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-sora hover:bg-white/10 hover:text-white/70 transition-all"
              >
                <ArrowLeft className="w-3 h-3" />
                Switch Calculator Mode
              </motion.button>
            )}
          </motion.div>

          {/* Mode Content */}
          <AnimatePresence mode="wait">
            {!mode && (
              <motion.div
                key="selector"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ModeSelector onSelect={setMode} />
              </motion.div>
            )}
            {mode === "multistep" && (
              <motion.div
                key="multistep"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <MultistepCalculator calc={calc} />
              </motion.div>
            )}
            {mode === "accordion" && (
              <motion.div
                key="accordion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <AccordionCalculator calc={calc} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
