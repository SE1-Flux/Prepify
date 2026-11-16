import React from 'react';

export default function BenefitsRibbon() {
  const benefits = [
    { num: '01', text: 'Your material, made manageable', numId: '1568:3270', textId: '1568:3271' },
    { num: '02', text: 'Study tools that work together', numId: '1568:3272', textId: '1568:3273' },
    { num: '03', text: 'A little play. A lot of progress.', numId: '1568:3274', textId: '1568:3275' },
  ];

  return (
    <section className="bg-primary-950 py-8 lg:py-10 border-y border-primary-900" data-node-id="1568:3269" data-name="Benefits ribbon">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-extrabold text-[15px] sm:text-[16px] text-primary-200 tracking-wider shrink-0" data-node-id={b.numId}>
                {b.num}
              </span>
              <div className="h-5 w-px bg-primary-800 shrink-0" />
              <p className="font-semibold text-[14px] sm:text-[15px] text-white leading-snug" data-node-id={b.textId}>
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
