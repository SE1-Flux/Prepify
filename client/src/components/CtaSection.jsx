import React from 'react';
import { Upload, Sparkles } from 'lucide-react';

export default function CtaSection({ onOpenUpload }) {
  return (
    <section className="relative bg-primary-50 py-20 lg:py-24 overflow-hidden border-t border-primary-100" data-node-id="1568:3392" data-name="Start your adventure">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18 relative">
        
        {/* Companion Left: The spark */}
        <div
          className="hidden md:block absolute -left-4 lg:left-8 top-1/2 -translate-y-1/2 w-44 lg:w-56 h-44 lg:h-56 pointer-events-none animate-float"
          data-node-id="1568:3393"
        >
          <img
            src="/assets/059cc.png"
            alt="The spark companion"
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>

        {/* Companion Right: The cheer squad */}
        <div
          className="hidden md:block absolute -right-4 lg:right-8 top-1/2 -translate-y-1/2 w-44 lg:w-56 h-44 lg:h-56 pointer-events-none animate-float-delayed"
          data-node-id="1568:3394"
        >
          <img
            src="/assets/907ff.png"
            alt="The cheer squad companion"
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>

        {/* Center Content */}
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center z-10 relative">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-[45px] !leading-[1.2] text-neutral-900 mb-4" data-node-id="1568:3395">
            Your notes have potential.<br />
            <span className="text-primary-600">Let’s unlock it.</span>
          </h2>

          <p className="font-normal text-base sm:text-[16px] text-neutral-600 mb-8 max-w-lg leading-relaxed" data-node-id="1568:3396">
            Bring your material. Meet your crew. Make your next study session an adventure.
          </p>

          <button
            onClick={onOpenUpload}
            className="bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-bold text-[14px] h-[52px] px-8 rounded-[12px] shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer mb-5"
            data-node-id="1568:3397"
            data-name="Import your notes"
          >
            <Upload className="w-4 h-4" />
            <span>Import your notes</span>
          </button>

          <p className="font-bold text-[12px] text-primary-700 uppercase tracking-wider" data-node-id="1568:3398">
            ✨ Less cramming. More curiosity.
          </p>
        </div>

      </div>
    </section>
  );
}
