import React from 'react';
import { motion } from 'motion/react';
import { Story } from '../types';
import { sfx } from '../utils/audio';
import coverImg from '../assets/images/magical_book_cover_1780210381646.png';

interface StoryLibraryProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onNavigateToCreator: () => void;
}

export const StoryLibrary: React.FC<StoryLibraryProps> = ({
  stories,
  onSelectStory,
  onNavigateToCreator,
}) => {

  const handleCardClick = (story: Story) => {
    sfx.playWhoosh();
    onSelectStory(story);
  };

  return (
    <div className="font-sans text-right" dir="rtl">
      {/* Immersive Glassmorphism Header Panel */}
      <div className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
        <div className="flex items-center gap-4 relative z-10 text-right">
          <img 
            src={coverImg} 
            alt="Magical Book" 
            referrerPolicy="no-referrer"
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md transform hover:scale-105 transition-transform" 
          />
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>📚</span>
              <span>بوابة الحكايات التفاعلية للأطفال</span>
            </h2>
            <p className="text-xs md:text-[14px] text-stone-300 mt-1 pb-1 leading-relaxed">
              انقر على أي كتاب لفتح صفحاته واستكشاف رسومه التفاعلية المضحكة، أو قم بتأليف حكايتك الخاصة بثوانٍ!
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sfx.playChime();
            onNavigateToCreator();
          }}
          className="relative z-10 px-6 py-3.5 bg-yellow-400 hover:bg-yellow-550 text-[#1a2b3c] font-extrabold text-sm rounded-2xl shadow-lg shadow-yellow-400/20 focus:outline-none cursor-pointer flex items-center gap-2 transition-all"
        >
          <span>🪄</span>
          <span>اصنع قصة جديدة بالذكاء الاصطناعي</span>
        </motion.button>
      </div>

      {/* Grid of Stories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => {
          const isAi = !!story.isAiGenerated;
          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              onClick={() => handleCardClick(story)}
              className="group cursor-pointer bg-white text-[#1a2b3c] rounded-3xl border-2 border-transparent p-5 shadow-lg hover:shadow-2xl hover:border-yellow-400 hover:scale-[1.03] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Book cover visual header */}
                <div className={`relative aspect-[16/10] w-full rounded-2xl flex items-center justify-center text-7xl shadow-inner mb-4 transition-transform group-hover:scale-102
                  ${isAi 
                    ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100' 
                    : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100'
                  }
                `}>
                  <span className="drop-shadow-md select-none">{story.coverEmoji}</span>
                  
                  {/* Badges */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                    {isAi ? (
                      <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 border border-indigo-200">
                        <span>🪄</span>
                        <span>مخصصة بالكامل</span>
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-850 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm border border-amber-200">
                        ⭐️ قصة أساسية
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[10px] text-slate-500 font-extrabold px-2.5 py-0.5 rounded-full border border-slate-100">
                    📖 ٣ فصول تفاعلية
                  </span>
                </div>

                {/* Text details */}
                <span className="text-[10px] font-extrabold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-full">
                  {story.category}
                </span>

                <h3 className="text-base md:text-lg font-black text-[#1a2b3c] group-hover:text-purple-950 mt-3.5 transition-colors leading-snug">
                  {story.title}
                </h3>

                <p className="text-xs text-stone-500 mt-2 lines-clamp-3 leading-relaxed">
                  {story.description}
                </p>
              </div>

              {/* Card Footer action button */}
              <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-black text-purple-650 group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                  <span>افتح واقرأ الآن</span>
                  <span>👈</span>
                </span>
                
                <span className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-amber-100 text-stone-550 group-hover:text-amber-800 flex items-center justify-center transition-colors font-bold text-sm">
                  📖
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Dynamic call to action card if they have empty shelfs */}
        <motion.div
          onClick={() => {
            sfx.playChime();
            onNavigateToCreator();
          }}
          className="cursor-pointer bg-white/5 rounded-3xl border-4 border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-yellow-400/40 hover:scale-101 transition-all text-white"
        >
          <div className="w-16 h-16 bg-white/10 text-yellow-350 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner">
            🪄
          </div>
          <h3 className="text-base font-bold text-white">
            ألف المزيد من مغامراتك!
          </h3>
          <p className="text-xs text-stone-300 mt-1.5 max-w-[200px] leading-relaxed">
            انقر هنا لصناعة قصة فضاء، بيئة أو بحار شيقة بطلها طفلك ومرافقه الحيواني!
          </p>
        </motion.div>
      </div>
    </div>
  );
};
