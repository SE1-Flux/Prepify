import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Drop in your material',
      desc: 'A PDF, a slide deck, a page of notes. Start with what you already have.',
      numId: '1568:3310',
      ruleId: '1568:3311',
      titleId: '1568:3312',
      descId: '1568:3313',
    },
    {
      num: '02',
      title: 'Find your study flow',
      desc: 'Review flashcards, tackle a quiz, and see what needs another look.',
      numId: '1568:3314',
      ruleId: '1568:3315',
      titleId: '1568:3316',
      descId: '1568:3317',
    },
    {
      num: '03',
      title: 'Take your knowledge for a dive',
      desc: 'Play with questions from your own sets. Every right answer takes you deeper.',
      numId: '1568:3318',
      ruleId: '1568:3319',
      titleId: '1568:3320',
      descId: '1568:3321',
    },
  ];

  return (
    <section className="bg-neutral-50 py-20 lg:py-24 border-y border-neutral-200/70" data-node-id="1568:3307" data-name="How it works">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="font-extrabold text-[11px] text-primary-700 tracking-wider uppercase mb-3" data-node-id="1568:3308">
            FROM UPLOAD TO UNDERSTOOD
          </p>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-neutral-900" data-node-id="1568:3309">
            Your next study session, sorted.
          </h2>
        </div>

        {/* 3 Step Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-extrabold text-[28px] text-primary-600 leading-none" data-node-id={s.numId}>
                  {s.num}
                </span>
                <div className="h-px bg-neutral-200 flex-1" data-node-id={s.ruleId} />
              </div>
              <h3 className="font-bold text-[19px] text-neutral-900 mb-2" data-node-id={s.titleId}>
                {s.title}
              </h3>
              <p className="font-normal text-[14px] text-neutral-600 leading-relaxed" data-node-id={s.descId}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
