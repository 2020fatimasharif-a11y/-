import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Story } from '../types';
import { sfx } from '../utils/audio';

interface StoryCreatorProps {
  onStoryCreated: (newStory: Story) => void;
}

const TOPICS = [
  { id: 'honesty', title: 'الصدق والأمانة 💎', text: 'أهمية الصدق والمحافظة على الوعود بأمانة ولطف.' },
  { id: 'cooperation', title: 'التعاون والمشاركة 🤝', text: 'مشاركة الألعاب ومساعدة الرفاق في المهام الصعبة.' },
  { id: 'space', title: 'مغامرات الفضاء 🚀', text: 'رحلة استكشاف بين الكواكب، النجوم ومركبات الفضاء.' },
  { id: 'ocean', title: 'أعماق البحار 🐬', text: 'اكتشاف المرجان، الكائنات البحرية المتنوعة وحماية البحر.' },
  { id: 'nature', title: 'حماية البيئة 🌳', text: 'الحفاظ على الأشجار، تنظيف الحدائق وتوفير المياه العذبة.' },
];

const COMPANIONS = [
  { id: 'بومة حكيمة', name: 'بومة حكيمة', emoji: '🦉', desc: 'تساعد البطل بمعلومات ذكية وأفكار رائعة.' },
  { id: 'شبل شجاع', name: 'شبل شجاع', emoji: '🦁', desc: 'يعطي البطل الثقة والشجاعة لتخطي التحديات.' },
  { id: 'دلفين بطل', name: 'دلفين بطل', emoji: '🐬', desc: 'يرشد البطل في السباحة وتخطي أمواج البحار.' },
  { id: 'دب الباندا الطيب', name: 'ديكو الباندا الطيب', emoji: '🐼', desc: 'ينشر البهجة والمحبة ويأكل الخيزران الأخضر.' },
  { id: 'ديناصور وديع', name: 'رينغو الديناصور', emoji: '🦖', desc: 'يحب السفر وحل الألواح الحجرية القديمة.' },
];

const LOADING_STEPS = [
  'جاري شحذ القلم السحري وتجهيز الورق اللامع... ✏️✨',
  'جاري خلط ألوان الغابات وتلوين قوس قزح البهيج... 🎨🌈',
  'مرافقتك اللطيفة تصنع الأفكار وتوزع النجوم... 🌟🦉',
  'جاري نسج معاني الأخلاق وبناء اللغز في ختام القصة... 🧩🧠',
  'قاربت القصة السحرية على الاكتمال، استعد للمغامرة... 🚀📖',
];

