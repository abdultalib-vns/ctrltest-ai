import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import InteractiveDemo from "@/components/sections/InteractiveDemo";
import IDESetup from "@/components/sections/IDESetup";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Installation from "@/components/sections/Installation";
import ReleaseNotes from "@/components/sections/ReleaseNotes";
import DocsCTA from "@/components/sections/DocsCTA";
import WaitlistModal from "@/components/WaitlistModal";
import DeveloperModal from "@/components/DeveloperModal";
import { WaitlistProvider } from "@/context/WaitlistContext";
import { DeveloperModalProvider } from "@/context/DeveloperModalContext";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <WaitlistProvider>
      <DeveloperModalProvider>
        <LoadingScreen onComplete={handleLoadComplete} />
        {loaded && (
          <motion.div
            className="min-h-screen bg-background text-foreground overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <Hero />
            <SocialProof />
            <Features />
            <HowItWorks />
            <InteractiveDemo />
            <IDESetup />
            <Installation />
            <Pricing />
            <Testimonials />
            <FAQ />
            <FinalCTA />
            <ReleaseNotes />
            <DocsCTA />
            <Footer />
            <WaitlistModal />
            <DeveloperModal />
          </motion.div>
        )}
      </DeveloperModalProvider>
    </WaitlistProvider>
  );
};

export default Index;
