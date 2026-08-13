import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { BackgroundShapes } from '../components/home/BackgroundShapes';
import { DotBackground } from '../components/home/DotBackground';
import { Navbar } from '../components/home/Navbar';
import { Roadmap } from '../components/home/Roadmap';
import { StatsSection } from '../components/home/StatsSection';
import { FAQSection } from '../components/home/FAQSection';
import { useContent } from '../core/hooks/useContent';

const Home = () => {
    const { data: events } = useContent('events');

    return (
        <div 
            className="min-h-screen w-full relative overflow-hidden"
            style={{ backgroundColor: '#fcf9f1' }}
        >
            <Navbar />
            <DotBackground />
            <BackgroundShapes />
            <main className="min-h-screen relative z-10">
                <Hero />
                <AboutSection />
                <WhatWeDo />
                <Roadmap events={events || []} />
                <StatsSection />
                <FAQSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
