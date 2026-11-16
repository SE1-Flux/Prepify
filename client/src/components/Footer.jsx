import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-10" data-node-id="1568:3399" data-name="Footer">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Slogan */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-6 text-center sm:text-left">
          <span className="font-extrabold text-[24px] text-neutral-900 tracking-tight" data-node-id="1568:3400">
            Prepify
          </span>
          <span className="font-normal text-[13px] text-neutral-600" data-node-id="1568:3401">
            Study deeper. Remember more.
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 font-semibold text-[13px] text-neutral-700" data-node-id="1568:3402">
          <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
          <a href="#crew" className="hover:text-primary-600 transition-colors">The crew</a>
          <a href="#dive-game" className="hover:text-primary-600 transition-colors">Dive game</a>
        </div>

        {/* Copyright */}
        <span className="font-normal text-[11px] text-neutral-600" data-node-id="1568:3403">
          © 2026 Prepify. All rights reserved.
        </span>

      </div>
    </footer>
  );
}
