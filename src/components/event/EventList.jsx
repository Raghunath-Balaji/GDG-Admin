import { EventCard } from './EventCard';

export const EventList = ({ events, title }) => {
    return (
        <div className="mb-20">
            <div className="flex justify-center mb-12">
                <div className="inline-block bg-[#4285F4] border-[3px] border-black rounded-full px-8 py-3 -rotate-2">
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-widest">
                        {title}
                    </h2>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                    <EventCard key={event.id || index} event={event} index={index} />
                ))}
            </div>
        </div>
    );
};
