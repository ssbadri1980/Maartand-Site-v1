
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Users, BarChart3, Upload, Rocket, BrainCircuit, Leaf, ArrowRight, X, Twitter, Linkedin, Instagram, Mail, Building, Phone, User, Calendar, CheckCircle, Send } from "lucide-react";

// Figma Dev Mode shim (no-op)
const defineProperties = (_component: any, _schema: any) => {};

export default function App() {
  return <RewardsLandingPage logoSrc="" showTestimonials={false} twitterUrl="" linkedinUrl="" instagramUrl="" />;
}

function RewardsLandingPage({ 
  logoSrc = '', 
  showTestimonials = false,
  twitterUrl = '',
  linkedinUrl = '',
  instagramUrl = ''
}: { logoSrc?: string; showTestimonials?: boolean; twitterUrl?: string; linkedinUrl?: string; instagramUrl?: string; }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localLogo, setLocalLogo] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    twitter: twitterUrl,
    linkedin: linkedinUrl,
    instagram: instagramUrl
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredDate: '',
    message: ''
  });
  
  const contactRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSocialLinks({
      twitter: twitterUrl,
      linkedin: linkedinUrl,
      instagram: instagramUrl
    });
  }, [twitterUrl, linkedinUrl, instagramUrl]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalLogo(url);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Netlify Forms submission (works without backend)
    const formEl = e.target as HTMLFormElement;
    const data = new FormData(formEl);
    data.append("form-name", "contact");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", company: "", phone: "", preferredDate: "", message: "" });
        setFormSubmitted(false);
      }, 5000);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };
  
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden font-sans bg-white text-gray-900">
      {/* Navigation */}
      <nav className="relative z-10 px-4 py-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {(localLogo || logoSrc) ? (
              <ImageWithFallback
                src={localLogo || logoSrc}
                alt="Maartand logo"
                className="w-10 h-10 object-contain mr-2"
              />
            ) : (
              <button
                onClick={() => inputRef.current?.click()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="Upload logo"
              >
                <Upload size={20} className="text-gray-500" />
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </button>
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Maartand
            </span>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-orange-500 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-orange-500 transition-colors">Pricing</a>
            <a href="#roadmap" className="text-gray-700 hover:text-orange-500 transition-colors">Roadmap</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</a>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-orange-500 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-orange-500 transition-colors">Pricing</a>
              <a href="#roadmap" className="text-gray-700 hover:text-orange-500 transition-colors">Roadmap</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Settings Modal (kept per your code, toggle not exposed in UI here) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Connect Social Accounts</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6">
              <SocialField label="Twitter" icon={<Twitter className="w-5 h-5 mr-2 text-blue-400" />} value={socialLinks.twitter} onChange={(v)=>handleSocialLinkChange('twitter', v)} placeholder="https://twitter.com/yourusername" />
              <SocialField label="LinkedIn" icon={<Linkedin className="w-5 h-5 mr-2 text-blue-600" />} value={socialLinks.linkedin} onChange={(v)=>handleSocialLinkChange('linkedin', v)} placeholder="https://linkedin.com/in/yourusername" />
              <SocialField label="Instagram" icon={<Instagram className="w-5 h-5 mr-2 text-pink-500" />} value={socialLinks.instagram} onChange={(v)=>handleSocialLinkChange('instagram', v)} placeholder="https://instagram.com/yourusername" />
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setIsSettingsOpen(false)} className="px-6 py-3 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-16 md:pt-16 md:pb-20 md:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50 opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-yellow-300 opacity-10"></div>
          <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-teal-300 opacity-10"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-orange-300 opacity-10"></div>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              Engage, Reward, Retain
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-gray-700 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              Transform customer interactions into meaningful relationships with our powerful engagement platform.
            </motion.p>
          </div>
          <motion.div className="mt-8 md:mt-12 max-w-4xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Platform dashboard" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xl font-medium">Powerful analytics and engagement tools</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our engagement platform helps businesses create meaningful connections with their customers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard icon={<Award className="w-10 h-10 text-orange-500" />} title="Gamified Rewards" description="Create engaging reward systems that motivate customers to interact with your brand regularly through points, and tiered sweepstake rewards." delay={0} />
            <FeatureCard icon={<Users className="w-10 h-10 text-yellow-500" />} title="Everyday Engagement" description="Build lasting relationships through personalized interactions, challenges, and community features that keep customers coming back." delay={0.2} />
            <FeatureCard icon={<BarChart3 className="w-10 h-10 text-teal-500" />} title="Data-Driven Insights" description="Leverage powerful analytics to understand customer behavior, optimize engagement strategies, and measure ROI effectively." delay={0.4} />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              Transparent Pricing, Lower than Legacy Loyalty Solutions
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            <PricingCard icon={<Award className="w-12 h-12" />} title="Base Pricing" subtitle="Fixed & Transparent" description="Simple revenue-based pricing that scales with your business, with no hidden fees or surprises." color="bg-gradient-to-br from-orange-500 to-yellow-500" delay={0} />
            <PricingCard icon={<Users className="w-12 h-12" />} title="Bespoke Pricing" subtitle="High Volume" description="For enterprises with large customer bases or specialized needs—contact us for a tailored solution." color="bg-gradient-to-br from-purple-500 to-pink-500" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-purple-500 to-teal-500 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              Reimagining loyalty through gamification and engagement
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <RoadmapCard icon={<Rocket className="w-12 h-12" />} phase="Phase 1" title="Pilot Launch" description="Our initial platform rollout focuses on core engagement mechanics, customizable reward structures, and essential analytics." color="bg-gradient-to-br from-orange-500 to-yellow-500" delay={0} />
            <RoadmapCard icon={<BrainCircuit className="w-12 h-12" />} phase="Phase 2" title="AI-Powered Insights" description="Advanced machine learning models to predict customer behavior and personalize engagement strategies at scale." color="bg-gradient-to-br from-purple-500 to-pink-500" delay={0.2} />
            <RoadmapCard icon={<Leaf className="w-12 h-12" />} phase="Phase 3" title="Green Rewards & Sustainability" description="Eco-conscious rewards and sustainability tracking to help brands align customer engagement with environmental values." color="bg-gradient-to-br from-teal-500 to-green-500" delay={0.4} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500"></div>
            <div className="relative z-10 py-12 px-6 md:px-12 lg:px-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Customer Engagement?</h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">Join the growing list of businesses that are creating meaningful connections with their customers.</p>
              <div className="flex justify-center">
                <a href="#contact" onClick={(e)=>{ e.preventDefault(); scrollToContact(); }} className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-medium text-base md:text-lg hover:bg-white/10 transition-colors duration-300">
                  Schedule a Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" ref={contactRef} className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              Schedule Your Demo
            </motion.h2>
            <p className="text-xl text-gray-600">Learn how Maartand can help your business engage and retain customers through our innovative platform.</p>
          </div>

          {formSubmitted ? (
            <motion.div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700 mb-4">Your demo request has been submitted successfully. We'll contact you shortly.</p>
              <p className="text-gray-500 text-sm">A confirmation email has been sent to {formData.email}</p>
            </motion.div>
          ) : (
            <motion.div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-md" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center text-gray-600 mb-2">
                  <Mail className="w-5 h-5 mr-2 text-orange-500" />
                  <span>Your request will be sent to <strong>contact@maartand.ai</strong></span>
                </div>
                <p className="text-gray-600">Fill out the form below to schedule a personalized demo of our engagement platform.</p>
              </div>
              
              <form onSubmit={handleFormSubmit} name="contact" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>Don’t fill this out: <input name="bot-field" onChange={()=>{}} /></label>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField icon={<User className="w-4 h-4 mr-2 text-gray-500" />} label="Your Name*" name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                  <TextField icon={<Mail className="w-4 h-4 mr-2 text-gray-500" />} label="Email Address*" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@company.com" required />
                  <TextField icon={<Building className="w-4 h-4 mr-2 text-gray-500" />} label="Company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="Your Company" />
                  <TextField icon={<Phone className="w-4 h-4 mr-2 text-gray-500" />} label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" />
                  <TextField icon={<Calendar className="w-4 h-4 mr-2 text-gray-500" />} label="Preferred Demo Date" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleInputChange} />
                </div>
                <div className="mt-6">
                  <label className="flex items-start text-gray-700 mb-2">
                    <span className="flex-shrink-0 mt-1"><Send className="w-4 h-4 mr-2 text-gray-500" /></span>
                    <span>Additional Information or Questions</span>
                  </label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Tell us a bit about your current loyalty program or any specific questions you have." className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                </div>
                <div className="mt-8 text-center">
                  <button type="submit" className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center">
                    <Send className="w-5 h-5 mr-2" /> Request Demo
                  </button>
                  <p className="mt-4 text-sm text-gray-500">We'll respond to your request within 24 business hours.</p>
                </div>
              </form>
            </motion.div>
          )}

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>By submitting this form, you agree to our <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a> and <a href="#" className="text-orange-500 hover:underline">Terms of Service</a>.</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">Maartand</div>
              <p className="text-gray-400">Transforming customer engagement through innovative rewards and gamification.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href={socialLinks.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center"><Twitter size={16} className="mr-2" /> Twitter</a></li>
                <li><a href={socialLinks.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center"><Linkedin size={16} className="mr-2" /> LinkedIn</a></li>
                <li><a href={socialLinks.instagram || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center"><Instagram size={16} className="mr-2" /> Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Maartand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Small UI helpers
function SocialField({ label, icon, value, onChange, placeholder }: { label: string; icon: React.ReactNode; value: string; onChange: (v:string)=>void; placeholder: string; }) {
  return (
    <div>
      <label className="flex items-center text-gray-700 mb-2">{icon}{label} Profile URL</label>
      <input type="text" value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
    </div>
  );
}

function TextField({ icon, label, name, type, value, onChange, placeholder, required=false }: any) {
  return (
    <div>
      <label className="flex items-center text-gray-700 mb-2">{icon}{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, delay }: any) {
  return (
    <motion.div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} viewport={{ once: true }}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

// Pricing Card Component
function PricingCard({ icon, title, subtitle, description, color, delay }: any) {
  return (
    <motion.div className="rounded-xl overflow-hidden bg-white shadow-md border border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} viewport={{ once: true }}>
      <div className={`p-5 text-white ${color}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="opacity-90">{icon}</div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{subtitle}</span>
        </div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
      </div>
      <div className="p-5">
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

// Roadmap Card Component
function RoadmapCard({ icon, phase, title, description, color, delay }: any) {
  return (
    <motion.div className="rounded-xl overflow-hidden bg-white shadow-md border border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} viewport={{ once: true }}>
      <div className={`p-5 text-white ${color}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{phase}</span>
          <div className="opacity-90">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
      </div>
      <div className="p-5">
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

// Testimonial Card Component
function TestimonialCard({ quote, author, role, company, delay }: any) {
  return (
    <motion.div className="bg-white rounded-xl p-6 shadow-md border border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} viewport={{ once: true }}>
      <div className="mb-4 text-yellow-500">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-gray-700 mb-4">{quote}</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-gray-500 text-sm">{role}, {company}</p>
      </div>
    </motion.div>
  );
}

function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props
  return didError ? (
    <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Rya2Utd2lkdGg9IjMuNyI+PHJlY3QgeD0iMTYiIHk9IjE2IiB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHJ4PSI2Ii8+PHBhdGggZD0ibTE2IDU4IDE2LTE4IDMyIDMyIi8+PGNpcmNsZSBjeD0iNTMiIGN5PSIzNSIgcj0iNyIvPjwvc3ZnPgoK" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  )
}

// keep no-op to mirror original API
defineProperties(RewardsLandingPage as any, {
  accentColor: { label: "Accent Color", type: "string", control: "select", options: [
    { value: "orange", label: "Orange" },
    { value: "teal", label: "Teal" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
  ], defaultValue: "orange" },
  animationDuration: { label: "Animation Duration", type: "number", control: "slider", min: 0.2, max: 1.5, step: 0.1, defaultValue: 0.6 },
  showTestimonials: { label: "Show Testimonials", type: "boolean", defaultValue: false },
  logoSrc: { label: "Logo URL", type: "string", defaultValue: "" },
  twitterUrl: { label: "Twitter URL", type: "string", defaultValue: "" },
  linkedinUrl: { label: "LinkedIn URL", type: "string", defaultValue: "" },
  instagramUrl: { label: "Instagram URL", type: "string", defaultValue: "" },
});
