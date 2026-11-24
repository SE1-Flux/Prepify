import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import CheckEmailPage from './pages/CheckEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NewPasswordPage from './pages/NewPasswordPage';
import PasswordUpdatedPage from './pages/PasswordUpdatedPage';
import OnboardingProfilePage from './pages/OnboardingProfilePage';
import StudyPreferencesPage from './pages/StudyPreferencesPage';
import { checkServerHealth, fetchDemoMaterial } from './services/api';

export default function App() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('prepify_user');
      if (!saved) return null;

      const user = JSON.parse(saved);
      if (
        !user.provider &&
        user.name === 'Alex Lee' &&
        user.email === 'alex.lee@email.com'
      ) {
        const googleUser = { ...user, provider: 'google' };
        localStorage.setItem('prepify_user', JSON.stringify(googleUser));
        return googleUser;
      }
      return user;
    } catch {
      return null;
    }
  });

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

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('prepify_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Storage warning:', e);
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('prepify_user');
    } catch (e) {
      console.warn('Storage warning:', e);
    }
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
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <LandingPage
              serverHealth={serverHealth}
              currentUser={currentUser}
              onSignOut={handleSignOut}
              isUploadOpen={isUploadOpen}
              setIsUploadOpen={setIsUploadOpen}
              isStudyViewOpen={isStudyViewOpen}
              setIsStudyViewOpen={setIsStudyViewOpen}
              activeMaterial={activeMaterial}
              handleMaterialLoaded={handleMaterialLoaded}
              handleOpenDemo={handleOpenDemo}
            />
          }
        />

        {/* Auth Screens converted from Figma */}
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/register"
          element={<CreateAccountPage onRegisterSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/check-email"
          element={<CheckEmailPage />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/new-password"
          element={<NewPasswordPage />}
        />
        <Route
          path="/password-updated"
          element={<PasswordUpdatedPage />}
        />

        {/* Onboarding Screens */}
        <Route
          path="/onboarding"
          element={<OnboardingProfilePage />}
        />
        <Route
          path="/onboarding/preferences"
          element={<StudyPreferencesPage onFinishOnboarding={handleLoginSuccess} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
