import { motion } from 'framer-motion';
import { formatDate } from '../../core/utils/formatDate';
import { CATEGORY_LABELS } from '../../core/utils/constants';

const GOOGLE_COLORS = ['#4285F4', '#34A853', '#FFD700', '#EA4335'];

export const EventCard = ({ event, index = 0 }) => {
    const color = GOOGLE_COLORS[index % GOOGLE_COLORS.length];
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
            className="group relative h-full"
        >
            <div className="h-full bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden transition-transform duration-300 hover:-translate-y-2 z-10">
                <div className="flex justify-between items-start mb-6">
                    <span 
                        className="px-5 py-2 border-[3px] border-black rounded-full font-black uppercase tracking-widest text-sm"
                        style={{ backgroundColor: color, color: color === '#FFD700' ? 'black' : 'white' }}
                    >
                        {CATEGORY_LABELS[event.category] || event.category}
                    </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
                    {event.title}
                </h3>
                
                <div className="space-y-3 mb-6 font-bold text-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center bg-[#fcf9f1]">
                            📅
                        </div>
                        <span>{formatDate(event.date)}{event.time ? ` • ${event.time}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center bg-[#fcf9f1]">
                            📍
                        </div>
                        <span>{event.venue || 'TBA'}</span>
                    </div>
                </div>

                <p className="text-lg font-medium leading-relaxed mb-8 flex-grow border-t-[3px] border-black pt-6">
                    {event.summary}
                </p>

                <div className="flex flex-col gap-3 mt-auto pt-4">
                    {event.registerUrl && (
                        <a 
                            href={event.registerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 bg-[#EA4335] text-white font-black uppercase tracking-widest text-center border-[3px] border-black rounded-full hover:-translate-y-1 hover:bg-[#4285F4] transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <span>Register Now</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    )}
                    {event.resourcesUrl && (
                        <a 
                            href={event.resourcesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 bg-[#FFD700] text-black font-black uppercase tracking-widest text-center border-[3px] border-black rounded-full hover:-translate-y-1 transition-transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Resources
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
