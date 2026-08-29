import { createContext, useContext, useState, useEffect } from 'react';
import { getCollectionData, addDocument, setDocument, updateDocument, deleteDocument } from '../../fbconnect/services';

const ContentContext = createContext();

export const useContentContext = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContentContext must be used within a ContentProvider');
    }
    return context;
};

export const ContentProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [team, setTeam] = useState([]);
    const [siteData, setSiteData] = useState(null);
    const [contact, setContact] = useState(null);
    const [activities, setActivities] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial load from localStorage, Firebase, or static content files
    useEffect(() => {
        const loadAllContent = async () => {
            try {
                // 1. Events (From Firebase)
                console.log("➡️ [ContentContext] Attempting to load events from Firebase collection: 'events'...");
                try {
                    const fbEvents = await getCollectionData('events');
                    console.log(`✅ [ContentContext] Successfully loaded ${fbEvents.length} events from Firebase.`);
                    setEvents(fbEvents);
                } catch (error) {
                    console.error("❌ [ContentContext] Error loading events from Firebase:", error);
                    console.warn("⚠️ [ContentContext] Falling back to localStorage/static events.");
                    const localEvents = localStorage.getItem('gdg_events');
                    if (localEvents) {
                        setEvents(JSON.parse(localEvents));
                    } else {
                        const res = await fetch('/content/events.json');
                        const data = await res.json();
                        setEvents(data);
                    }
                }

                // 2. Team
                console.log("➡️ [ContentContext] Attempting to load team from Firebase collection: 'core_members'...");
                try {
                    const fbTeam = await getCollectionData('core_members');
                    console.log(`✅ [ContentContext] Successfully loaded ${fbTeam.length} members from Firebase.`);
                    setTeam(fbTeam);
                } catch (error) {
                    console.error("❌ [ContentContext] Error loading team from Firebase:", error);
                    console.warn("⚠️ [ContentContext] Falling back to localStorage/static team.");
                    const localTeam = localStorage.getItem('gdg_team');
                    if (localTeam) {
                        setTeam(JSON.parse(localTeam));
                    } else {
                        const res = await fetch('/content/team.json');
                        const data = await res.json();
                        setTeam(data);
                    }
                }

                // 3. Site Data (Hero, About, Mission, Vision, Footer)
                const localSite = localStorage.getItem('gdg_site');
                if (localSite) {
                    setSiteData(JSON.parse(localSite));
                } else {
                    const res = await fetch('/content/site.json');
                    const data = await res.json();
                    setSiteData(data);
                }

                // 4. Contact & Socials
                const localContact = localStorage.getItem('gdg_contact');
                if (localContact) {
                    setContact(JSON.parse(localContact));
                } else {
                    const [socialRes, settingsRes] = await Promise.all([
                        fetch('/content/social.json'),
                        fetch('/content/settings.json')
                    ]);
                    const socialData = await socialRes.json();
                    const settingsData = await settingsRes.json();
                    const mergedContact = {
                        email: settingsData.contactEmail || 'gdg@citchennai.net',
                        phone: '+91 98765 43210',
                        address: 'Chennai Institute of Technology, Sarathy Nagar, Kundrathur, Chennai, Tamil Nadu 600069',
                        mapUrl: 'https://maps.google.com/?q=Chennai+Institute+of+Technology',
                        socials: socialData
                    };
                    setContact(mergedContact);
                }

                // 5. Activities
                const localActivities = localStorage.getItem('gdg_activities');
                if (localActivities) {
                    setActivities(JSON.parse(localActivities));
                } else {
                    const res = await fetch('/content/activities.json');
                    const data = await res.json();
                    setActivities(data);
                }

                // 6. Gallery
                console.log("➡️ [ContentContext] Attempting to load gallery from Firebase collection: 'gallery'...");
                try {
                    const fbGallery = await getCollectionData('gallery');
                    console.log(`✅ [ContentContext] Successfully loaded ${fbGallery.length} gallery items from Firebase.`);
                    setGallery(fbGallery);
                } catch (error) {
                    console.error("❌ [ContentContext] Error loading gallery from Firebase:", error);
                    console.warn("⚠️ [ContentContext] Falling back to localStorage/static gallery.");
                    const localGallery = localStorage.getItem('gdg_gallery');
                    if (localGallery) {
                        setGallery(JSON.parse(localGallery));
                    } else {
                        const res = await fetch('/content/gallery.json');
                        const data = await res.json();
                        setGallery(data);
                    }
                }
            } catch (err) {
                console.error('Error loading content in ContentProvider:', err);
            } finally {
                setLoading(false);
            }
        };

        loadAllContent();
    }, []);

    // Helper to sanitize payload and strip undefined values before Firestore write
    const sanitizePayload = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;
        const clean = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] !== undefined) {
                clean[key] = obj[key];
            }
        });
        return clean;
    };

    // Events Operations (Super Admin & Events Team)
    const addEvent = async (newEvent) => {
        console.log("➡️ [ContentContext] addEvent called. Data:", { ...newEvent, image: newEvent.image ? newEvent.image.substring(0, 50) + "..." : null });
        try {
            console.log(`➡️ [ContentContext] Sending addDocument request to 'events' collection...`);
            const cleanedData = sanitizePayload(newEvent);
            const docId = await addDocument('events', cleanedData);
            console.log(`✅ [ContentContext] Event successfully added to Firestore. ID: ${docId}`);
            const addedEvent = { ...cleanedData, id: docId };
            setEvents(prev => [addedEvent, ...prev]);
        } catch (error) {
            console.error("❌ [ContentContext] Error adding event:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for added event.");
            const updated = [newEvent, ...events];
            setEvents(updated);
            localStorage.setItem('gdg_events', JSON.stringify(updated));
        }
    };

    const editEvent = async (id, updatedFields) => {
        console.log(`➡️ [ContentContext] editEvent called for ID: ${id}.`);
        try {
            console.log(`➡️ [ContentContext] Sending updateDocument request to 'events' collection...`);
            const cleanedData = sanitizePayload(updatedFields);
            delete cleanedData.id;
            await updateDocument('events', id, cleanedData);
            console.log(`✅ [ContentContext] Event ${id} successfully updated in Firestore.`);
            setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, ...updatedFields } : ev));
        } catch (error) {
            console.error("❌ [ContentContext] Error updating event:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for updated event.");
            const updated = events.map(ev => ev.id === id ? { ...ev, ...updatedFields } : ev);
            setEvents(updated);
            localStorage.setItem('gdg_events', JSON.stringify(updated));
        }
    };

    const deleteEvent = async (id) => {
        console.log(`➡️ [ContentContext] deleteEvent called for ID: ${id}.`);
        try {
            console.log(`➡️ [ContentContext] Sending deleteDocument request to 'events' collection...`);
            await deleteDocument('events', id);
            console.log(`✅ [ContentContext] Event ${id} successfully deleted from Firestore.`);
            setEvents(prev => prev.filter(ev => ev.id !== id));
        } catch (error) {
            console.error("❌ [ContentContext] Error deleting event:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for deleted event.");
            const updated = events.filter(ev => ev.id !== id);
            setEvents(updated);
            localStorage.setItem('gdg_events', JSON.stringify(updated));
        }
    };

    // Team Operations (Super Admin Exclusive)
    const addTeamMember = async (member) => {
        console.log("➡️ [ContentContext] addTeamMember called. Data:", member);
        try {
            const memberId = member.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            console.log(`➡️ [ContentContext] Sending setDocument request to 'core_members' collection with ID: ${memberId}`);
            await setDocument('core_members', memberId, member);
            console.log(`✅ [ContentContext] Team member successfully added to Firestore.`);
            const addedMember = { ...member, id: memberId };
            setTeam(prev => [...prev, addedMember]);
        } catch (error) {
            console.error("❌ [ContentContext] Error adding team member:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for added team member.");
            const updated = [...team, member];
            setTeam(updated);
            localStorage.setItem('gdg_team', JSON.stringify(updated));
        }
    };

    const editTeamMember = async (id, updatedFields) => {
        console.log(`➡️ [ContentContext] editTeamMember called for ID: ${id}.`);
        try {
            console.log(`➡️ [ContentContext] Sending updateDocument request to 'core_members' collection...`);
            await updateDocument('core_members', id, updatedFields);
            console.log(`✅ [ContentContext] Team member ${id} successfully updated in Firestore.`);
            setTeam(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
        } catch (error) {
            console.error("❌ [ContentContext] Error updating team member:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for updated team member.");
            const updated = team.map(m => m.id === id ? { ...m, ...updatedFields } : m);
            setTeam(updated);
            localStorage.setItem('gdg_team', JSON.stringify(updated));
        }
    };

    const deleteTeamMember = async (id) => {
        console.log(`➡️ [ContentContext] deleteTeamMember called for ID: ${id}.`);
        try {
            console.log(`➡️ [ContentContext] Sending deleteDocument request to 'core_members' collection...`);
            await deleteDocument('core_members', id);
            console.log(`✅ [ContentContext] Team member ${id} successfully deleted from Firestore.`);
            setTeam(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error("❌ [ContentContext] Error deleting team member:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for deleted team member.");
            const updated = team.filter(m => m.id !== id);
            setTeam(updated);
            localStorage.setItem('gdg_team', JSON.stringify(updated));
        }
    };

    // Site Data Operations (Super Admin Exclusive)
    const updateSiteData = (newSiteData) => {
        setSiteData(newSiteData);
        localStorage.setItem('gdg_site', JSON.stringify(newSiteData));
    };

    // Contact Operations (Super Admin Exclusive)
    const updateContact = (newContact) => {
        setContact(newContact);
        localStorage.setItem('gdg_contact', JSON.stringify(newContact));
    };

    // Gallery Operations (Super Admin & Events Team)
    const addGalleryPhoto = async (photoItem) => {
        console.log("➡️ [ContentContext] addGalleryPhoto called. Data:", { ...photoItem, imagesCount: photoItem.images?.length });
        try {
            console.log(`➡️ [ContentContext] Sending addDocument request to 'gallery' collection...`);
            const docId = await addDocument('gallery', photoItem);
            console.log(`✅ [ContentContext] Gallery item successfully added to Firestore. ID: ${docId}`);
            const addedItem = { ...photoItem, id: docId };
            setGallery(prev => [addedItem, ...prev]);
        } catch (error) {
            console.error("❌ [ContentContext] Error adding gallery item:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for added gallery item.");
            const updated = [photoItem, ...gallery];
            setGallery(updated);
            localStorage.setItem('gdg_gallery', JSON.stringify(updated));
        }
    };

    const editGalleryPhoto = async (id, updatedFields) => {
        console.log(`➡️ [ContentContext] editGalleryPhoto called for ID: ${id}.`);
        try {
            console.log(`➡️ [ContentContext] Sending updateDocument request to 'gallery' collection...`);
            await updateDocument('gallery', id, updatedFields);
            console.log(`✅ [ContentContext] Gallery item ${id} successfully updated in Firestore.`);
            setGallery(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
        } catch (error) {
            console.error("❌ [ContentContext] Error updating gallery item:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for updated gallery item.");
            const updated = gallery.map(item => item.id === id ? { ...item, ...updatedFields } : item);
            setGallery(updated);
            localStorage.setItem('gdg_gallery', JSON.stringify(updated));
        }
    };

    const deleteGalleryPhoto = async (id) => {
        console.log(`➡️ [ContentContext] deleteGalleryPhoto called for ID: ${id}.`);
        try {
            console.log(`➡️ [ContentContext] Sending deleteDocument request to 'gallery' collection...`);
            await deleteDocument('gallery', id);
            console.log(`✅ [ContentContext] Gallery item ${id} successfully deleted from Firestore.`);
            setGallery(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("❌ [ContentContext] Error deleting gallery item:", error);
            console.warn("⚠️ [ContentContext] Falling back to localStorage for deleted gallery item.");
            const updated = gallery.filter(item => item.id !== id);
            setGallery(updated);
            localStorage.setItem('gdg_gallery', JSON.stringify(updated));
        }
    };

    // Reset to static JSON defaults
    const resetToDefaults = async () => {
        localStorage.removeItem('gdg_events');
        localStorage.removeItem('gdg_team');
        localStorage.removeItem('gdg_site');
        localStorage.removeItem('gdg_contact');
        localStorage.removeItem('gdg_activities');
        localStorage.removeItem('gdg_gallery');
        window.location.reload();
    };

    const value = {
        events,
        team,
        siteData,
        contact,
        activities,
        gallery,
        loading,
        addEvent,
        editEvent,
        deleteEvent,
        addTeamMember,
        editTeamMember,
        deleteTeamMember,
        updateSiteData,
        updateContact,
        addGalleryPhoto,
        editGalleryPhoto,
        deleteGalleryPhoto,
        resetToDefaults
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};