export const StoryCreator: React.FC<StoryCreatorProps> = ({ onStoryCreated }) => {
  const [childName, setChildName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('cooperation');
  const [selectedCompanion, setSelectedCompanion] = useState('بومة حكيمة');
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Rotate loading instructions visually for children
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 3500);
    } else {
      setLoadingStepIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playChime();
    setLoading(true);
    setErrorText(null);

    const activeTopic = TOPICS.find(t => t.id === selectedTopic)?.title || 'التعاون';
    const activeCompanion = COMPANIONS.find(c => c.id === selectedCompanion)?.name || 'بومة حكيمة';

    try {
      const response = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: childName || 'الصغير الشجاع',
          topic: activeTopic,
          companion: activeCompanion,
        }),
      });

      if (!response.ok) {
        throw new Error('لم يكتمل غزل تفاصيل القصة من خادم السحر الفكري.');
      }

      const generatedData: Story = await response.json();
      sfx.playSparkle();
      onStoryCreated(generatedData);
    } catch (err: any) {
      console.error(err);
      sfx.playError();
      setErrorText(
        'أوه! يبدو أن منشار الأفكار السحري قد تعثر قليلاً. يرجى التحقق من اتصال الشبكة وإعادة المحاولة مجدداً!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-4 border-dashed border-yellow-450 max-w-4xl mx-auto font-sans text-slate-800">
      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-right"
            dir="rtl"
          >
            {/* Creator Title */}
            <div className="text-center mb-6">
              <span className="text-4xl inline-block drop-shadow-md select-none animate-pulse">🪄</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-2">
                صانع الحكايات السحري بالذكاء الاصطناعي
              </h2>
              <p className="text-xs md:text-sm text-stone-500 mt-1.5 max-w-2xl mx-auto leading-relaxed">
                صمم مغامرتك الخاصة بثوانٍ معدودة! اختر اسمك، موضوعك، ورفيقك المفضل وسيكتب الذكاء الاصطناعي قصة مخصصة ومدعومة بالرسوم والأسئلة التعليمية لنمو طفلك الفكري.
              </p>
            </div>

            {errorText && (
              <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-2xl text-sm font-semibold text-center animate-bounce">
                ⚠️ {errorText}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Adventurer Name input */}
              <div>
                <label className="block text-sm md:text-base font-black text-[#1a2b3c] mb-2.5">
                  👶 اسم بطل القصة الرئيسي (أو اسم طفلك اللطيف):
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="مثال: يوسف البطل، فاطمة الذكية..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-stone-200 focus:border-yellow-450 focus:ring-4 focus:ring-yellow-400/10 outline-none text-base md:text-lg text-[#1a2b3c] bg-stone-50/50 font-bold"
                />
              </div>

              {/* Story educational category selection */}
              <div>
                <label className="block text-sm md:text-base font-black text-[#1a2b3c] mb-3">
                  🎯 العبرة الأخلاقية أو هدف المغامرة الشيق:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOPICS.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => {
                        sfx.playPop();
                        setSelectedTopic(topic.id);
                      }}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between h-auto text-right ${
                        selectedTopic === topic.id
                          ? 'border-[#4a148c] bg-purple-50/40 shadow-md ring-2 ring-purple-200/50'
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <h4 className="font-extrabold text-slate-900 text-sm md:text-base">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-stone-550 mt-1 lines-clamp-2 leading-relaxed">
                        {topic.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Companion selector */}
              <div>
                <label className="block text-sm md:text-base font-black text-[#1a2b3c] mb-3">
                  🦉 اختر رفيقك الخيالي للمساعدة في الرحلة:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {COMPANIONS.map((companion) => (
                    <div
                      key={companion.id}
                      onClick={() => {
                        sfx.playBoing();
                        setSelectedCompanion(companion.id);
                      }}
                      className={`cursor-pointer p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                        selectedCompanion === companion.id
                          ? 'border-yellow-450 bg-amber-50 shadow-md scale-105'
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:scale-102'
                      }`}
                    >
                      <span className="text-4xl drop-shadow-sm select-none">{companion.emoji}</span>
                      <span className="text-xs md:text-sm font-extrabold text-slate-800 mt-2 block">
                        {companion.name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-2.5 text-center font-medium">
                  * مرافقك اللطيف سيوجهك بالحلول الذكية والتشجيع المستمر لحل الأحجيات النهائية!
                </p>
              </div>

              {/* Action Submit Button */}
              <div className="pt-3 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-[#1a2b3c] font-black text-base md:text-lg rounded-2xl shadow-lg shadow-yellow-400/20 border-b-4 border-yellow-600 focus:outline-none cursor-pointer flex items-center gap-2 justify-center mx-auto transition-all"
                >
                  <span>ابسط غطاء الأفكار واصنع قصتي الآن! ✨🚀</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Magical loading state for children */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            {/* Spinning/pulsating magical tool graphic */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-24 h-24 border-4 border-dashed border-yellow-410 rounded-full flex items-center justify-center scale-110"
              />
              <motion.div
                animate={{ scale: [1, 1.25, 1], y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center text-5xl"
              >
                🪄
              </motion.div>
              <div className="absolute top-0 right-0 text-2xl animate-ping">✨</div>
              <div className="absolute bottom-1.5 left-2 text-2xl animate-bounce">🦉</div>
            </div>

            {/* Rotating text */}
            <div className="h-16 flex items-center justify-center max-w-lg">
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingStepIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                >
                  {LOADING_STEPS[loadingStepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Educational visual tip placeholder */}
            <div className="mt-8 px-6 py-4 bg-indigo-50 border border-indigo-100 rounded-2xl max-w-md">
              <h5 className="font-bold text-indigo-900 text-sm mb-1">💡 نصيحة سريعة للأمهات والآباء:</h5>
              <p className="text-xs text-indigo-700 leading-relaxed text-right" dir="rtl">
                سؤال الطفل عن مشاعره طوال قراءة القصة وتجربة نقاش اللغِّز ينميان الذكاء العاطفي، ويسهلان تأسيس السلوكات الإيجابية كالمشاركة والتعاطف!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
