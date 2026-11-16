import React, { useState } from 'react';
import { Menu, X, BookOpen, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenUpload, onOpenAuth, currentUser, onSignOut }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 transition-all" data-node-id="1568:3231" data-name="Navigation">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18 h-[88px] flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-[25px] text-neutral-900 tracking-tight leading-none" data-node-id="1568:3232">
              Prepify
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <a
            href="#features"
            className="font-semibold text-[14px] text-neutral-700 hover:text-primary-600 transition-colors"
            data-node-id="1568:3233"
          >
            Features
          </a>
          <a
            href="#crew"
            className="font-semibold text-[14px] text-neutral-700 hover:text-primary-600 transition-colors"
            data-node-id="1568:3234"
          >
            Meet the crew
          </a>
          <a
            href="#dive-game"
            className="font-semibold text-[14px] text-neutral-700 hover:text-primary-600 transition-colors"
            data-node-id="1568:3235"
          >
            The Dive game
          </a>
          <a
            href="#faq"
            className="font-semibold text-[14px] text-neutral-700 hover:text-primary-600 transition-colors"
          >
            FAQs
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-neutral-700">
                Hi, <span className="text-primary-600 font-bold">{currentUser.name}</span>
              </span>
              <button
                onClick={onSignOut}
                className="text-xs font-semibold text-neutral-600 hover:text-red-600 px-2 py-1 transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="font-semibold text-[14px] text-neutral-700 hover:text-primary-600 px-3 py-2 transition-colors cursor-pointer"
              data-node-id="1568:3236"
            >
              Log in
            </button>
          )}

          <button
            onClick={onOpenUpload}
            className="bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-bold text-[14px] h-[52px] px-6 rounded-[12px] shadow-sm shadow-primary-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            data-node-id="1568:3237"
            data-name="Start studying"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start studying</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-neutral-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-6 py-5 shadow-xl flex flex-col gap-4">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="font-semibold text-[15px] text-neutral-700 py-2 border-b border-neutral-100"
          >
            Features
          </a>
          <a
            href="#crew"
            onClick={() => setMobileMenuOpen(false)}
            className="font-semibold text-[15px] text-neutral-700 py-2 border-b border-neutral-100"
          >
            Meet the crew
          </a>
          <a
            href="#dive-game"
            onClick={() => setMobileMenuOpen(false)}
            className="font-semibold text-[15px] text-neutral-700 py-2 border-b border-neutral-100"
          >
            The Dive game
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="font-semibold text-[15px] text-neutral-700 py-2 border-b border-neutral-100"
          >
            FAQs
          </a>
          <div className="pt-2 flex flex-col gap-3">
            {currentUser ? (
              <button
                onClick={() => {
                  onSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-semibold text-red-600"
              >
                Log out ({currentUser.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-semibold text-neutral-700"
              >
                Log in
              </button>
            )}
            <button
              onClick={() => {
                onOpenUpload();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-primary-600 text-white font-bold h-[48px] rounded-[12px] flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start studying</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
