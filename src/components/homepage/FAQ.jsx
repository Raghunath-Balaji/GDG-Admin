/**
 * FAQ Component - Frequently Asked Questions with accordion
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../layout/Container';
import { useContent } from '../../core/hooks/useContent';

export const FAQ = () => {
    const { data: faqs, loading } = useContent('faq');
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading || !faqs) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <Container>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <span className="px-4 py-2 bg-gradient-to-r from-gdgBlue to-gdgGreen text-white rounded-full text-sm font-bold shadow-lg">
                            ❓ Got Questions?
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about GDG On Campus
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                                {/* Question */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <span className="text-lg font-bold text-gray-900 pr-8">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <svg
                                            className={`w-6 h-6 transition-colors duration-200 ${openIndex === index ? 'text-gdgBlue' : 'text-gray-400'
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </motion.div>
                                </button>

                                {/* Answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 md:px-8 pb-6 pt-2">
                                                <div className="w-12 h-1 bg-gradient-to-r from-gdgBlue to-gdgGreen rounded-full mb-4" />
                                                <p className="text-gray-700 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Still Have Questions CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-gdgBlue to-gdgGreen text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        Contact Us
                    </a>
                </motion.div>
            </Container>
        </section>
    );
};
