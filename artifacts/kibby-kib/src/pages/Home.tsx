import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactForm } from "@/lib/contact";
import {
  Building2,
  Users,
  Wrench,
  Truck,
  Trash2,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  CheckCircle2,
  MessageSquare,
  ClipboardList,
  BarChart3,
  ChevronDown,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const services = [
  {
    title: "Residential Property Management",
    description:
      "Comprehensive day-to-day management of your residential properties, ensuring tenant satisfaction and sustained property value.",
    icon: Building2,
  },
  {
    title: "Tenant Placement",
    description:
      "Rigorous screening and selection to find reliable, long-term tenants who respect your investment.",
    icon: Users,
  },
  {
    title: "Property Maintenance & Repairs",
    description:
      "Proactive upkeep and swift repairs by vetted professionals to keep your property in pristine condition.",
    icon: Wrench,
  },
  {
    title: "Full Move-in / Move-out Coordination",
    description:
      "Seamless transition management handling all logistics, inspections, and documentation between tenancies.",
    icon: Truck,
  },
  {
    title: "Demolition Services & Debris Removal",
    description:
      "Safe, efficient demolition and complete removal of unwanted debris — cleared and ready for the next phase.",
    icon: Trash2,
  },
  {
    title: "Property Cleanouts",
    description:
      "Thorough cleaning and preparation of properties for renovation, listing, or occupancy — done right, on time.",
    icon: Sparkles,
  },
];

const pillars = [
  {
    title: "Reliable & Hands-On",
    description: "We don't just manage from a distance. Our team is on the ground when it matters.",
  },
  {
    title: "Comprehensive Care",
    description: "From tenant screening to demolition, one company handles your entire property lifecycle.",
  },
  {
    title: "Transparent Communication",
    description: "Regular updates, honest assessments, and open lines — no surprises, ever.",
  },
  {
    title: "Maximized Returns",
    description: "Our goal is simple: protect your investment and help it grow. Every decision is made with your ROI in mind.",
  },
];

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description: "We start with a no-obligation call to understand your property goals, current challenges, and how we can add immediate value.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Property Assessment",
    description: "Our team conducts a thorough walkthrough to identify maintenance needs, rental potential, and transition opportunities.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Execution & Management",
    description: "We handle everything — tenants, repairs, cleanouts, and compliance — so you can focus on what matters.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Maximized Returns",
    description: "With full oversight and proactive management, your portfolio performs at its peak — consistently.",
    icon: BarChart3,
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    role: "Property Owner, Philadelphia PA",
    review:
      "Kibby KiB turned a stressful rental property into a truly passive investment. Their tenant screening process is thorough and the communication is unlike anything I've experienced with a management company.",
    rating: 5,
  },
  {
    name: "Denise R.",
    role: "Portfolio Investor, Delaware County",
    review:
      "I hired them for a full property cleanout and move-out coordination after a difficult tenancy. They handled everything professionally and had the unit rent-ready in days. Exceptional service.",
    rating: 5,
  },
  {
    name: "James A.",
    role: "Landlord, Folcroft PA",
    review:
      "What impressed me most was the speed and transparency. Every repair was quoted upfront, completed on time, and the work quality was outstanding. I've already referred two neighbors.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "What areas do you serve?",
    answer:
      "Kibby KiB LLC is headquartered in Folcroft, PA and primarily serves Delaware County, Philadelphia, and surrounding communities throughout southeastern Pennsylvania. Contact us to confirm service availability in your specific area.",
  },
  {
    question: "How do you handle tenant screening?",
    answer:
      "Our screening process includes credit checks, background verification, rental history review, and income verification. We use industry-standard criteria to identify responsible, long-term tenants who will care for your property.",
  },
  {
    question: "Do you handle large demolition projects?",
    answer:
      "Yes. We manage projects of varying scale — from interior demolition for renovations to full structure clearance. All work is performed by licensed professionals and complies with local permitting and safety regulations.",
  },
  {
    question: "What is included in a property cleanout?",
    answer:
      "A full cleanout includes removal of all personal property, furniture, debris, and waste left behind. We haul everything away, clean the space thoroughly, and leave it ready for listing, renovation, or new occupancy.",
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", service: "", message: "" },
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
  try {
    await submitContactForm({
      name: values.name,
      email: values.email,
      serviceneeded: values.service,
      message: values.message,
    });
    toast({
      title: "Message Sent!",
      description: "We'll be in touch as soon as possible.",
    });
    form.reset();
  } catch (err) {
    toast({
      title: "Something went wrong",
      description: "Please try again later.",
      variant: "destructive",
    });
  }
};

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Process", id: "process" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ─── NAVIGATION ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/97 backdrop-blur-md shadow-sm py-3 border-b border-slate-100"
            : "bg-white py-5 border-b border-slate-100"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <button
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <img
              src="/images/favicon.png"
              alt="Kibby KiB LLC"
              className="h-12 w-auto object-contain"
            />
            <span className="font-heading font-bold text-lg text-primary tracking-tight">
              Kibby KiB LLC
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold border-0 shadow-sm px-5"
              onClick={() => scrollTo("contact")}
            >
              Get a Quote
            </Button>
          </nav>

          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-5 flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-3 px-2 text-sm font-medium text-slate-700 hover:text-primary border-b border-slate-100 last:border-0 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold border-0"
                onClick={() => scrollTo("contact")}
              >
                Get a Quote
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO ─── */}
      <section id="home" className="relative pt-20 min-h-[100dvh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Modern residential property"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-200 uppercase tracking-widest">
                Premier Real Estate Management · Folcroft, PA
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-heading font-extrabold text-white leading-[1.08] mb-6 tracking-tight"
            >
              Maximizing the Value and Condition of Your{" "}
              <span className="text-amber-400">Real Estate Investments.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/75 mb-10 leading-relaxed max-w-xl"
            >
              From day-to-day operations to market transitions, we offer reliable,
              hands-on support every step of the way.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold h-13 px-8 border-0 shadow-lg text-base"
                onClick={() => scrollTo("services")}
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold h-13 px-8 text-base"
                onClick={() => scrollTo("contact")}
              >
                Contact Us
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-14 flex gap-10">
              {[
                { value: "500+", label: "Properties Managed" },
                { value: "15+", label: "Years Experience" },
                { value: "24/7", label: "Owner Support" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-heading font-bold text-amber-400">{stat.value}</div>
                  <div className="text-xs text-white/60 font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-slate-100 rounded-3xl -rotate-2 z-0" />
              <img
                src="/images/about.png"
                alt="Kibby KiB LLC team"
                className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 z-20 bg-primary text-white p-6 rounded-2xl shadow-2xl hidden md:block max-w-[200px]">
                <div className="text-4xl font-heading font-bold text-amber-400 mb-1">15+</div>
                <div className="text-xs text-white/70 leading-snug">Years serving Pennsylvania property owners</div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">
                About Kibby KiB LLC
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                Dedicated to your property's long-term success.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-500 text-lg mb-5 leading-relaxed">
                At Kibby KiB LLC, we understand that real estate is more than just property — it's your investment, your future, and your legacy. Based in Folcroft, PA, we've built our reputation on trust, transparency, and relentless dedication to our clients.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-slate-500 text-lg mb-10 leading-relaxed">
                Whether you need seamless day-to-day management, expert property repairs, or comprehensive transition support, our hands-on team ensures your portfolio performs at its absolute peak.
              </motion.p>
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                {[
                  { value: "500+", label: "Properties Managed" },
                  { value: "24/7", label: "Support Available" },
                  { value: "100%", label: "Client Focused" },
                  { value: "6", label: "Core Services" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-heading font-extrabold text-primary mb-1">{s.value}</div>
                    <div className="text-sm text-slate-500">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BANNER ─── */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeInUp} className="text-center text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              Why Choose Us
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-center text-3xl md:text-4xl font-heading font-extrabold text-white mb-14 max-w-2xl mx-auto leading-tight">
              The Kibby KiB Difference
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-white font-heading font-bold text-lg mb-3">{pillar.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
              What We Do
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-5">
              Comprehensive Services
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-lg">
              A full suite of real estate management solutions designed to protect your investment and maximize your returns.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-50 transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-5">
              Our Process
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-lg">
              Working with Kibby KiB LLC is straightforward and stress-free. Here's what to expect.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                      <step.icon className="h-7 w-7 text-amber-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-300 tracking-widest mb-2 uppercase">{step.number}</div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+16px)] w-8 h-px bg-slate-200" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
              Client Reviews
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-5">
              What Property Owners Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-lg">
              Don't take our word for it — hear from the property owners who trust us with their investments.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm mb-8 flex-1">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-primary text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-5">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 text-lg">
              Have questions? We've got answers to the most common inquiries from property owners.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-3xl mx-auto divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white">
                <button
                  className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-heading font-semibold text-primary text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-slate-500 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
                Get In Touch
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-6 leading-tight">
                Let's discuss your property needs.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-500 text-lg mb-10 leading-relaxed">
                Ready to elevate your portfolio? Reach out today for a free consultation. No pressure — just a conversation about your goals.
              </motion.p>

              <motion.div variants={stagger} className="space-y-7">
                {[
                  {
                    icon: MapPin,
                    label: "Office Location",
                    lines: ["304 Baltimore Ave", "Folcroft, PA 19032"],
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    lines: ["833-310-4084"],
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    lines: ["info@Kibbykib.com"],
                  },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-primary mb-1">{item.label}</h4>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-slate-500 text-sm">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100"
            >
              <h3 className="text-2xl font-heading font-extrabold text-primary mb-7">Send us a message</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium text-sm">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium text-sm">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium text-sm">Service Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="property-management">Property Management</SelectItem>
                            <SelectItem value="tenant-placement">Tenant Placement</SelectItem>
                            <SelectItem value="maintenance">Maintenance & Repairs</SelectItem>
                            <SelectItem value="move-coordination">Move-in / Move-out Coordination</SelectItem>
                            <SelectItem value="demolition">Demolition & Debris Removal</SelectItem>
                            <SelectItem value="cleanouts">Property Cleanouts</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium text-sm">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your property and how we can help..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12 text-base border-0 shadow-sm"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-base font-heading">KK</span>
                </div>
                <span className="font-heading font-bold text-xl tracking-tight">Kibby KiB LLC</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                Comprehensive real estate management for Pennsylvania property owners. Reliable, transparent, results-driven.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-500 flex items-center justify-center transition-colors duration-200"
                    aria-label="Social media"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-white/40 mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-white/40 mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  304 Baltimore Ave, Folcroft PA 19032
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                  <a href="tel:8333104084" className="hover:text-amber-400 transition-colors">
                    833-310-4084
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                  <a href="mailto:info@Kibbykib.com" className="hover:text-amber-400 transition-colors">
                    info@Kibbykib.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Kibby KiB LLC. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
