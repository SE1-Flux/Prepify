import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { updateProfile } from '../services/api';

export default function OnboardingProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialName = location.state?.name || 'Alex';
  const email = location.state?.email || '';

  const [callName, setCallName] = useState(initialName);
  const [educationLevel, setEducationLevel] = useState('University / college');
  const [fieldOfStudy, setFieldOfStudy] = useState('BS Biology');
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({
        email,
        name: callName,
        educationLevel,
        fieldOfStudy,
      });
    } catch (e) {
      console.warn('Profile update silent fallback:', e);
    } finally {
      setLoading(false);
      navigate('/onboarding/preferences', {
        state: { name: callName, email, educationLevel, fieldOfStudy },
      });
    }
  };

  return (
    <AuthLayout
      taglineTitle={"Small steps.\nA stronger start."}
      taglineSubtitle="A few details help Prepify create a study space that feels right for you."
      badgeText="LET'S MAKE THIS YOURS"
      steps={[
        { num: '01', text: 'Your profile' },
        { num: '02', text: 'Your study preferences' },
        { num: '03', text: 'Your workspace is ready' },
      ]}
      activeStep={1}
      footerMeta="GETTING STARTED / 07"
    >
      <div className="bg-white p-8 sm:p-10 rounded-[24px] border border-neutral-200/80 shadow-sm">
        <div className="mb-2">
          <span className="text-[11px] font-extrabold tracking-wider text-primary-600 uppercase">
            STEP 1 OF 2 / YOUR PROFILE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Nice to meet you, {callName || 'there'}.
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Tell us a little about what you're studying.
          </p>
        </div>

        <form onSubmit={handleContinue} className="space-y-5 mt-7">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              value={callName}
              onChange={(e) => setCallName(e.target.value)}
              placeholder="Alex"
              required
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all placeholder:text-neutral-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              Education level
            </label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all cursor-pointer"
            >
              <option value="High School">High School</option>
              <option value="Senior High School / K-12">Senior High School / K-12</option>
              <option value="University / college">University / college</option>
              <option value="Graduate / Post-graduate">Graduate / Post-graduate</option>
              <option value="Self-directed learner">Self-directed learner</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              Course or field of study
            </label>
            <input
              type="text"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              placeholder="e.g. BS Biology, Computer Science"
              required
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all placeholder:text-neutral-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-sm shadow-primary-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
          >
            <span>Continue</span>
          </button>
        </form>

        <p className="text-xs text-neutral-600 mt-6 text-center">
          You can update these details anytime in Settings.
        </p>
      </div>
    </AuthLayout>
  );
}
