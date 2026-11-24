import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({
  reverse = false, // When true, form is on left and promo text is on right (Login, Forgot Password, Check Email, New Password, Password Updated)
  promoHeading = "Turn Your Notes Into\nYour Next Advantage",
  promoBody = "Upload your lessons, generate smart study guides, play interactive quizzes, and prepare with confidence for your next exam.",
  children,
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Figma Top Header Bar */}
      <header className="w-full bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-16 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Prepify Brand Mark / Cloud Icon */}
            <div className="w-9 h-9 rounded-[10px] bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
              </svg>
            </div>
            <span className="font-extrabold text-[22px] tracking-tight text-[#0F172A]">
              Prepify
            </span>
          </Link>
        </div>
      </header>

      {/* Main Split Section */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-8 sm:px-16 py-10 lg:py-16 flex items-center justify-center">
        <div className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
          reverse ? 'lg:grid-flow-dense' : ''
        }`}>
          
          {/* Editorial Display Hero Column */}
          <div className={`lg:col-span-7 ${reverse ? 'lg:col-start-6 lg:pl-8' : 'lg:col-start-1 lg:pr-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#0B1528] leading-[1.08] tracking-[-0.03em] font-serif mb-6 whitespace-pre-line">
              {promoHeading}
            </h1>
            <p className="text-xl sm:text-2xl text-[#1E293B] font-serif leading-[1.35] max-w-[560px]">
              {promoBody}
            </p>
          </div>

          {/* Form Card Column */}
          <div className={`lg:col-span-5 flex ${reverse ? 'lg:col-start-1 lg:justify-start' : 'lg:col-start-8 lg:justify-end'}`}>
            <div className="w-full max-w-[440px]">
              {children}
            </div>
          </div>

        </div>
      </main>

      {/* Figma Bottom Footer */}
      <footer className="w-full bg-white border-t border-[#E2E8F0] py-4">
        <div className="max-w-[1440px] mx-auto px-8 sm:px-16 flex items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-[4px] bg-[#2563EB] flex items-center justify-center text-white">
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
              </svg>
            </div>
            <span className="font-bold text-[#0F172A]">Prepify</span>
          </div>
          <div>
            © 2026 Prepify. Study deeper.
          </div>
        </div>
      </footer>

    </div>
  );
}
