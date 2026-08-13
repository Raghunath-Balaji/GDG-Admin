import { motion } from 'framer-motion';
import { Navbar } from '../components/home/Navbar';
import { Footer } from '../components/layout/Footer';
import { DotBackground } from '../components/home/DotBackground';
import { TeamGrid } from '../components/team/TeamGrid';
import { useContent } from '../core/hooks/useContent';

const Team = () => {
    const { data: team, loading } = useContent('team');

    if (loading) {
        return (
            <div className="min-h-screen w-full relative overflow-hidden bg-white">
                <Navbar />
                <DotBackground />
                <main className="min-h-screen pt-40 pb-20 relative z-10 flex items-center justify-center">
                    <h2 className="text-4xl font-black uppercase">Loading Team...</h2>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#fcf9f1' }}>
            <Navbar />
            <DotBackground />

            {/* Main Content */}
            <main className="relative z-10 pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
                            Meet The Team
                        </h1>
                        
                        <p className="text-xl md:text-2xl font-medium mb-12">
                            The passionate people building our vibrant developer community.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="bg-[#34A853] text-white border-[3px] border-black rounded-3xl px-8 py-6 flex-1 min-w-[200px]">
                                <div className="text-5xl font-black mb-2">{team?.length || 0}</div>
                                <div className="font-bold uppercase tracking-widest text-sm">Core Team Members</div>
                            </div>
                            <div className="bg-[#4285F4] text-white border-[3px] border-black rounded-3xl px-8 py-6 flex-1 min-w-[200px]">
                                <div className="text-5xl font-black mb-2">24/7</div>
                                <div className="font-bold uppercase tracking-widest text-sm">Community Support</div>
                            </div>
                            <div className="bg-[#FFD700] text-black border-[3px] border-black rounded-3xl px-8 py-6 flex-1 min-w-[200px]">
                                <div className="text-5xl font-black mb-2">100+</div>
                                <div className="font-bold uppercase tracking-widest text-sm">Events Organized</div>
                            </div>
                        </div>
                    </div>

                    <TeamGrid members={team} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Team;
