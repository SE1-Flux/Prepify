import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BenefitsRibbon from '../components/BenefitsRibbon';
import StudyToolkit from '../components/StudyToolkit';
import HowItWorks from '../components/HowItWorks';
import StudyCrew from '../components/StudyCrew';
import DiveGameSection from '../components/DiveGameSection';
import FaqSection from '../components/FaqSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import UploadModal from '../components/UploadModal';
import StudyViewModal from '../components/StudyViewModal';

export default function LandingPage({
  serverHealth,
  currentUser,
  onSignOut,
  isUploadOpen,
  setIsUploadOpen,
  isStudyViewOpen,
  setIsStudyViewOpen,
  activeMaterial,
  handleMaterialLoaded,
  handleOpenDemo,
}) {
  const navigate = useNavigate();

  const openProtectedUploader = () => {
    if (!currentUser) {
      navigate('/login', {
        state: {
          message: 'Please sign in or create an account to use the AI Study Synthesizer.',
        },
      });
      return;
    }

    setIsUploadOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col relative selection:bg-primary-100 selection:text-primary-800" data-node-id="1568:3230" data-name="Prepify — LANDING PAGE">
      
      {/* Development status: hidden when all required services are working */}
      {serverHealth && (
        serverHealth.status !== 'healthy' ||
        !serverHealth.mongoConnected ||
        !serverHealth.geminiEnabled
      ) && (
        <aside
          aria-label="System status"
          className="bg-amber-950 text-amber-100 text-[11px] py-1 px-4 text-center font-medium border-b border-amber-900 flex items-center justify-center gap-3"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Prepify Needs Attention
          </span>
          <span>•</span>
          <span>MongoDB: {serverHealth.mongoConnected ? 'Connected' : 'In-Memory Mode'}</span>
          <span>•</span>
          <span>Gemini AI: {serverHealth.geminiEnabled ? 'Enabled' : 'Default Intelligent Packs'}</span>
        </aside>
      )}

      {/* Main Landing Page Structure from Figma */}
      <Navbar
        onOpenUpload={openProtectedUploader}
        currentUser={currentUser}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <HeroSection onOpenUpload={openProtectedUploader} />
        <BenefitsRibbon />
        <StudyToolkit onOpenUpload={openProtectedUploader} onOpenDemo={handleOpenDemo} />
        <HowItWorks />
        <StudyCrew />
        <DiveGameSection onOpenUpload={openProtectedUploader} />
        <FaqSection />
        <CtaSection onOpenUpload={openProtectedUploader} />
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
    </div>
  );
}
