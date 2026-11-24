import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { googleLogin, loginUser } from '../services/api';

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const protectedActionMessage = location.state?.message;
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('your_google')) {
      setError('Google sign-in is not configured yet. Add VITE_GOOGLE_CLIENT_ID and GOOGLE_CLIENT_ID.');
      return;
    }

    let attempts = 0;
    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        if (++attempts < 50) {
          window.setTimeout(renderGoogleButton, 100);
        } else {
          setError('Google sign-in could not load. Check your internet connection and try again.');
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
              if (onLoginSuccess) onLoginSuccess(result.user);
              navigate('/');
            } else {
              setError(result.message || 'Google login failed.');
            }
          } catch (err) {
            setError(err.message || 'Google login failed.');
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
        text: 'continue_with',
        shape: 'rectangular',
        width: 440,
      });
    };

    renderGoogleButton();
  }, [navigate, onLoginSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess(res.user);
        navigate('/');
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout reverse={true}>
      <div className="w-full">
        <h2 className="text-3xl sm:text-[34px] font-extrabold text-[#0B1528] tracking-tight mb-7">
          Welcome Back
        </h2>

        {protectedActionMessage && (
          <div className="mb-5 p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
            {protectedActionMessage}
          </div>
        )}

        {error && (
          <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#475569] font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-[#2563EB] hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold py-3.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-3 text-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Sign in</span>
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
          Google verifies your Gmail account before signing you in.
        </p>

        <div className="mt-6 text-center text-xs text-[#64748B]">
          New to Prepify?{' '}
          <Link to="/register" className="font-semibold text-[#1E293B] hover:text-[#2563EB] transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
