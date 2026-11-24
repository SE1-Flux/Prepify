import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { googleLogin, registerUser } from '../services/api';

export default function CreateAccountPage({ onRegisterSuccess }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('your_google')) {
      setError('Google sign-up is not configured yet. Add VITE_GOOGLE_CLIENT_ID and GOOGLE_CLIENT_ID.');
      return;
    }

    let attempts = 0;
    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        if (++attempts < 50) {
          window.setTimeout(renderGoogleButton, 100);
        } else {
          setError('Google sign-up could not load. Check your internet connection and try again.');
        }
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            setLoading(true);
            const result = await googleLogin(response.credential);
            if (result.success) {
              if (onRegisterSuccess) onRegisterSuccess(result.user);
              navigate('/');
            } else {
              setError(result.message || 'Google sign-up failed.');
            }
          } catch (err) {
            setError(err.message || 'Google sign-up failed.');
          } finally {
            setLoading(false);
          }
        },
      });

      googleButtonRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signup_with',
        shape: 'rectangular',
        width: 440,
      });
    };

    renderGoogleButton();
  }, [navigate, onRegisterSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters, including a number.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await registerUser({ name: fullName, email, password });
      if (res.success) {
        if (onRegisterSuccess) onRegisterSuccess(res.user);
        navigate('/check-email', { state: { email, name: fullName } });
      } else {
        setError(res.message || 'Failed to create account.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during account creation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout reverse={false}>
      <div className="w-full">
        <h2 className="text-3xl sm:text-[34px] font-extrabold text-[#0B1528] tracking-tight mb-7">
          Welcome to Prepify
        </h2>

        {error && (
          <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.lee@email.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-mono"
              />
            </div>
            <p className="text-[11px] text-[#64748B] mt-1.5">
              Use at least 8 characters, including a number.
            </p>
          </div>

          <p className="text-[11px] text-[#64748B] leading-relaxed pt-1">
            By creating an account, you agree to Prepify's Terms of service and Privacy policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold py-3.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2 text-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Create account</span>
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8F0]"></div>
          </div>
          <div className="relative flex justify-center text-[11px]">
            <span className="bg-[#F8FAFC] px-3 text-[#94A3B8] font-medium">
              or
            </span>
          </div>
        </div>

        {/* Google SSO account chooser */}
        <div ref={googleButtonRef} className="flex w-full justify-center overflow-hidden" />

        <p className="mt-3 text-center text-[11px] text-[#64748B]">
          Google verifies your Gmail account before creating your Prepify session.
        </p>

        <div className="mt-6 text-center text-xs text-[#64748B]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#1E293B] hover:text-[#2563EB] transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
