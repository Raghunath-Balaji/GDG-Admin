/**
 * ContactForm Component - Contact form with validation
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // Simulate form submission
            console.log('Form submitted:', formData);
            setSubmitted(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
                setSubmitted(false);
            }, 3000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };


    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-black uppercase tracking-widest text-black mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 bg-[#fcf9f1] border-[3px] rounded-2xl focus:outline-none focus:bg-white transition-colors font-medium ${errors.name ? 'border-[#EA4335]' : 'border-black'
                            }`}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="text-[#EA4335] text-sm font-bold mt-2">{errors.name}</p>
                    )}
                </div>

                {/* Email field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-black uppercase tracking-widest text-black mb-2">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 bg-[#fcf9f1] border-[3px] rounded-2xl focus:outline-none focus:bg-white transition-colors font-medium ${errors.email ? 'border-[#EA4335]' : 'border-black'
                            }`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="text-[#EA4335] text-sm font-bold mt-2">{errors.email}</p>
                    )}
                </div>

                {/* Message field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-black uppercase tracking-widest text-black mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-6 py-4 bg-[#fcf9f1] border-[3px] rounded-2xl focus:outline-none focus:bg-white transition-colors font-medium resize-none ${errors.message ? 'border-[#EA4335]' : 'border-black'
                            }`}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                        <p id="message-error" className="text-[#EA4335] text-sm font-bold mt-2">{errors.message}</p>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-[#34A853] text-white border-[3px] border-black rounded-2xl py-4 font-black uppercase tracking-widest text-lg hover:-translate-y-1 transition-transform"
                >
                    Send Message
                </button>
            </form>

            {/* Success toast */}
            <AnimatePresence>
                {submitted && (
                    <motion.div
                        className="fixed bottom-8 right-8 bg-[#34A853] text-white border-[3px] border-black px-6 py-4 rounded-2xl flex items-center gap-3 z-50 shadow-[4px_4px_0_0_#000]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <span className="text-2xl">✅</span>
                        <span className="font-black uppercase tracking-widest text-sm">Message sent successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
