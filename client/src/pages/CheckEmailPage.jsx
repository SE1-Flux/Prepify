import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { forgotPassword } from '../services/api';

export default function CheckEmailPage() {
  const location = useLocation();
  const email = location.state?.email || 'alex.lee@email.com';
  const [resending, setResending] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      await forgotPassword({ email });
      setSentNotice(true);
      setTimeout(() => setSentNotice(false), 4000);
    } catch {
      // ignore
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout reverse={true}>
      <div className="w-full">
        <h2 className="text-3xl sm:text-[34px] font-extrabold text-[#0B1528] tracking-tight mb-3">
          Check your email
        </h2>
        
        <p className="text-sm text-[#475569] leading-relaxed mb-4">
          If an account exists for <span className="font-semibold text-[#0F172A]">{email}</span>, you'll receive a link to reset your password.
        </p>

        <p className="text-xs text-[#64748B] leading-relaxed mb-7">
          Can't find the email? Check your spam folder or request a new link below.
        </p>

        {sentNotice && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            Reset link resent to {email}!
          </div>
        )}

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold py-3.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer text-sm disabled:opacity-50"
          >
            {resending && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Resend reset link</span>
          </button>

          <div className="pt-2 text-center">
            <Link
              to="/login"
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
