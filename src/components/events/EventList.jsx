/**
 * EventList Component - Grid layout for events
 */
import { EventCard } from './EventCard';

export const EventList = ({ events, title }) => {
    if (!events || events.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No events found</p>
            </div>
        );
    }

    return (
        <div className="mb-16">
            {title && (
                <h3 className="text-2xl font-heading font-semibold mb-6 text-gray-800">
                    {title}
                </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} mode="compact" />
                ))}
            </div>
        </div>
    );
};
