import React, { useState } from 'react';

export default function StudyCrew() {
  const [activeCompanion, setActiveCompanion] = useState(null);

  const companions = [
    {
      name: 'The go-getter',
      img: '/assets/b8cdf.png',
      bg: 'bg-primary-50',
      tagline: 'First to start, keeps the momentum rolling.',
      nodeId: '1568:3326',
      nameId: '1568:3328',
    },
    {
      name: 'The curious one',
      img: '/assets/0951b.png',
      bg: 'bg-neutral-50',
      tagline: 'Asks "why?" until every detail clicks into place.',
      nodeId: '1568:3329',
      nameId: '1568:3331',
    },
    {
      name: 'The spark',
      img: '/assets/059cc.png',
      bg: 'bg-primary-50',
      tagline: 'Injects positive energy when you hit study fatigue.',
      nodeId: '1568:3332',
      nameId: '1568:3334',
    },
    {
      name: 'The page-turner',
      img: '/assets/a3bf5.png',
      bg: 'bg-neutral-50',
      tagline: 'Leaves no chapter unread and no term undefined.',
      nodeId: '1568:3335',
      nameId: '1568:3337',
    },
    {
      name: 'The thinker',
      img: '/assets/aa88e.png',
      bg: 'bg-primary-50',
      tagline: 'Maps overarching concepts and spots hidden patterns.',
      nodeId: '1568:3338',
      nameId: '1568:3340',
    },
    {
      name: 'The explorer',
      img: '/assets/adf57.png',
      bg: 'bg-neutral-50',
      tagline: 'Always ready to dive into unfamiliar subject matter.',
      nodeId: '1568:3341',
      nameId: '1568:3343',
    },
    {
      name: 'The cheer squad',
      img: '/assets/907ff.png',
      bg: 'bg-primary-50',
      tagline: 'Celebrates your every completed flashcard and streak.',
      nodeId: '1568:3344',
      nameId: '1568:3346',
    },
  ];

  return (
    <section id="crew" className="py-20 lg:py-24 bg-white" data-node-id="1568:3322" data-name="Meet your study crew">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-extrabold text-[11px] text-primary-700 tracking-wider uppercase mb-3" data-node-id="1568:3323">
              A LITTLE PERSONALITY GOES A LONG WAY
            </p>
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-[43px] !leading-[1.2] text-neutral-900" data-node-id="1568:3324">
              Serious about studying.<br />Not about being boring.
            </h2>
          </div>
          <p className="font-normal text-base sm:text-[17px] text-neutral-600 max-w-md leading-relaxed" data-node-id="1568:3325">
            Meet your pixel-perfect study crew. Big personalities for every kind of learner.
          </p>
        </div>

        {/* 7 Characters Horizontal Grid / Scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-5 mb-14">
          {companions.map((comp, idx) => (
            <div
              key={idx}
              onClick={() => setActiveCompanion(activeCompanion === idx ? null : idx)}
              className={`${comp.bg} rounded-[20px] p-4 flex flex-col items-center justify-between min-h-[250px] border border-neutral-200/50 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group`}
              data-node-id={comp.nodeId}
              data-name={comp.name}
            >
              <div className="w-[140px] h-[150px] flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img
                  src={comp.img}
                  alt={comp.name}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>

              <div className="w-full text-center">
                <p className="font-bold text-[12px] text-neutral-900 group-hover:text-primary-600 transition-colors" data-node-id={comp.nameId}>
                  {comp.name}
                </p>
                {activeCompanion === idx && (
                  <p className="text-[10px] text-neutral-600 mt-1 animate-in fade-in leading-tight">
                    {comp.tagline}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between pt-6 border-t border-neutral-200 gap-4">
          <p className="font-bold text-xl sm:text-[20px] text-primary-700" data-node-id="1568:3347">
            Find your kind of curious.
          </p>
          <p className="font-normal text-[13px] text-neutral-600" data-node-id="1568:3348">
            Seven characters. One shared mission: keep learning.
          </p>
        </div>

      </div>
    </section>
  );
}
