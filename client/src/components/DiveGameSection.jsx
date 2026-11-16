import React, { useState } from 'react';
import { Play, Flame, Award, ChevronRight, RotateCcw } from 'lucide-react';
import { submitGameScore } from '../services/api';

export default function DiveGameSection({ onOpenUpload }) {
  const [currentLevel, setCurrentLevel] = useState(2); // 0: Shallows, 1: Twilight, 2: Midnight, 3: Abyss
  const [streak, setStreak] = useState(7);
  const [selectedOption, setSelectedOption] = useState(0); // 0: Anaphase
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(1850);
  const [feedback, setFeedback] = useState('Correct answer. Next stop: deeper.');

  const questions = [
    {
      depthName: 'SHALLOWS — 0 m',
      depthValue: 0,
      topic: 'QUESTION 1 / CELL BIOLOGY',
      question: 'What is the powerhouse organelle that produces ATP?',
      options: ['Mitochondria', 'Vacuole'],
      correct: 0,
      encouragement: 'Great start! Diving into the Twilight zone...',
    },
    {
      depthName: 'TWILIGHT — 200 m',
      depthValue: 200,
      topic: 'QUESTION 3 / MEMBRANE TRANSPORT',
      question: 'Does facilitated diffusion consume ATP energy?',
      options: ['No, it is passive', 'Yes, it consumes ATP'],
      correct: 0,
      encouragement: 'Sharp recall! Descending to Midnight depth...',
    },
    {
      depthName: 'MIDNIGHT — 1,000 m',
      depthValue: 1000,
      topic: 'QUESTION 7 / CELL BIOLOGY',
      question: 'Which phase separates sister chromatids?',
      options: ['Anaphase', 'Metaphase'],
      correct: 0,
      encouragement: 'Correct answer. Next stop: deeper.',
    },
    {
      depthName: 'ABYSS — 4,000 m',
      depthValue: 4000,
      topic: 'QUESTION 10 / BIOCHEMISTRY',
      question: 'Which enzyme produces ATP using proton motive force?',
      options: ['ATP Synthase', 'DNA Ligase'],
      correct: 0,
      encouragement: 'Legendary dive! Maximum abyssal mastery reached!',
    },
  ];

  const currentQ = questions[currentLevel];

  const handleSelect = (idx) => {
    setSelectedOption(idx);
    if (idx === currentQ.correct) {
      const nextStreak = streak + 1;
      const nextScore = score + 250;
      setStreak(nextStreak);
      setScore(nextScore);
      setFeedback(currentQ.encouragement);

      // Auto advance after short delay if playing
      if (currentLevel < questions.length - 1) {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
          setSelectedOption(null);
        }, 1200);
      } else {
        // Record high score
        submitGameScore({
          playerName: 'Dive Champion',
          depth: 4000,
          streak: nextStreak,
          score: nextScore,
          companion: 'The thinker',
        }).catch(() => {});
      }
    } else {
      setFeedback('Incorrect — review your notes and try again!');
    }
  };

  const handleReset = () => {
    setCurrentLevel(0);
    setStreak(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback('Select the correct answer to begin diving!');
  };

  return (
    <section id="dive-game" className="bg-primary-950 py-20 lg:py-24 text-white overflow-hidden" data-node-id="1568:3349" data-name="The Dive game">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Intro */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="font-extrabold text-[11px] text-primary-200 tracking-wider uppercase mb-3" data-node-id="1568:3350">
              MEET YOUR NEW FAVORITE STUDY BREAK
            </span>

            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-[48px] !leading-[1.2] text-white mb-6" data-node-id="1568:3351">
              Not a distraction.<br />
              <span className="text-primary-200">A deeper way to learn.</span>
            </h2>

            <p className="font-normal text-base sm:text-[18px] text-primary-100/90 leading-relaxed mb-8" data-node-id="1568:3352">
              Welcome to the Dive game. Explore a midnight ocean by answering questions from your own study sets. The more you know, the deeper you go.
            </p>

            <div className="space-y-3 mb-10 w-full">
              <div className="flex items-center gap-3 text-primary-100 font-semibold text-[14px]" data-node-id="1568:3353">
                <span className="w-6 h-6 rounded-full bg-primary-800 text-primary-200 text-xs flex items-center justify-center font-bold">01</span>
                <span>Build a streak with every right answer</span>
              </div>
              <div className="flex items-center gap-3 text-primary-100 font-semibold text-[14px]" data-node-id="1568:3354">
                <span className="w-6 h-6 rounded-full bg-primary-800 text-primary-200 text-xs flex items-center justify-center font-bold">02</span>
                <span>Reach new depths. Beat your personal best.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setGameActive(true);
                  handleReset();
                }}
                className="bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-bold text-[14px] h-[52px] px-7 rounded-[12px] shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                data-node-id="1568:3355"
                data-name="Start your first dive"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start your first dive</span>
              </button>

              <button
                onClick={onOpenUpload}
                className="bg-primary-900/80 hover:bg-primary-800 border border-primary-700 text-primary-100 font-bold text-[14px] h-[52px] px-6 rounded-[12px] transition-all cursor-pointer"
              >
                Play with my own notes
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Dive Preview Frame */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#1a376f] rounded-[24px] p-6 sm:p-8 border border-primary-800 shadow-2xl min-h-[530px] flex flex-col justify-between overflow-hidden" data-node-id="1568:3356" data-name="Dive gameplay preview">
              
              {/* Top Header inside preview */}
              <div className="flex items-center justify-between mb-4 z-10">
                <span className="font-extrabold text-[12px] text-white tracking-widest uppercase flex items-center gap-2" data-node-id="1568:3365">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  THE DIVE
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-primary-800/80 px-3 py-1 rounded-full text-amber-300 font-bold text-[11px]" data-node-id="1568:3366">
                    <Flame className="w-3.5 h-3.5 fill-amber-300" />
                    <span>STREAK {streak < 10 ? `0${streak}` : streak}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary-200">
                    {score} XP
                  </span>
                </div>
              </div>

              {/* Ocean Depth Markers */}
              <div className="relative py-4 space-y-7 z-10">
                
                {/* 0m Marker */}
                <div className="flex items-center gap-4">
                  <span className={`font-bold text-[10px] tracking-wider w-36 shrink-0 ${currentLevel === 0 ? 'text-cyan-300 font-extrabold' : 'text-primary-200/60'}`} data-node-id="1568:3358">
                    SHALLOWS — 0 m
                  </span>
                  <div className="h-px bg-primary-800 flex-1" data-node-id="1568:3357" />
                </div>

                {/* 200m Marker */}
                <div className="flex items-center gap-4">
                  <span className={`font-bold text-[10px] tracking-wider w-36 shrink-0 ${currentLevel === 1 ? 'text-cyan-300 font-extrabold' : 'text-primary-200/60'}`} data-node-id="1568:3360">
                    TWILIGHT — 200 m
                  </span>
                  <div className="h-px bg-primary-800 flex-1" data-node-id="1568:3359" />
                </div>

                {/* 1000m Marker */}
                <div className="flex items-center gap-4">
                  <span className={`font-bold text-[10px] tracking-wider w-36 shrink-0 ${currentLevel === 2 ? 'text-cyan-300 font-extrabold' : 'text-primary-200/60'}`} data-node-id="1568:3362">
                    MIDNIGHT — 1,000 m
                  </span>
                  <div className="h-px bg-primary-800 flex-1" data-node-id="1568:3361" />
                </div>

                {/* 4000m Marker */}
                <div className="flex items-center gap-4">
                  <span className={`font-bold text-[10px] tracking-wider w-36 shrink-0 ${currentLevel === 3 ? 'text-cyan-300 font-extrabold' : 'text-primary-200/60'}`} data-node-id="1568:3364">
                    ABYSS — 4,000 m
                  </span>
                  <div className="h-px bg-primary-800 flex-1" data-node-id="1568:3363" />
                </div>
              </div>

              {/* Swimming Companion: The thinker */}
              <div
                className="absolute right-4 sm:right-10 top-16 w-36 sm:w-48 h-36 sm:h-48 pointer-events-none z-10 animate-float"
                data-node-id="1568:3367"
              >
                <img
                  src="/assets/aa88e.png"
                  alt="The thinker companion swimming"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Current Depth Badge */}
              <div className="inline-flex flex-col bg-primary-800 px-4 py-2 rounded-[12px] border border-primary-700/60 w-fit mb-5 z-10" data-node-id="1568:3368">
                <span className="font-extrabold text-[24px] text-white leading-tight" data-node-id="1568:3369">
                  {currentQ.depthValue.toLocaleString()} m
                </span>
                <span className="font-bold text-[9px] text-primary-100 tracking-wider uppercase" data-node-id="1568:3370">
                  KEEP GOING
                </span>
              </div>

              {/* Interactive Dive Question Box */}
              <div className="bg-white rounded-[16px] p-5 sm:p-6 text-neutral-900 shadow-xl z-20 border border-white" data-node-id="1568:3371" data-name="Dive question">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[10px] text-primary-700 tracking-wider uppercase" data-node-id="1568:3372">
                    {currentQ.topic}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-500">
                    Depth: {currentQ.depthName}
                  </span>
                </div>

                <p className="font-bold text-[17px] text-neutral-900 leading-snug mb-4" data-node-id="1568:3373">
                  {currentQ.question}
                </p>

                {/* Question Option Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(optIdx)}
                        className={`h-[42px] px-4 rounded-[10px] font-bold text-[12px] text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-primary-50 text-neutral-700 hover:bg-primary-100 border border-primary-100'
                        }`}
                        data-node-id={optIdx === 0 ? "1568:3374" : "1568:3376"}
                      >
                        <span data-node-id={optIdx === 0 ? "1568:3375" : "1568:3377"}>
                          {opt}
                        </span>
                        {isSelected && <ChevronRight className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback line */}
                <div className="flex items-center justify-between pt-1">
                  <p className="font-bold text-[11px] text-primary-700" data-node-id="1568:3378">
                    ✨ {feedback}
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Dive</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
