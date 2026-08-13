/**
 * Custom hook to load and cache content (connected to ContentContext for live updates)
 */
import { useState, useEffect } from 'react';
import { useContentContext } from '../context/ContentContext';

export const useContent = (contentFile) => {
    const context = useContentContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!context || context.loading) return;

        if (contentFile === 'events' && context.events) {
            setData(context.events);
            setLoading(false);
            return;
        }

        if (contentFile === 'team' && context.team) {
            setData(context.team);
            setLoading(false);
            return;
        }

        if (contentFile === 'site' && context.siteData) {
            setData(context.siteData);
            setLoading(false);
            return;
        }

        if (contentFile === 'activities' && context.activities) {
            setData(context.activities);
            setLoading(false);
            return;
        }

        if (contentFile === 'gallery' && context.gallery) {
            setData(context.gallery);
            setLoading(false);
            return;
        }

        // Fallback fetch if key is not in context
        const loadContent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/content/${contentFile}.json`);

                if (!response.ok) {
                    throw new Error(`Failed to load ${contentFile}`);
                }

                const jsonData = await response.json();
                setData(jsonData);
                setError(null);
            } catch (err) {
                console.error(`Error loading ${contentFile}:`, err);
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [contentFile, context]);

    return { data, loading, error };
};

