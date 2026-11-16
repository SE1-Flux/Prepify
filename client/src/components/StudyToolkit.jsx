import React, { useState } from 'react';
import { Upload, Layers, HelpCircle, FileCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function StudyToolkit({ onOpenUpload, onOpenDemo }) {
  const [flippedCard, setFlippedCard] = useState(false);
  const [quizSelected, setQuizSelected] = useState(true);

  return (
    <section id="features" className="py-20 lg:py-24 bg-white" data-node-id="1568:3276" data-name="Study toolkit">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-extrabold text-[11px] text-primary-700 tracking-wider uppercase mb-3" data-node-id="1568:3277">
            YOUR ALL-IN-ONE STUDY SIDEKICK
          </p>
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-[44px] !leading-[1.2] text-neutral-900 mb-4" data-node-id="1568:3278">
            Less busywork. More “I get it.”
          </h2>
          <p className="font-normal text-base sm:text-[17px] text-neutral-600 leading-relaxed" data-node-id="1568:3279">
            Everything you need to go from a pile of notes to a head full of knowledge.
          </p>
        </div>

        {/* 3 Toolkit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Import Materials */}
          <div className="bg-primary-50 rounded-[22px] p-7 sm:p-8 flex flex-col justify-between border border-primary-100 shadow-sm hover:shadow-md transition-shadow" data-node-id="1568:3280" data-name="Import materials">
            <div>
              <span className="font-extrabold text-[11px] text-primary-700 tracking-wider uppercase block mb-4" data-node-id="1568:3281">
                01 / IMPORT
              </span>
              <h3 className="font-extrabold text-[25px] leading-snug text-neutral-900 mb-3" data-node-id="1568:3282">
                Bring the notes.<br />We’ll bring the clarity.
              </h3>
              <p className="font-normal text-[14px] text-neutral-600 leading-relaxed mb-6" data-node-id="1568:3283">
                Upload PDFs, slides, or lecture notes. Turn the important stuff into a study set.
              </p>
            </div>

            {/* Document Preview Card */}
            <div className="bg-white rounded-[14px] p-5 shadow-sm border border-neutral-200/70" data-node-id="1568:3284">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[11px] text-neutral-600 tracking-wider uppercase flex items-center gap-1.5" data-node-id="1568:3285">
                  <FileCheck className="w-3.5 h-3.5 text-primary-600" />
                  BIOLOGY_LECTURE_04.PDF
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Indexed</span>
              </div>
              <div className="h-px bg-neutral-200 my-2.5" data-node-id="1568:3286" />
              <p className="font-bold text-[17px] text-neutral-900 mb-2" data-node-id="1568:3287">
                Cell structures & functions
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[12px] text-primary-700" data-node-id="1568:3288">
                  Ready for your next study session
                </span>
                <button
                  onClick={onOpenUpload}
                  className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Upload</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Smart Flashcards */}
          <div className="bg-neutral-50 rounded-[22px] p-7 sm:p-8 flex flex-col justify-between border border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow" data-node-id="1568:3289" data-name="Smart flashcards">
            <div>
              <span className="font-extrabold text-[11px] text-primary-700 tracking-wider uppercase block mb-4" data-node-id="1568:3290">
                02 / FLASHCARDS
              </span>
              <h3 className="font-extrabold text-[25px] leading-snug text-neutral-900 mb-3" data-node-id="1568:3291">
                Make it stick.<br />One card at a time.
              </h3>
              <p className="font-normal text-[14px] text-neutral-600 leading-relaxed mb-6" data-node-id="1568:3292">
                Smart flashcards bring back the topics you’re about to forget.
              </p>
            </div>

            {/* Stacked Flashcard Preview */}
            <div className="relative pt-4">
              {/* Stack shadow layer */}
              <div className="absolute inset-x-2 -top-1 h-full bg-primary-100 rounded-[14px] -rotate-3 transition-transform" data-name="Flashcard stack" />
              
              <div
                onClick={() => setFlippedCard(!flippedCard)}
                className="relative bg-white rounded-[14px] p-5 shadow-md border border-neutral-200/80 cursor-pointer hover:border-primary-300 transition-all"
                data-node-id="1568:3294"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[10px] text-primary-700 tracking-wider uppercase" data-node-id="1568:3295">
                    QUICK RECALL
                  </span>
                  <span className="text-[10px] text-neutral-500 font-semibold">Click to flip</span>
                </div>
                
                {!flippedCard ? (
                  <>
                    <p className="font-bold text-[19px] text-neutral-900 mb-2 leading-tight" data-node-id="1568:3296">
                      What is active recall?
                    </p>
                    <p className="font-normal text-[12px] text-neutral-600" data-node-id="1568:3297">
                      Think first. Flip second.
                    </p>
                  </>
                ) : (
                  <div className="animate-in fade-in duration-150">
                    <p className="font-bold text-[15px] text-primary-900 mb-1 leading-snug">
                      Testing yourself to retrieve knowledge from memory.
                    </p>
                    <p className="text-[11px] text-neutral-600">
                      Creates strong neural pathways compared to re-reading.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Quiz Practice */}
          <div className="bg-primary-50 rounded-[22px] p-7 sm:p-8 flex flex-col justify-between border border-primary-100 shadow-sm hover:shadow-md transition-shadow" data-node-id="1568:3298" data-name="Quiz practice">
            <div>
              <span className="font-extrabold text-[11px] text-primary-700 tracking-wider uppercase block mb-4" data-node-id="1568:3299">
                03 / QUIZZES
              </span>
              <h3 className="font-extrabold text-[25px] leading-snug text-neutral-900 mb-3" data-node-id="1568:3300">
                Find your gaps.<br />Then close them.
              </h3>
              <p className="font-normal text-[14px] text-neutral-600 leading-relaxed mb-6" data-node-id="1568:3301">
                Test yourself with auto-built quizzes and get feedback while it’s fresh.
              </p>
            </div>

            {/* Quiz Question Preview Card */}
            <div className="bg-white rounded-[14px] p-5 shadow-sm border border-neutral-200/70" data-node-id="1568:3302">
              <p className="font-bold text-[15px] text-neutral-900 mb-3" data-node-id="1568:3303">
                Which organelle produces ATP?
              </p>
              
              <div
                onClick={() => setQuizSelected(!quizSelected)}
                className={`h-[36px] rounded-[8px] px-3 flex items-center mb-2.5 transition-colors cursor-pointer ${
                  quizSelected ? 'bg-primary-100 border border-primary-200' : 'bg-neutral-100'
                }`}
                data-node-id="1568:3304"
              >
                <span className="font-bold text-[12px] text-primary-800" data-node-id="1568:3305">
                  A &nbsp;&nbsp; Mitochondria
                </span>
              </div>

              {quizSelected && (
                <p className="font-normal text-[11px] text-neutral-600 animate-in fade-in" data-node-id="1568:3306">
                  ✨ Correct — that’s the cell’s energy source.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
