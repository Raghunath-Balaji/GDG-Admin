/**
 * TeamCard Component - Individual team member card with equal-height layout
 * Supports optional profile images (falls back to initials avatar if none provided)
 */
const GOOGLE_COLORS = ['#4285F4', '#34A853', '#FFD700', '#EA4335'];

export const TeamCard = ({ member, isLead = false, index = 0 }) => {
    const initials = member.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
        
    const color = GOOGLE_COLORS[index % GOOGLE_COLORS.length];

    return (
        <div className="h-full flex flex-col bg-white rounded-3xl border-[3px] border-black p-6 transition-transform hover:-translate-y-2 group relative z-10 overflow-hidden">
            {/* Avatar */}
            <div className="flex justify-center mb-6 relative z-10">
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover object-top border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    />
                ) : (
                    <div 
                        className="w-32 h-32 rounded-full flex items-center justify-center text-black text-3xl font-black border-[3px] border-black"
                        style={{ backgroundColor: color }}
                    >
                        {initials}
                    </div>
                )}
            </div>

            {/* Name + Role */}
            <div className="text-center mb-6 relative z-10">
                <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-3">
                    {member.name}
                </h3>
                <span 
                    className="inline-block px-4 py-1.5 text-xs font-black tracking-widest uppercase rounded-full border-[3px] border-black"
                    style={{ backgroundColor: color, color: color === '#FFD700' ? 'black' : 'white' }}
                >
                    {member.role}
                </span>
            </div>

            {/* Bio */}
            <p className="text-gray-800 text-base font-medium leading-relaxed text-center line-clamp-3 flex-1 relative z-10">
                {member.bio}
            </p>
        </div>
    );
};