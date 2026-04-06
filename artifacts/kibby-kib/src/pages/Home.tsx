import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  const services = [
    {
      title: "Residential Property Management",
      description: "Comprehensive management of your residential properties, ensuring tenant satisfaction and optimal property value.",
      icon: <Building2 className="h-8 w-8 text-accent" />
    },
    {
      title: "Tenant Placement",
      description: "Rigorous screening and selection process to find reliable, long-term tenants for your properties.",
      icon: <Users className="h-8 w-8 text-accent" />
    },
    {
      title: "Property Maintenance & Repairs",
      description: "Proactive maintenance and swift repair services to keep your investments in pristine condition.",
      icon: <Wrench className="h-8 w-8 text-accent" />
    },
    {
      title: "Full Move-in/Move-out Coordination",
      description: "Seamless transition management, handling all logistics and inspections between tenancies.",
      icon: <Truck className="h-8 w-8 text-accent" />
    },
    {
      title: "Demolition & Debris Removal",
      description: "Professional demolition services and efficient removal of unwanted debris from your sites.",
      icon: <Trash2 className="h-8 w-8 text-accent" />
    },
    {
      title: "Property Cleanouts",
      description: "Thorough cleaning and preparation of properties for renovation, rental, or sale.",
      icon: <Sparkles className="h-8 w-8 text-accent" />
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-primary">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xl tracking-tighter">KK</span>
            </div>
            <span className={`font-heading font-bold text-xl tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
              Kibby KiB LLC
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('home')} className={`text-sm font-medium transition-colors hover:text-accent ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>Home</button>
            <button onClick={() => scrollTo('services')} className={`text-sm font-medium transition-colors hover:text-accent ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>Services</button>
            <button onClick={() => scrollTo('about')} className={`text-sm font-medium transition-colors hover:text-accent ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>About</button>
            <button onClick={() => scrollTo('contact')} className={`text-sm font-medium transition-colors hover:text-accent ${isScrolled ? 'text-foreground/80' : 'text-white/90'}`}>Contact</button>
            <Button 
              className="bg-accent hover:bg-accent/90 text-primary font-semibold border-0"
              onClick={() => window.location.href = "tel:833-310-4084"}
            >
              Call Now: 833-310-4084
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? "text-primary" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-primary" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4">
            <button onClick={() => scrollTo('home')} className="text-left py-2 text-foreground font-medium border-b border-border">Home</button>
            <button onClick={() => scrollTo('services')} className="text-left py-2 text-foreground font-medium border-b border-border">Services</button>
            <button onClick={() => scrollTo('about')} className="text-left py-2 text-foreground font-medium border-b border-border">About</button>
            <button onClick={() => scrollTo('contact')} className="text-left py-2 text-foreground font-medium border-b border-border">Contact</button>
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold mt-2"
              onClick={() => window.location.href = "tel:833-310-4084"}
            >
              Call Now: 833-310-4084
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Modern residential home exterior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-white tracking-wide">Premier Real Estate Management in Folcroft, PA</span>
            </motion.div>
            
            <motion.variants>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-heading font-bold text-white leading-[1.1] mb-6">
                Maximizing the Value and Condition of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Real Estate Investments.</span>
              </motion.h1>
            </motion.variants>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              From day-to-day operations to market transitions, we offer reliable, hands-on support every step of the way. Your property is our priority.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold text-base h-14 px-8 border-0" onClick={() => scrollTo('services')}>
                Explore Services
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold text-base h-14 px-8" onClick={() => scrollTo('contact')}>
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute -inset-4 bg-secondary rounded-3xl transform -rotate-3 z-0" />
              <img 
                src="/images/about.png" 
                alt="Kibby KiB Real Estate Team" 
                className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover aspect-[4/3]"
              />
              
              <div className="absolute -bottom-8 -right-8 z-20 bg-primary text-white p-8 rounded-2xl shadow-2xl max-w-xs hidden md:block">
                <div className="text-5xl font-heading font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-white/80 font-medium">Years of combined experience in the Pennsylvania real estate market.</div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
                Dedicated to your <br/>property's success.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At Kibby KiB LLC, we understand that real estate is more than just property—it's your investment, your future, and your legacy. Based in Folcroft, PA, we've built our reputation on a foundation of trust, transparency, and relentless dedication to our clients.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Whether you need seamless day-to-day management, expert property repairs, or comprehensive transition support, our hands-on team is here to ensure your portfolio performs at its absolute peak.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">500+</div>
                  <div className="text-sm font-medium text-muted-foreground">Properties Managed</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm font-medium text-muted-foreground">Support Available</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">Comprehensive Services</h2>
            <p className="text-lg text-muted-foreground">
              A full suite of real estate management solutions designed to protect your investment and maximize your returns.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border group hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
                Let's discuss your property needs.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10">
                Ready to elevate your real estate portfolio? Reach out to our team today for a consultation. We're here to answer your questions and build a strategy that works for you.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Office Location</h4>
                    <p className="text-muted-foreground">304 Baltimore Ave<br/>Folcroft, PA 19032</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Phone</h4>
                    <p className="text-muted-foreground">833-310-4084</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Email</h4>
                    <p className="text-muted-foreground">info@Kibbykib.com</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-primary text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="text-2xl font-heading font-bold mb-8 relative z-10">Send us a message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Service Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-accent">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="property-management">Property Management</SelectItem>
                            <SelectItem value="tenant-placement">Tenant Placement</SelectItem>
                            <SelectItem value="maintenance">Maintenance & Repairs</SelectItem>
                            <SelectItem value="cleanouts">Cleanouts & Demolition</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-primary font-bold h-12 text-base border-0">
                    Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
                <span className="text-primary font-heading font-bold text-xl tracking-tighter">KK</span>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">
                Kibby KiB LLC
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-white/70">
              <button onClick={() => scrollTo('home')} className="hover:text-accent transition-colors">Home</button>
              <button onClick={() => scrollTo('services')} className="hover:text-accent transition-colors">Services</button>
              <button onClick={() => scrollTo('about')} className="hover:text-accent transition-colors">About Us</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-accent transition-colors">Contact</button>
            </div>
          </div>
          
          <div className="text-center text-sm text-white/40 pt-8 border-t border-white/10">
            <p>&copy; {new Date().getFullYear()} Kibby KiB LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
