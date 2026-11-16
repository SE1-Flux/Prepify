import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BenefitsRibbon from './components/BenefitsRibbon';
import StudyToolkit from './components/StudyToolkit';
import HowItWorks from './components/HowItWorks';
import StudyCrew from './components/StudyCrew';
import DiveGameSection from './components/DiveGameSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import UploadModal from './components/UploadModal';
import StudyViewModal from './components/StudyViewModal';
import AuthModal from './components/AuthModal';
import { checkServerHealth, fetchDemoMaterial } from './services/api';

export default function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Study material modal viewer
  const [activeMaterial, setActiveMaterial] = useState(null);
  const [isStudyViewOpen, setIsStudyViewOpen] = useState(false);

  // Server health status
  const [serverHealth, setServerHealth] = useState(null);

  useEffect(() => {
    checkServerHealth().then(status => {
      setServerHealth(status);
    });
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleMaterialLoaded = (material) => {
    setActiveMaterial(material);
    setIsStudyViewOpen(true);
  };

  const handleOpenDemo = async () => {
    try {
      const res = await fetchDemoMaterial();
      if (res && res.data) {
        handleMaterialLoaded(res.data);
      }
    } catch (e) {
      console.error('Failed to open demo material:', e);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col relative selection:bg-primary-100 selection:text-primary-800" data-node-id="1568:3230" data-name="Prepify — LANDING PAGE">
      
      {/* Optional Server Status Badge for development verification */}
      {serverHealth && serverHealth.status === 'healthy' && (
        <aside aria-label="System status" className="bg-primary-950 text-primary-200 text-[11px] py-1 px-4 text-center font-medium border-b border-primary-900 flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Prepify Full-Stack Active
          </span>
          <span>•</span>
          <span>MongoDB: {serverHealth.mongoConnected ? 'Connected' : 'In-Memory Mode'}</span>
          <span>•</span>
          <span>Gemini AI: {serverHealth.geminiEnabled ? 'Enabled' : 'Default Intelligent Packs'}</span>
        </aside>
      )}

      {/* Main Landing Page Structure from Figma */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onSignOut={() => setCurrentUser(null)}
      />

      <main className="flex-1">
        <HeroSection onOpenUpload={() => setIsUploadOpen(true)} />
        <BenefitsRibbon />
        <StudyToolkit onOpenUpload={() => setIsUploadOpen(true)} onOpenDemo={handleOpenDemo} />
        <HowItWorks />
        <StudyCrew />
        <DiveGameSection onOpenUpload={() => setIsUploadOpen(true)} />
        <FaqSection />
        <CtaSection onOpenUpload={() => setIsUploadOpen(true)} />
      </main>

      <Footer />

      {/* Interactive Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onMaterialLoaded={handleMaterialLoaded}
      />

      <StudyViewModal
        isOpen={isStudyViewOpen}
        onClose={() => setIsStudyViewOpen(false)}
        material={activeMaterial}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
