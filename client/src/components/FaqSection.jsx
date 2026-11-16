import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What can I bring to Prepify?',
      a: 'Upload PDFs, slides, or lecture notes — or paste your notes to get started. Our backend uses pdf-parse to extract clean text and Google Gemini API to structure your syllabus into active study units.',
      qId: '1568:3383',
      aId: '1568:3384',
      divId: '1568:3385',
    },
    {
      q: 'How do the study tools work together?',
      a: 'Turn your material into summaries, review flashcards, then test yourself with quizzes. Everything connects back to your source material so you always know what you’ve mastered and where your gaps are.',
      qId: '1568:3386',
      aId: '1568:3387',
      divId: '1568:3388',
    },
    {
      q: 'Is the Dive game actually part of studying?',
      a: 'Yes. Its questions come from your own study sets, so play keeps you practicing. Every correct answer takes your pixel companion deeper through Shallows, Twilight, Midnight, and Abyss zones.',
      qId: '1568:3389',
      aId: '1568:3390',
      divId: '1568:3391',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-24 bg-white" data-node-id="1568:3379" data-name="Questions answered">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <span className="font-extrabold text-[11px] text-primary-700 tracking-wider uppercase mb-3 block" data-node-id="1568:3380">
              GOOD QUESTIONS
            </span>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-neutral-900 leading-tight mb-4" data-node-id="1568:3381">
              A little clarity<br />before you dive.
            </h2>
            <p className="font-normal text-base sm:text-[16px] text-neutral-600" data-node-id="1568:3382">
              Your next aha moment starts here.
            </p>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border-b border-neutral-200 py-6 first:pt-0" data-node-id={faq.divId}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <h3 className="font-bold text-[18px] text-neutral-900 group-hover:text-primary-600 transition-colors" data-node-id={faq.qId}>
                      {faq.q}
                    </h3>
                    <span className="text-neutral-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-primary-600" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-3 font-normal text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed animate-in fade-in duration-200" data-node-id={faq.aId}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
