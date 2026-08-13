/**
 * Join Page - Google Form Embedded for Member Registration
 */
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Container } from '../components/layout/Container';

const Join = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-[0.04]">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gdgGreen rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gdgBlue rounded-full blur-3xl" />
                </div>

                <Container className="relative z-10">
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <span className="px-4 py-2 bg-gradient-to-r from-gdgGreen to-gdgBlue text-white rounded-full text-sm font-bold shadow-lg">
                                🎉 Become a Member
                            </span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Join GDG CIT
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                            Join our vibrant community of developers, creators, and innovators
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Google Form Embedded */}
            <section className="pb-20">
                <Container>
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Embedded Google Form */}
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSehVBIbPNGW-5YQwcDd4pWvIVx7-i_I-JsEBfDqmyAQnWoXXw/viewform?embedded=true"
                                width="100%"
                                height="1200"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                className="w-full"
                                title="Join GDG CIT - Registration Form"
                            >
                                Loading…
                            </iframe>
                        </div>

                        {/* Alternative Link */}
                        <div className="text-center mt-8">
                            <p className="text-gray-600 mb-4">
                                Having trouble with the form above?
                            </p>
                            <a
                                href="https://docs.google.com/forms/d/1eAviUoX97nlOQmzvBN_T2qYkFVcD8QpDpXoNgW2A1Uc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-gdgBlue to-gdgGreen text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                                Open Form in New Tab
                            </a>
                        </div>
                    </motion.div>
                </Container>
            </section>

            <Footer />
        </div>
    );
};

export default Join;
