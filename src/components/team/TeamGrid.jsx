/**
 * TeamGrid Component - Grid layout for team members with special lead display
 */
import { motion } from 'framer-motion';
import { TeamCard } from './TeamCard';

export const TeamGrid = ({ members = [] }) => {
    if (!members || members.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No team members found</p>
            </div>
        );
    }

    // Find the lead (GDGoC Organizer)
    const lead = members.find(member =>
        member.role && member.role.toLowerCase().includes('organizer')
    );

    // Get other team members (exclude the organizer)
    const otherMembers = members.filter(member =>
        !member.role || !member.role.toLowerCase().includes('organizer')
    );

    const leadInitials = lead?.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div>
            {/* Lead Member - Horizontal Featured Card */}
            {lead && (
                <motion.div
                    className="relative max-w-3xl mx-auto mb-16 bg-white rounded-3xl border-[3px] border-black p-8 flex flex-col sm:flex-row items-center gap-8 overflow-hidden z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative shrink-0">
                        {lead.image ? (
                            <img
                                src={lead.image}
                                alt={lead.name}
                                className="w-32 h-32 rounded-full object-cover object-top border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-[#EA4335] flex items-center justify-center text-white text-3xl font-black border-[3px] border-black">
                                {leadInitials}
                            </div>
                        )}
                        <span className="absolute -bottom-2 -right-2 bg-[#FFD700] text-black text-xs font-black px-3 py-1.5 rounded-full border-[3px] border-black tracking-widest uppercase">
                            Lead
                        </span>
                    </div>

                    <div className="text-center sm:text-left flex-1">
                        <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-2">{lead.name}</h3>
                        <span className="inline-block mt-2 mb-4 px-4 py-1.5 bg-[#4285F4] text-white text-xs font-black tracking-widest uppercase rounded-full border-[3px] border-black">
                            {lead.role}
                        </span>
                        <p className="text-lg font-medium leading-relaxed">
                            {lead.bio}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Other Team Members - centered, equal-height cards */}
            <div className="flex flex-wrap justify-center gap-8 relative z-10">
                {otherMembers.map((member, index) => (
                    <motion.div
                        key={member.id}
                        className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] max-w-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index % 6) * 0.1 }}
                    >
                        <TeamCard member={member} isLead={false} index={index} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};