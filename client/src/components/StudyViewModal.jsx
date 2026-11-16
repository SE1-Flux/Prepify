import React, { useState } from 'react';
import { X, BookOpen, Layers, HelpCircle, Compass, CheckCircle2, RotateCw, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function StudyViewModal({ isOpen, onClose, material }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'flashcards' | 'quiz' | 'dive'
  
  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  if (!isOpen || !material) return null;

  const flashcards = material.flashcards || [];
  const quizzes = material.quizzes || [];
  const currentCard = flashcards[cardIndex];

  const handleSelectQuizAnswer = (qIdx, optIdx) => {
    if (quizScore !== null) return; // already submitted
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCalculateScore = () => {
    let correct = 0;
    quizzes.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });
    setQuizScore({
      score: correct,
      total: quizzes.length,
      percentage: Math.round((correct / (quizzes.length || 1)) * 100),
    });
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizScore(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-4xl w-full h-[90vh] max-h-[820px] shadow-2xl flex flex-col overflow-hidden border border-neutral-100">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70 shrink-0">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary-700 block">
              Study Pack Synthesis
            </span>
            <h2 className="text-xl font-extrabold text-neutral-900 leading-tight">
              {material.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-200/80 hover:bg-neutral-300 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 px-6 bg-white shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'summary' ? 'border-primary-600 text-primary-700' : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Overview & Key Concepts</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'flashcards' ? 'border-primary-600 text-primary-700' : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Smart Flashcards ({flashcards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'quiz' ? 'border-primary-600 text-primary-700' : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Practice Quiz ({quizzes.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* TAB 1: SUMMARY & CONCEPTS */}
          {activeTab === 'summary' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary-700 mb-2">
                  Executive AI Summary
                </h4>
                <p className="text-base text-neutral-700 leading-relaxed bg-primary-50/60 p-5 rounded-2xl border border-primary-100">
                  {material.summary}
                </p>
              </div>

              {material.keyConcepts && material.keyConcepts.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 mb-4">
                    Key Definitions & Principles
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {material.keyConcepts.map((kc, i) => (
                      <div key={i} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:shadow-sm transition-all">
                        <span className="font-bold text-sm text-primary-800 block mb-1">
                          {kc.term}
                        </span>
                        <p className="text-xs text-neutral-600 leading-normal">
                          {kc.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SMART FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div className="flex flex-col items-center justify-center py-4 animate-in fade-in duration-200 max-w-xl mx-auto">
              
              {/* Progress counter */}
              <div className="flex items-center justify-between w-full mb-3 text-xs font-bold text-neutral-500">
                <span>CARD {cardIndex + 1} OF {flashcards.length}</span>
                <span className="text-primary-700">{currentCard?.topic || 'Concept'}</span>
              </div>

              {/* Flashcard Frame */}
              <div
                onClick={() => setFlipped(!flipped)}
                className="w-full min-h-[260px] sm:min-h-[300px] bg-white rounded-2xl p-7 border-2 border-primary-100 shadow-lg cursor-pointer hover:border-primary-400 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] text-primary-600 tracking-wider uppercase">
                    {!flipped ? 'QUESTION / ACTIVE RECALL' : 'ANSWER / SOLUTION'}
                  </span>
                  <RotateCw className="w-4 h-4 text-neutral-400" />
                </div>

                <div className="my-auto text-center py-4">
                  {!flipped ? (
                    <p className="text-2xl font-extrabold text-neutral-900 leading-snug">
                      {currentCard?.question}
                    </p>
                  ) : (
                    <div className="animate-in fade-in">
                      <p className="text-xl font-bold text-primary-900 mb-2">
                        {currentCard?.answer}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-center text-xs font-semibold text-neutral-400">
                  Click card to flip
                </p>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  disabled={cardIndex === 0}
                  onClick={() => {
                    setCardIndex(cardIndex - 1);
                    setFlipped(false);
                  }}
                  className="h-10 px-4 rounded-xl border border-neutral-300 disabled:opacity-30 text-xs font-bold text-neutral-700 flex items-center gap-1 hover:bg-neutral-50 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setFlipped(!flipped)}
                  className="h-10 px-5 rounded-xl bg-primary-50 text-primary-700 text-xs font-bold hover:bg-primary-100 cursor-pointer"
                >
                  {flipped ? 'Show Question' : 'Reveal Answer'}
                </button>

                <button
                  disabled={cardIndex >= flashcards.length - 1}
                  onClick={() => {
                    setCardIndex(cardIndex + 1);
                    setFlipped(false);
                  }}
                  className="h-10 px-4 rounded-xl border border-neutral-300 disabled:opacity-30 text-xs font-bold text-neutral-700 flex items-center gap-1 hover:bg-neutral-50 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ PRACTICE */}
          {activeTab === 'quiz' && (
            <div className="space-y-6 animate-in fade-in duration-200 max-w-2xl mx-auto">
              {quizzes.map((q, qIdx) => {
                const userSelected = quizAnswers[qIdx];
                const isSubmitted = quizScore !== null;
                const isCorrect = userSelected === q.correctAnswerIndex;

                return (
                  <div key={qIdx} className="bg-neutral-50/80 rounded-2xl p-5 sm:p-6 border border-neutral-200">
                    <p className="font-extrabold text-base text-neutral-900 mb-4">
                      <span className="text-primary-600 mr-2">{qIdx + 1}.</span>
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisChosen = userSelected === optIdx;
                        let optionStyle = 'bg-white border-neutral-200 text-neutral-800 hover:border-primary-400';

                        if (isSubmitted) {
                          if (optIdx === q.correctAnswerIndex) {
                            optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          } else if (isThisChosen && !isCorrect) {
                            optionStyle = 'bg-red-50 border-red-500 text-red-900';
                          }
                        } else if (isThisChosen) {
                          optionStyle = 'bg-primary-50 border-primary-600 text-primary-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIdx === q.correctAnswerIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && q.explanation && (
                      <p className="mt-3 text-xs text-neutral-600 bg-white p-3 rounded-lg border border-neutral-100">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Submit or Score summary */}
              <div className="pt-4 flex items-center justify-between">
                {quizScore === null ? (
                  <button
                    onClick={handleCalculateScore}
                    disabled={Object.keys(quizAnswers).length === 0}
                    className="w-full h-12 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl cursor-pointer"
                  >
                    Submit Quiz & See Score
                  </button>
                ) : (
                  <div className="w-full bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-base text-primary-900">
                        Score: {quizScore.score} / {quizScore.total} ({quizScore.percentage}%)
                      </p>
                      <p className="text-xs text-primary-700">
                        {quizScore.percentage >= 80 ? 'Mastery demonstrated!' : 'Good practice! Review the flashcards to solidify your knowledge.'}
                      </p>
                    </div>
                    <button
                      onClick={handleResetQuiz}
                      className="px-4 py-2 bg-white text-xs font-bold text-primary-700 rounded-lg border border-primary-200 cursor-pointer"
                    >
                      Retake Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
