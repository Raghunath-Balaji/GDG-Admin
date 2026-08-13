export const EventFilter = ({ selectedCategory, onCategoryChange }) => {
    const categories = [
        { id: 'all', label: 'All Events', color: '#4285F4' }, // Blue
        { id: 'hackathon', label: 'Hackathons', color: '#34A853' }, // Green
        { id: 'android', label: 'Android', color: '#FFD700' }, // Yellow
        { id: 'web', label: 'Web', color: '#EA4335' }, // Red
        { id: 'cloud', label: 'Cloud', color: '#4285F4' }, // Blue
        { id: 'ml', label: 'ML/AI', color: '#34A853' } // Green
    ];

    return (
        <div className="flex flex-wrap gap-4 justify-center mb-16 relative z-10">
            {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                
                return (
                    <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className="px-6 py-3 rounded-full border-[3px] border-black font-black uppercase tracking-widest transition-transform hover:-translate-y-1"
                        style={{
                            backgroundColor: isActive ? cat.color : '#ffffff',
                            color: isActive && cat.color !== '#FFD700' ? '#ffffff' : '#000000'
                        }}
                    >
                        {cat.label}
                    </button>
                );
            })}
        </div>
    );
};
