import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';

export default function PasswordUpdatedPage() {
  return (
    <AuthLayout reverse={true}>
      <div className="w-full">
        <h2 className="text-3xl sm:text-[34px] font-extrabold text-[#0B1528] tracking-tight mb-2">
          Password updated
        </h2>
        
        <p className="text-sm text-[#64748B] mb-7 leading-relaxed">
          Your password has been reset successfully. Log in with your new password to get back to studying.
        </p>

        <Link
          to="/login"
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-bold py-3.5 rounded-lg shadow-sm flex items-center justify-center transition-all cursor-pointer text-sm text-center"
        >
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}
