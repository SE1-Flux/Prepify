import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { updatePreferences } from '../services/api';

export default function StudyPreferencesPage({ onFinishOnboarding }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, educationLevel, fieldOfStudy } = location.state || {
    name: 'Alex',
    email: 'demo@prepify.edu',
    educationLevel: 'University / college',
    fieldOfStudy: 'BS Biology',
  };

  const [mainGoal, setMainGoal] = useState('Prepare for an upcoming exam');
  const [dailyGoal, setDailyGoal] = useState('20 minutes');
  const [firstSubject, setFirstSubject] = useState('Cell Biology');
  const [loading, setLoading] = useState(false);

  const goalOptions = ['10 minutes', '20 minutes', '30 minutes'];

  const handleFinish = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userObj = {
      name,
      email,
      educationLevel,
      fieldOfStudy,
      studyPreferences: {
        mainGoal,
        dailyGoal,
        firstSubject,
      },
    };

    try {
      await updatePreferences(userObj);
    } catch (err) {
      console.warn('Preferences update silent fallback:', err);
    } finally {
      setLoading(false);
      if (onFinishOnboarding) onFinishOnboarding(userObj);
      navigate('/');
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
      activeStep={2}
      footerMeta="GETTING STARTED / 08"
    >
      <div className="bg-white p-8 sm:p-10 rounded-[24px] border border-neutral-200/80 shadow-sm">
        <div className="mb-2">
          <span className="text-[11px] font-extrabold tracking-wider text-primary-600 uppercase">
            STEP 2 OF 2 / STUDY PREFERENCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Make time for progress.
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Choose a starting point. You can change it later.
          </p>
        </div>

        <form onSubmit={handleFinish} className="space-y-6 mt-7">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              Your main goal
            </label>
            <input
              type="text"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              placeholder="Prepare for an upcoming exam"
              required
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              Daily study goal
            </label>
            <div className="grid grid-cols-3 gap-3">
              {goalOptions.map((opt) => {
                const isSelected = dailyGoal === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setDailyGoal(opt)}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-2xs'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-4 h-4 text-primary-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              First subject
            </label>
            <input
              type="text"
              value={firstSubject}
              onChange={(e) => setFirstSubject(e.target.value)}
              placeholder="Cell Biology"
              required
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-sm shadow-primary-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
          >
            <span>Go to my dashboard</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/onboarding"
            state={{ name, email, educationLevel, fieldOfStudy }}
            className="text-xs font-bold text-neutral-600 hover:text-neutral-900"
          >
            Back to profile
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
