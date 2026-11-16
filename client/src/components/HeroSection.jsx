import React, { useState } from 'react';
import { Upload, Compass, CheckCircle2, Sparkles, FileText, Layers, HelpCircle } from 'lucide-react';

export default function HeroSection({ onOpenUpload }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="relative bg-primary-50 overflow-hidden py-16 lg:py-20" data-node-id="1568:3238" data-name="Hero">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Messaging & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-1.5 rounded-full mb-6" data-node-id="1568:3239">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span className="font-extrabold text-[10px] tracking-wider uppercase" data-node-id="1568:3240">
              LESS CRAM. MORE ADVENTURE.
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-[72px] tracking-[-1px] leading-[1.08] text-neutral-900 mb-6" data-node-id="1568:3241">
            Big brain energy.<br />
            <span className="text-primary-600">One small dive.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-normal text-lg sm:text-[19px] leading-[1.45] text-neutral-700 max-w-[560px] mb-8" data-node-id="1568:3242">
            Turn your notes into know-how. Flashcards, quizzes, and a whole ocean of adventure — with a study buddy that’s as curious as you are.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={onOpenUpload}
              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-bold text-[14px] h-[52px] px-7 rounded-[12px] shadow-md shadow-primary-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              data-node-id="1568:3243"
              data-name="Import your notes"
            >
              <Upload className="w-4 h-4" />
              <span>Import your notes</span>
            </button>

            <a
              href="#dive-game"
              className="w-full sm:w-auto bg-white hover:bg-neutral-50 active:scale-[0.98] border border-[#c6d0df] text-[#0a1633] font-bold text-[14px] h-[52px] px-6 rounded-[12px] flex items-center justify-center gap-2 transition-all"
              data-node-id="1568:3244"
              data-name="Explore the Dive game"
            >
              <Compass className="w-4 h-4 text-primary-600" />
              <span>Explore the Dive game</span>
            </a>
          </div>

          {/* Value Micro-Pills */}
          <div className="w-full pt-4 border-t border-primary-200/50">
            <p className="font-bold text-[11px] tracking-wider uppercase text-neutral-600 mb-3" data-node-id="1568:3245">
              YOUR NOTES. YOUR PACE. YOUR NEXT LEVEL.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/90 backdrop-blur px-4 py-2.5 rounded-[12px] border border-white/80 shadow-sm flex items-center gap-2" data-node-id="1568:3246">
                <FileText className="w-4 h-4 text-primary-600" />
                <span className="font-bold text-[12px] text-neutral-700" data-node-id="1568:3247">PDFs & slides</span>
              </div>
              <div className="bg-white/90 backdrop-blur px-4 py-2.5 rounded-[12px] border border-white/80 shadow-sm flex items-center gap-2" data-node-id="1568:3248">
                <Layers className="w-4 h-4 text-primary-600" />
                <span className="font-bold text-[12px] text-neutral-700" data-node-id="1568:3249">Smart flashcards</span>
              </div>
              <div className="bg-white/90 backdrop-blur px-4 py-2.5 rounded-[12px] border border-white/80 shadow-sm flex items-center gap-2" data-node-id="1568:3250">
                <HelpCircle className="w-4 h-4 text-primary-600" />
                <span className="font-bold text-[12px] text-neutral-700" data-node-id="1568:3251">Instant quizzes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Avatar Stage & Interactive Flashcard */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[500px]">
          
          {/* Avatar Stage Circle */}
          <div
            className="w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[500px] lg:h-[500px] rounded-full bg-primary-100/80 absolute transition-all"
            data-node-id="1568:3252"
            data-name="Avatar stage"
          />

          {/* Floating Companion 1: The go-getter (Top Right) */}
          <div
            className="absolute top-2 right-4 sm:right-8 w-32 sm:w-48 h-32 sm:h-48 z-20 pointer-events-none animate-float"
            data-node-id="1568:3253"
            data-name="Pixel study companion"
          >
            <img
              src="/assets/b8cdf.png"
              alt="The go-getter companion"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          {/* Floating Companion 2: The curious one (Top Left) */}
          <div
            className="absolute top-6 left-2 sm:left-6 w-32 sm:w-44 h-32 sm:h-44 z-10 pointer-events-none animate-float-delayed"
            data-node-id="1568:3254"
            data-name="Pixel study companion"
          >
            <img
              src="/assets/0951b.png"
              alt="The curious one companion"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          {/* Floating Companion 3: The page-turner (Bottom Right) */}
          <div
            className="absolute -bottom-4 right-2 sm:right-6 w-36 sm:w-52 h-36 sm:h-52 z-10 pointer-events-none"
            data-node-id="1568:3255"
            data-name="Pixel study companion"
          >
            <img
              src="/assets/a3bf5.png"
              alt="The page-turner companion"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          {/* Interactive Flashcard Preview Card */}
          <div className="relative z-30 transition-transform duration-300 hover:rotate-0 rotate-2 max-w-[410px] w-full" data-node-id="1568:3256">
            <div className="bg-white rounded-[20px] p-6 sm:p-7 shadow-[0px_16px_40px_0px_rgba(20,48,102,0.14)] border border-white" data-name="Flashcards preview">
              
              {/* Card Meta */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-[10px] text-primary-700 tracking-wider uppercase" data-node-id="1568:3257">
                  YOUR NEXT AHA MOMENT
                </span>
                <span className="font-bold text-[12px] text-neutral-600" data-node-id="1568:3259">
                  12 / 16
                </span>
              </div>

              <h3 className="font-extrabold text-[22px] text-neutral-900 mb-3" data-node-id="1568:3258">
                Cell biology
              </h3>

              {/* Progress Bar */}
              <div className="relative w-full h-[6px] bg-primary-100 rounded-full mb-5 overflow-hidden" data-node-id="1568:3260">
                <div className="absolute left-0 top-0 h-full w-3/4 bg-primary-600 rounded-full" data-node-id="1568:3261" />
              </div>

              {/* Question / Answer Face */}
              <div className="bg-primary-50 rounded-[14px] p-5 mb-5 min-h-[140px] flex flex-col justify-center transition-all duration-300" data-node-id="1568:3262">
                {!flipped ? (
                  <>
                    <p className="font-extrabold text-[23px] text-neutral-900 leading-tight mb-2" data-node-id="1568:3263">
                      What powers a cell?
                    </p>
                    <p className="font-normal text-[12px] text-neutral-600" data-node-id="1568:3264">
                      Think it. Flip it. Remember it.
                    </p>
                  </>
                ) : (
                  <div className="animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Answer Verified</span>
                    </div>
                    <p className="font-extrabold text-[20px] text-primary-900 leading-snug">
                      Mitochondria
                    </p>
                    <p className="text-[12px] text-neutral-600 mt-1">
                      Generates ATP through aerobic cellular respiration!
                    </p>
                  </div>
                )}
              </div>

              {/* Reveal Toggle Button */}
              <button
                onClick={() => setFlipped(!flipped)}
                className={`w-full h-[44px] rounded-[10px] font-bold text-[13px] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                  flipped ? 'bg-neutral-800 hover:bg-neutral-900' : 'bg-primary-600 hover:bg-primary-700'
                }`}
                data-node-id="1568:3265"
              >
                <span data-node-id="1568:3266">
                  {flipped ? 'Hide answer' : 'Reveal answer'}
                </span>
              </button>
            </div>

            {/* Encouragement Pill */}
            <div className="mt-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-[14px] shadow-lg border border-primary-100 flex items-center justify-center" data-node-id="1568:3267">
              <span className="font-bold text-[14px] text-primary-800" data-node-id="1568:3268">
                ✨ Small steps. Serious knowledge.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
