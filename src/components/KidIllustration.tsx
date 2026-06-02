import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClickableElement } from '../types';
import { sfx } from '../utils/audio';

interface KidIllustrationProps {
  type: 'bee_garden' | 'rabbit_moon' | 'water_cycle' | 'custom_adventure' | 'forest' | 'desert' | 'space' | 'sea_deep';
  elements: ClickableElement[];
  onElementClick?: (element: ClickableElement) => void;
}

export const KidIllustration: React.FC<KidIllustrationProps> = ({
  type,
  elements,
  onElementClick,
}) => {
  const [clickedElementId, setClickedElementId] = useState<string | null>(null);

  const handleElementTap = (el: ClickableElement) => {
    // Play sound from the audio utility
    sfx.playByTypeName(el.soundType);
    
    // Set clicked state for feedback popup
    setClickedElementId(el.id);
    setTimeout(() => setClickedElementId(null), 1800);

    // Bubble up if listener is attached
    if (onElementClick) {
      onElementClick(el);
    }
  };

  // Select dynamic background gradient & scenery SVGs based on theme type
  const renderScenery = () => {
    switch (type) {
      case 'bee_garden':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#e3fdfd] to-[#ffe6eb] overflow-hidden rounded-2xl border-4 border-amber-300">
            {/* Sun in background */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute -top-10 -right-10 w-28 h-28 bg-yellow-300 rounded-full blur-sm opacity-60"
            />
            {/* Rolling green hills */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-emerald-200 rounded-t-[100px] opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-300 rounded-t-[120px]" />
            {/* Fluffy clouds */}
            <motion.div 
              animate={{ x: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-8 left-[10%] text-4xl opacity-50 select-none"
            >
              ☁️
            </motion.div>
            <motion.div 
              animate={{ x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-14 right-[15%] text-5xl opacity-40 select-none"
            >
              ☁️
            </motion.div>
            {/* Flowers background */}
            <div className="absolute bottom-4 left-[15%] text-2xl animate-pulse">🌸</div>
            <div className="absolute bottom-6 right-[20%] text-3xl animate-bounce">🌻</div>
            <div className="absolute bottom-3 left-[40%] text-2xl">🌷</div>
          </div>
        );

      case 'rabbit_moon':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#311042] overflow-hidden rounded-2xl border-4 border-indigo-400">
            {/* Twinkling stars */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: i * 0.2 }}
                className="absolute text-yellow-300 text-xs"
                style={{ top: `${(i * 7 + 10) % 65}%`, left: `${(i * 11 + 5) % 90}%` }}
              >
                ✦
              </motion.div>
            ))}
            {/* Large Glowing Moon */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-8 left-12 w-20 h-20 bg-amber-100 rounded-full shadow-[0_0_25px_rgba(253,244,152,0.6)] flex items-center justify-center border border-yellow-100"
            >
              <div className="w-4 h-4 bg-amber-200/50 rounded-full absolute top-4 right-4" />
              <div className="w-3 h-3 bg-amber-200/50 rounded-full absolute bottom-4 left-5" />
            </motion.div>
            {/* Silhouetted hills */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900 rounded-t-[80px]" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-indigo-950 rounded-t-[100px] opacity-90" />
            <div className="absolute bottom-4 right-[10%] text-xl emoji">🌳</div>
          </div>
        );

      case 'water_cycle':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#b9e0ff] via-[#e8f1f5] to-[#fbc5cd] overflow-hidden rounded-2xl border-4 border-blue-300">
            {/* Smiling Sun with mild rotation */}
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 10 }}
              className="absolute top-4 right-6 text-5xl"
            >
              ☀️
            </motion.div>
            {/* Water clouds */}
            <div className="absolute top-10 left-[15%] text-6xl opacity-70">🌧️</div>
            <div className="absolute top-14 left-[40%] text-5xl opacity-60">☁️</div>
            {/* Little puddles at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-sky-200 rounded-t-[60px]" />
            <div className="absolute bottom-0 left-[20%] w-40 h-8 bg-sky-300 rounded-full" />
            {/* Green sprouts */}
            <div className="absolute bottom-3 left-[15%] text-2xl animate-bounce">🌱</div>
            <div className="absolute bottom-3 right-[25%] text-3xl">🌿</div>
          </div>
        );

      case 'forest':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#e3fdf5] to-[#ffe6e6] overflow-hidden rounded-2xl border-4 border-emerald-400">
            {/* Beautiful tree assets */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-800 rounded-t-[120px] opacity-90" />
            <div className="absolute bottom-0 left-[-10%] w-[60%] h-32 bg-emerald-700/80 rounded-t-full" />
            <div className="absolute bottom-0 right-[-10%] w-[50%] h-28 bg-green-700/80 rounded-t-full" />
            {/* Woodland creatures details */}
            <div className="absolute bottom-2 left-[25%] text-2xl">🍄</div>
            <div className="absolute bottom-4 right-[35%] text-2xl">🍄</div>
            <div className="absolute top-8 left-[30%] text-3xl opacity-30">☁️</div>
          </div>
        );

      case 'desert':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#ffeed0] via-[#fcd34d] to-[#f59e0b] overflow-hidden rounded-2xl border-4 border-orange-400">
            {/* Radiant sun setting */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute bottom-16 left-[40%] w-20 h-20 bg-red-400 rounded-full opacity-40 blur-sm"
            />
            {/* Sand dunes */}
            <div className="absolute bottom-0 left-[-20%] w-[80%] h-24 bg-[#eab308] rounded-tr-[120px] transform rotate-3" />
            <div className="absolute bottom-0 right-[-20%] w-[80%] h-20 bg-[#ca8a04] rounded-tl-[150px] transform -rotate-3" />
            <div className="absolute bottom-3 right-[15%] text-3xl">🌵</div>
            <div className="absolute bottom-2 left-[10%] text-2xl">🐫</div>
          </div>
        );

      case 'space':
        return (
          <div className="absolute inset-0 bg-[#0c0a09] bg-gradient-to-b from-[#180828] via-[#090514] to-[#030108] overflow-hidden rounded-2xl border-4 border-purple-500">
            {/* Stars */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.1, 1, 0.1] }}
                transition={{ repeat: Infinity, duration: 1.5 + (i % 2), delay: i * 0.1 }}
                className="absolute text-xs"
                style={{
                  top: `${(i * 9 + 4) % 70}%`,
                  left: `${(i * 7 + 13) % 95}%`,
                  color: i % 2 === 0 ? '#a855f7' : '#e9d5ff'
                }}
              >
                ✦
              </motion.div>
            ))}
            {/* Big Saturn planet background */}
            <div className="absolute -top-6 -left-6 text-7xl opacity-30 select-none swing">🪐</div>
            {/* Distant swirling galaxy */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="absolute top-[25%] right-[10%] w-24 h-24 border border-purple-500/10 rounded-full border-dashed"
            />
          </div>
        );

      case 'sea_deep':
        return (
          <div className="absolute inset-0 bg-[#041d3d] bg-gradient-to-b from-[#032b53] via-[#041a30] to-[#010b14] overflow-hidden rounded-2xl border-4 border-blue-500">
            {/* Bubbles floating up */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 220, opacity: 0.1 }}
                animate={{ y: [-10, 220], opacity: [0.8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6 + (i % 4),
                  delay: i * 0.8,
                  ease: "linear"
                }}
                className="absolute w-3 h-3 border border-cyan-400/50 rounded-full"
                style={{ left: `${(i * 14 + 10) % 90}%` }}
              />
            ))}
            {/* Corals at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-indigo-950/70 rounded-t-[40px]" />
            <div className="absolute bottom-1 left-[15%] text-2xl">🌱</div>
            <div className="absolute bottom-2 right-[20%] text-3xl filter saturate-150">🪸</div>
            <div className="absolute bottom-2 left-[50%] text-2xl">🐚</div>
          </div>
        );

      default: // default custom_adventure
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] overflow-hidden rounded-2xl border-4 border-sky-300">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-sky-200/50 rounded-t-[80px]" />
            <div className="absolute top-10 left-[10%] text-4xl opacity-30">☁️</div>
            <div className="absolute top-4 right-[15%] text-5xl opacity-40">☀️</div>
          </div>
        );
    }
  };

  const getAnimationProps = (animType: ClickableElement['animation'], elId: string) => {
    const isThisClicked = clickedElementId === elId;
    
    if (isThisClicked) {
      // Exaggerated comic animation when active/pressed
      return {
        scale: [1, 1.4, 0.9, 1.1, 1],
        rotate: [0, 20, -20, 10, -10, 0],
        transition: { duration: 0.8, ease: "easeInOut" }
      };
    }

    // Gentle passive idle loops for children entertainment
    switch (animType) {
      case 'bounce':
        return {
          y: [0, -8, 0],
          transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
        };
      case 'spin':
        return {
          rotate: [0, 360],
          transition: { repeat: Infinity, duration: 5, ease: "linear" }
        };
      case 'wiggle':
        return {
          rotate: [0, 6, -6, 0],
          transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
        };
      case 'scale':
        return {
          scale: [1, 1.06, 1],
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] max-w-full rounded-2xl shadow-xl select-none m-0 p-0 overflow-hidden">
      {renderScenery()}

      {/* Layer for Clickable Interactive Elements */}
      <div className="absolute inset-0 z-10">
        {elements.map((el) => {
          const isClickedNow = clickedElementId === el.id;
          return (
            <div
              key={el.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{ left: `${el.x}%`, top: `${el.y}%` }}
              onClick={() => handleElementTap(el)}
              id={`el-${el.id}`}
            >
              <div className="relative flex flex-col items-center">
                {/* Visual ripple effect ring for baby helper prompts */}
                <span className="absolute inset-0 w-12 h-12 bg-white/20 rounded-full scale-110 animate-ping opacity-30 pointer-events-none" />
                
                {/* Animated emoji symbol */}
                <motion.div
                  animate={getAnimationProps(el.animation, el.id)}
                  className={`text-5xl md:text-6xl drop-shadow-lg select-none filter active:scale-95 duration-75`}
                >
                  {el.emoji}
                </motion.div>

                {/* Comic speech bubble label appearing on active interaction */}
                <AnimatePresence>
                  {(isClickedNow || clickedElementId === null) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`mt-1.5 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-sans font-semibold tracking-wide text-center uppercase shadow-sm select-none border whitespace-nowrap transition-all duration-300
                        ${isClickedNow 
                          ? 'bg-amber-400 text-amber-950 border-amber-300 font-bold scale-115' 
                          : 'bg-white/85 text-slate-800 border-slate-100/50 group-hover:bg-white group-hover:scale-105'
                        }
                      `}
                    >
                      {el.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Playful hint text overlays */}
      <div className="absolute top-2.5 left-3 bg-white/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium text-slate-700 z-10 flex items-center gap-1 border border-white/50">
        <span>👉</span>
        <span>اضغط على العناصر واستمع للأصوات!</span>
      </div>
    </div>
  );
};
