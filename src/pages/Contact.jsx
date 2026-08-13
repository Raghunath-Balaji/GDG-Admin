import { motion } from 'framer-motion';
import { Navbar } from '../components/home/Navbar';
import { Footer } from '../components/layout/Footer';
import { DotBackground } from '../components/home/DotBackground';
import { BackgroundShapes } from '../components/home/BackgroundShapes';
import { ContactForm } from '../components/contact/ContactForm';
import { useSiteContext } from '../core/context/SiteContext';

const GOOGLE_COLORS = ['#4285F4', '#34A853', '#FFD700', '#EA4335'];

const Contact = () => {
    const { socialLinks } = useSiteContext();

    const contactMethods = [
        {
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email Us',
            value: 'gdg@cit.edu.in',
            href: 'mailto:gdg@cit.edu.in',
            color: '#4285F4'
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Visit Us',
            value: 'Chennai Institute of Technology',
            href: 'https://maps.google.com',
            color: '#34A853'
        },
        {
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Working Hours',
            value: 'Mon - Fri, 9 AM - 5 PM',
            color: '#FFD700'
        }
    ];

    const socialPlatforms = [
        { 
            name: 'GitHub', 
            url: socialLinks?.github, 
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, 
            bg: '#000000', text: '#ffffff' 
        },
        { 
            name: 'LinkedIn', 
            url: socialLinks?.linkedin, 
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, 
            bg: '#4285F4', text: '#ffffff' 
        },
        { 
            name: 'Instagram', 
            url: socialLinks?.instagram, 
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, 
            bg: '#EA4335', text: '#ffffff' 
        },
        { 
            name: 'Discord', 
            url: socialLinks?.discord, 
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, 
            bg: '#4285F4', text: '#ffffff' 
        }
    ];

    return (
        <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#fcf9f1' }}>
            <Navbar />
            <DotBackground />
            <BackgroundShapes slow={true} small={true} lessDensity={true} />

            {/* Main Content */}
            <main className="relative z-10 pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
                            Contact Us
                        </h1>
                        
                        <p className="text-xl md:text-2xl font-medium mb-12">
                            Have questions or want to collaborate? We'd love to hear from you!
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={method.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border-[3px] border-black rounded-[32px] p-8 text-center"
                            >
                                <div 
                                    className="w-20 h-20 mx-auto mb-6 rounded-full border-[3px] border-black flex items-center justify-center text-4xl"
                                    style={{ backgroundColor: method.color }}
                                >
                                    {method.icon}
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black">
                                    {method.title}
                                </h3>
                                {method.href ? (
                                    <a
                                        href={method.href}
                                        className="text-lg font-bold text-gray-800 hover:text-[#4285F4] transition-colors"
                                    >
                                        {method.value}
                                    </a>
                                ) : (
                                    <p className="text-lg font-bold text-gray-800">{method.value}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white border-[3px] border-black rounded-[32px] p-8 md:p-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                                    Send us a Message
                                </h2>
                                <ContactForm />
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white border-[3px] border-black rounded-[32px] p-8"
                            >
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                                    Follow Us
                                </h3>
                                <p className="text-gray-800 font-medium mb-8">
                                    Stay connected with our community on social media.
                                </p>
                                <div className="space-y-4">
                                    {socialPlatforms.map((platform) => platform.url && (
                                        <a
                                            key={platform.name}
                                            href={platform.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-xl border-[3px] border-black transition-transform hover:-translate-y-1"
                                            style={{ backgroundColor: platform.bg, color: platform.text }}
                                        >
                                            <span className="text-2xl">{platform.icon}</span>
                                            <span className="font-black uppercase tracking-widest text-sm">
                                                {platform.name}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Quick Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-[#FFD700] border-[3px] border-black rounded-[32px] p-8"
                            >
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black">
                                    💡 Quick Tip
                                </h3>
                                <p className="text-black font-medium leading-relaxed">
                                    Looking to join our community? Fill out the form and mention your areas of interest. We'll get back to you within 24 hours!
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
