import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Story } from './types';
import { STATIC_STORIES } from './data';
import { BookReader } from './components/BookReader';
import { StoryCreator } from './components/StoryCreator';
import { StoryLibrary } from './components/StoryLibrary';
import { sfx } from './utils/audio';

export default function App() {
  const [stories, setStories] = useState<Story[]>(STATIC_STORIES);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeTab, setActiveTab] = useState<'library' | 'creator'>('library');
  const [isMuted, setIsMuted] = useState(false);

  // Load custom stories from localStorage on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kid_stories_collection');
      if (stored) {
        const parsed = JSON.parse(stored) as Story[];
        // Merge static ones with the user custom ones smoothly
        const customStories = parsed.filter(s => s.isAiGenerated);
        setStories([...STATIC_STORIES, ...customStories]);
      }
    } catch (e) {
      console.error('Failed to load stories from local storage', e);
    }
  }, []);

  // Set initial mute preferences
  useEffect(() => {
    sfx.setMute(isMuted);
  }, [isMuted]);

  // Handle new story creations
  const handleStoryCreated = (newStory: Story) => {
    const updatedCollection = [...stories, newStory];
    setStories(updatedCollection);
    
    // Persist to local storage (only saving the AI generated ones)
    try {
      const aiOnly = updatedCollection.filter(s => s.isAiGenerated);
      localStorage.setItem('kid_stories_collection', JSON.stringify(aiOnly));
    } catch (err) {
      console.error('Failed to store new story', err);
    }

    // Automatically trigger reader view for the fresh magical story
    setActiveStory(newStory);
  };

  const toggleSound = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    sfx.setMute(newMute);
    if (!newMute) {
      // play pop sound as feedback
      setTimeout(() => sfx.playPop(), 50);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a2b3c] text-white pb-12 font-sans selection:bg-yellow-400/30 overflow-x-hidden">
      
      {/* Immersive subtle ambient glows or constellations in the dark space */}
      <div className="absolute inset-x-0 top-0 h-96 pointer-events-none overflow-hidden select-none z-0">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 10, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-12 left-[10%] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute top-24 right-[15%] w-80 h-80 rounded-full bg-amber-500/5 blur-3xl"
        />
      </div>

      {/* Main Header navigation */}
      <header className="relative z-10 max-w-5xl mx-auto px-4 pt-6 md:pt-8 pb-4" dir="rtl">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 md:p-5 shadow-lg border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo and Greeting */}
          <div className="text-right flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: [0, 8, -8, 0] }}
              className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20 text-3xl select-none"
            >
              📚
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                عالم الحكايات التفاعلي الذكي
              </h1>
              <p className="text-[10px] md:text-xs text-slate-300 font-medium">
                كتاب رقمي تفاعل وقصص علمية مبتكرة لتثقيف عقول الأطفال
              </p>
            </div>
          </div>

          {/* Nav Controls & Sound Toggle */}
          <div className="flex items-center gap-3">
            {/* Playful gamified score elements from the Immersive theme preview */}
            <div className="hidden md:flex items-center gap-2">
              <div className="bg-white/10 px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">
                المستوى ٢: القراءة المبكرة 🎯
              </div>
              <div className="bg-yellow-400/20 px-3 py-1.5 rounded-full border border-yellow-400/30 text-yellow-350 text-xs font-bold">
                ⭐ ١٢٠ نقطة
              </div>
            </div>

            {/* Sound Mode Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleSound}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer transition-all border shadow-md
                ${isMuted 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20' 
                  : 'bg-yellow-400/10 border-yellow-400/30 text-yellow-300 hover:bg-yellow-400/20'
                }
              `}
              title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
            >
              <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
            </motion.button>

            {/* If reader is running, hide main tabs to keep UI cleanest */}
            {!activeStory && (
              <div className="bg-[#0f172a]/40 p-1.5 rounded-2xl flex items-center gap-1 border border-white/10">
                <button
                  onClick={() => {
                    sfx.playPop();
                    setActiveTab('creator');
                  }}
                  className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap
                    ${activeTab === 'creator'
                      ? 'bg-yellow-400 text-[#1a2b3c] shadow-md'
                      : 'text-slate-300 hover:text-white'
                    }
                  `}
                >
                  🪄 صانع القصص
                </button>
                <button
                  onClick={() => {
                    sfx.playPop();
                    setActiveTab('library');
                  }}
                  className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap
                    ${activeTab === 'library'
                      ? 'bg-yellow-400 text-[#1a2b3c] shadow-md'
                      : 'text-slate-300 hover:text-white'
                    }
                  `}
                >
                  📚 مكتبة الكتب
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Primary Workspace Panel */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 mt-4">
        <AnimatePresence mode="wait">
          {activeStory ? (
            /* Story Book Reader Display Mode */
            <motion.div
              key="book-reader-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <BookReader
                story={activeStory}
                onBackToLibrary={() => {
                  setActiveStory(null);
                  setActiveTab('library');
                }}
              />
            </motion.div>
          ) : activeTab === 'library' ? (
            /* Stories library browsing list mode */
            <motion.div
              key="story-library-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <StoryLibrary
                stories={stories}
                onSelectStory={(selStory) => setActiveStory(selStory)}
                onNavigateToCreator={() => setActiveTab('creator')}
              />
            </motion.div>
          ) : (
            /* AI story formulating wizard page */
            <motion.div
              key="story-creator-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <StoryCreator onStoryCreated={handleStoryCreated} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Humble educational quote footer */}
      <footer className="mt-16 text-center text-xs text-slate-400 tracking-wide px-4 leading-relaxed" dir="rtl">
        <p>بني بكل فخر بمساعدة الذكاء الاصطناعي التفاعلي للأطفال</p>
        <p className="mt-1 text-[11px] text-slate-400">
          يمكن لأطفالنا وعائلاتنا تنمية مهارات القراءة، والتعاون، والمنطق العلمي من خلال التفاعل مع العناصر والقصص التعليمية الموجهة.
        </p>
      </footer>
    </div>
  );
}
