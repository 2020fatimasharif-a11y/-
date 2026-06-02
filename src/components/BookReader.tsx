import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Story, ClickableElement } from '../types';
import { KidIllustration } from './KidIllustration';
import { sfx } from '../utils/audio';

interface BookReaderProps {
  story: Story;
  onBackToLibrary: () => void;
}

export const BookReader: React.FC<BookReaderProps> = ({ story, onBackToLibrary }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [quizState, setQuizState] = useState<{
    showQuiz: boolean;
    selectedAnswerIndex: number | null;
    isCorrect: boolean | null;
    hasSubmitted: boolean;
  }>({
    showQuiz: false,
    selectedAnswerIndex: null,
    isCorrect: null,
    hasSubmitted: false,
  });

  const [lastClickedElement, setLastClickedElement] = useState<ClickableElement | null>(null);

  const activePage = story.pages[currentPageIndex];
  const isLastPage = currentPageIndex === story.pages.length - 1;

  const handleNextPage = () => {
    if (isLastPage) {
      sfx.playChime();
      setQuizState((prev) => ({ ...prev, showQuiz: true }));
    } else {
      sfx.playWhoosh();
      setCurrentPageIndex((prev) => prev + 1);
      setLastClickedElement(null);
    }
  };

  const handlePrevPage = () => {
    sfx.playWhoosh();
    setCurrentPageIndex((prev) => prev - 1);
    setLastClickedElement(null);
  };

  const handleElementInteraction = (elem: ClickableElement) => {
    setLastClickedElement(elem);
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizState.hasSubmitted) return; // disable double answering

    const correct = optionIdx === story.quiz.correctAnswerIndex;
    
    if (correct) {
      sfx.playChime();
      // Optionally cascade sparkler
      sfx.playSparkle();
    } else {
      sfx.playError();
    }

    setQuizState({
      showQuiz: true,
      selectedAnswerIndex: optionIdx,
      isCorrect: correct,
      hasSubmitted: true,
    });
  };

  const handleRestartQuiz = () => {
    sfx.playBoing();
    setQuizState({
      showQuiz: true,
      selectedAnswerIndex: null,
      isCorrect: null,
      hasSubmitted: false,
    });
  };

  const handleRestartBook = () => {
    sfx.playWhoosh();
    setCurrentPageIndex(0);
    setLastClickedElement(null);
    setQuizState({
      showQuiz: false,
      selectedAnswerIndex: null,
      isCorrect: null,
      hasSubmitted: false,
    });
  };

  // Render a custom CSS light confetti shower if correct
  const renderConfetti = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-40 select-none">
        {[...Array(24)].map((_, idx) => {
          const delays = [0, 0.4, 0.8, 1.2, 1.6, 2.0];
          const colors = ['bg-yellow-400', 'bg-emerald-400', 'bg-blue-400', 'bg-rose-400', 'bg-purple-400', 'bg-amber-400'];
          const randColor = colors[idx % colors.length];
          const randDelay = delays[idx % delays.length];
          const leftOffset = (idx * 4.3) % 100;
          
          return (
            <motion.div
              key={idx}
              initial={{ y: -30, x: `${leftOffset}%`, rotate: 0 }}
              animate={{ 
                y: 800, 
                rotate: 360,
                x: `${leftOffset + (idx % 2 === 0 ? 8 : -8)}%`
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: randDelay,
                ease: 'linear'
              }}
              className={`absolute w-3.5 h-3.5 rounded-sm opacity-80 ${randColor}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative bg-[#fdfaf1] rounded-3xl p-5 md:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ring-8 ring-white/10 max-w-5xl mx-auto overflow-hidden text-[#3e2723]">
      {/* Dynamic Physical Book Spine Ridge for Middle Divider simulation */}
      <div className="absolute left-[58.333%] top-0 bottom-0 w-1.5 bg-gradient-to-r from-gray-200/80 via-gray-300 to-gray-200/80 z-20 shadow-inner hidden md:block pointer-events-none" />

      {/* Quiz Confetti overlay */}
      {quizState.showQuiz && quizState.isCorrect && renderConfetti()}

      {/* Book header */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-[#3e2723]/10" dir="rtl">
        {/* Back and title */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              sfx.playWhoosh();
              onBackToLibrary();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#1a2b3c] bg-white/80 hover:bg-white text-[#1a2b3c] rounded-xl shadow-sm border border-slate-200 transition-all cursor-pointer"
          >
            <span>👉</span>
            <span>مستودع الكتب</span>
          </button>
          
          <div className="text-right">
            <span className="inline-block bg-[#4a148c]/10 text-[#4a148c] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
              {story.category}
            </span>
            <h3 className="text-base md:text-lg font-extrabold text-[#4a148c] line-clamp-1">
              {story.title}
            </h3>
          </div>
        </div>

        {/* Story progress pagination dot indicators */}
        {!quizState.showQuiz && (
          <div className="flex items-center gap-2">
            {story.pages.map((_, idx) => (
              <span
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  currentPageIndex === idx
                    ? 'bg-yellow-450 ring-4 ring-yellow-400/20 scale-120'
                    : 'bg-stone-200 scale-100'
                }`}
              />
            ))}
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 ml-1" />
            <span className={`text-xs font-bold text-stone-550 ${quizState.showQuiz ? 'line-through' : ''}`}>
              المشهد {currentPageIndex + 1} من {story.pages.length}
            </span>
          </div>
        )}
      </div>

      {/* Reader Body content switcher */}
      <AnimatePresence mode="wait">
        {!quizState.showQuiz ? (
          /* Book main scenery and pages text */
          <motion.div
            key={`page-${currentPageIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 min-h-[480px]"
            dir="rtl"
          >
            {/* Visual Screen segment */}
            <div className="md:col-span-7 flex flex-col justify-between">
              {/* Surrounding with elegant rounded border matching the lesson block preview */}
              <div className="bg-[#e8f5e9] p-4 rounded-3xl border border-emerald-100/40 relative shadow-inner overflow-hidden">
                <KidIllustration
                  type={activePage.illustrationType as any}
                  elements={activePage.interactiveElements}
                  onElementClick={handleElementInteraction}
                />
              </div>
              
              {/* Optional dynamic bubble description of tapped character */}
              <div className="h-10 mt-3 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {lastClickedElement ? (
                    <motion.div
                      key={lastClickedElement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/50 px-3.5 py-1.5 rounded-full text-center shadow-xs"
                    >
                      لقد نقرت على {lastClickedElement.emoji} {lastClickedElement.label}! حركة رائعة! ✨
                    </motion.div>
                  ) : (
                    <div className="text-[11px] text-stone-450 tracking-wide font-medium">
                      💡 انقر على العناصر والحيوانات اللطيفة داخل لوحة الرسم أعلاه لتحريكها!
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Reading and Educational Facts Panel */}
            <div className="md:col-span-5 flex flex-col justify-between gap-5">
              {/* Joyful story text wrapping with beautiful display typography */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs font-bold text-stone-400 mb-2">📜 نص الحكاية:</span>
                <p className="text-right text-lg md:text-2xl font-semibold text-[#3e2723] leading-[1.85] tracking-tight">
                  {activePage.text}
                </p>
                
                {/* Voice Narration simulation from Design HTML */}
                <div className="mt-6 flex items-center bg-purple-50 p-4 rounded-2xl border border-purple-100">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white ml-3 shadow-md">
                    🔊
                  </div>
                  <p className="text-purple-900 text-sm font-semibold">تستمع الآن إلى القصة بالصوت الذكي التفاعلي</p>
                </div>
              </div>

              {/* Special Educational "Did you know?" trivia bubble */}
              {activePage.educationalFact && (
                <div className="relative p-4 md:p-5 bg-amber-50/70 border border-amber-200/40 rounded-2xl mt-2 shadow-xs">
                  <div className="absolute -top-3.5 right-4 bg-amber-400 text-amber-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <span>🤔 معلومة تربوية شيقة</span>
                  </div>
                  <p className="text-[#3e2723]/90 text-xs md:text-[13px] text-right leading-relaxed pt-1.5 font-medium">
                    {activePage.educationalFact}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Book Educational interactive Quiz section */
          <motion.div
            key="quiz-screen"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex flex-col items-center justify-center py-6 min-h-[480px] max-w-2xl mx-auto"
            dir="rtl"
          >
            {!quizState.isCorrect ? (
              /* Quiz answering container */
              <div className="text-center w-full">
                <div className="bg-amber-100 text-amber-900 w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                  🧩
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                  سؤال تفاعلي ذكي
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">
                  لنعصر أذهاننا الفتية! أجب عن هذا السؤال لتبرهن ذكاءك لرفيقك {story.pages[0].interactiveElements[0]?.label || 'اللطيف'}!
                </p>

                {/* Question bubble */}
                <div className="bg-white px-6 py-5 rounded-3xl shadow-sm border border-slate-100 mb-6 text-center">
                  <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
                    {story.quiz.question}
                  </h4>
                </div>

                {/* Options list */}
                <div className="space-y-3.5 mb-6">
                  {story.quiz.options.map((option, idx) => {
                    const isSelected = quizState.selectedAnswerIndex === idx;
                    const isChoiceCorrect = idx === story.quiz.correctAnswerIndex;
                    
                    let bgStyle = 'bg-white hover:bg-amber-50/50 border-slate-200/90';
                    let textStyle = 'text-slate-700';

                    if (quizState.hasSubmitted) {
                      if (isChoiceCorrect) {
                        bgStyle = 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200';
                        textStyle = 'text-emerald-800 font-bold';
                      } else if (isSelected) {
                        bgStyle = 'bg-rose-50 border-rose-300 ring-2 ring-rose-200';
                        textStyle = 'text-rose-800 font-bold';
                      } else {
                        bgStyle = 'bg-slate-50 border-slate-100 opacity-60';
                        textStyle = 'text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizState.hasSubmitted}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-right p-4 rounded-2xl border-2 transition-all flex items-center gap-3 focus:outline-none ${
                          !quizState.hasSubmitted ? 'cursor-pointer hover:border-amber-400 hover:scale-101 active:scale-99' : ''
                        } ${bgStyle}`}
                      >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-inner
                          ${isSelected 
                            ? (isChoiceCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800')
                            : (quizState.hasSubmitted && isChoiceCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 text-amber-800')
                          }
                        `}>
                          {idx + 1}
                        </span>
                        <span className={`text-sm md:text-base ${textStyle}`}>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Fail state try again prompt */}
                {quizState.hasSubmitted && !quizState.isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-orange-50 border border-orange-200 rounded-2xl mb-6 text-center"
                  >
                    <p className="text-orange-850 font-bold text-sm">
                      😅 أوه! حاول مجدداً يا بطل، رفيقتك تثق بنجاحك!
                    </p>
                    <button
                      onClick={handleRestartQuiz}
                      className="mt-2.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      أعد المحاولة 🔄
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Success / Completion panel */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-white px-6 py-8 rounded-3xl border-4 border-emerald-300 shadow-xl w-full"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
                  🏆
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  أنت مدهش وخارق!
                </h3>
                <p className="text-sm font-bold text-slate-500 mb-6">
                  لقد أكملت قراءة الحكاية وحللت لغز المغامرة بكل سداد!
                </p>

                {/* Explanation container */}
                <div className="bg-emerald-50/70 border border-emerald-100 p-5 rounded-2xl mb-8">
                  <p className="text-emerald-800 text-sm md:text-base leading-relaxed text-right font-medium">
                    {story.quiz.explanation}
                  </p>
                </div>

                {/* Ending navigation targets */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      sfx.playWhoosh();
                      onBackToLibrary();
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl cursor-pointer transition-all shadow-md focus:outline-none"
                  >
                    العودة لـمكتبة القصص 👋
                  </button>
                  
                  <button
                    onClick={handleRestartBook}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm rounded-xl cursor-pointer transition-all shadow-md focus:outline-none"
                  >
                    قراءة القصة من جديد 🔄
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book footer buttons for page turning */}
      {!quizState.showQuiz && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#3e2723]/10" dir="rtl">
          {/* Previous Button or Back placeholder */}
          {currentPageIndex > 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevPage}
              className="px-5 py-3 bg-white/80 hover:bg-white text-stone-700 font-bold text-sm rounded-xl border border-stone-200 shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span>⏪</span>
              <span>المشهد السابق</span>
            </motion.button>
          ) : (
            <div className="w-24 h-5" /> /* empty layout spacer */
          )}

          {/* Prompt child action message */}
          <div className="hidden sm:block text-xs font-bold text-stone-400">
            {isLastPage ? 'لقد انتهت القصة! اضغط زر اللغز' : 'انظر للرسمة ثم تقدم للأمام! 👉'}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            className={`px-6 py-3 font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-1.5
              ${isLastPage 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-700/10' 
                : 'bg-yellow-450 hover:bg-yellow-500 text-[#1a2b3c] shadow-yellow-500/10'
              }
            `}
          >
            <span>{isLastPage ? 'حل اللغز التفاعلي! 🧩' : 'المشهد التالي'}</span>
            <span>{isLastPage ? '🏆' : '⏪'}</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};
