import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { resetPassword } from '../services/api';

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'alex.lee@email.com';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }
    if (password.length < 8) {
      setError('Use at least 8 characters, including a number and a symbol.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await resetPassword({ email, newPassword: password });
      if (res.success) {
        navigate('/password-updated');
      } else {
        setError(res.message || 'Failed to update password.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout reverse={true}>
      <div className="w-full">
        <h2 className="text-3xl sm:text-[34px] font-extrabold text-[#0B1528] tracking-tight mb-2">
          Set a new password
        </h2>
        <p className="text-sm text-[#64748B] mb-7">
          Choose a strong password that you haven't used before to keep your account secure.
        </p>

        {error && (
          <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              New password
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
              Use at least 8 characters, including a number and a symbol.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
              Confirm new password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold py-3.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-3 text-sm"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Reset password</span>
          </button>
        </form>

        <div className="mt-7 text-center">
          <Link
            to="/login"
            className="text-xs font-semibold text-[#2563EB] hover:underline"
          >
            Back to log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
