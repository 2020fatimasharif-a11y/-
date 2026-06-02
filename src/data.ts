import { Story } from './types';

export const STATIC_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'النحلة بسمة وزهرة الأمل',
    description: 'رحلة النحلة الصغيرة بسمة لإنقاذ زهرة الأمل الذابلة وصناعة أشهى عسل بمساعدة رفيقاتها.',
    category: 'التعاون والمشاركة',
    coverEmoji: '🐝',
    pages: [
      {
        pageNumber: 1,
        text: 'كان يا ما كان، في بستان جميل يعج بالزهور الملونة والأشجار المثمرة، تعيش نحلة صغيرة ونشيطة اسمها بسمة. كانت بسمة تحب الطيران برأسها الذهبي وجناحيها الرقيقين، باحثة عن أشهى رحيق لتصنع أفضل عسل حلو المذاق في البستان.',
        illustrationType: 'bee_garden',
        educationalFact: 'هل تعلم؟ النحل يقوم بهز بطنه بشكل مميز يسمى "رقصة النحل" ليخبر بقية النحلات بمكان الزهور الجميلة والمليئة بالرحيق الحامض والحلو!',
        interactiveElements: [
          { id: 'item-bee', emoji: '🐝', label: 'بسمة', x: 50, y: 35, soundType: 'boing', animation: 'bounce' },
          { id: 'item-flower1', emoji: '🌸', label: 'زهرة الأقحوان', x: 20, y: 70, soundType: 'sparkle', animation: 'wiggle' },
          { id: 'item-flower2', emoji: '🌺', label: 'زهرة الياسمين', x: 80, y: 75, soundType: 'pop', animation: 'scale' }
        ]
      },
      {
        pageNumber: 2,
        text: 'في أحد الأيام، وأثناء طيرانها، رأت بسمة تحت شجرة السدر زهرة حمراء صغيرة ذابلة وحزينة. همست الزهرة الكئيبة بصوت ضعيف: "يا صديقتي بسمة، لقد جفت قنوات الماء حولي بفعل شمس الصيف الحارة، ولم أعد قادرة على فرد أوراقي." حزنت بسمة وقررت ألا تترك صديقتها دون مساعدة.',
        illustrationType: 'bee_garden',
        educationalFact: 'هل تعلم؟ الزهور تفرح كثيراً بزيارة النحل والفراشات، لأنها تساعدها على نقل حبوب اللقاح لكي تنمو وتتكاثر النباتات الأخرى!',
        interactiveElements: [
          { id: 'item-sad-flower', emoji: '🥀', label: 'الزهرة الذابلة', x: 50, y: 70, soundType: 'boing', animation: 'wiggle' },
          { id: 'item-hot-sun', emoji: '☀️', label: 'الشمس الحارة', x: 80, y: 15, soundType: 'chime', animation: 'spin' },
          { id: 'item-cloud-empty', emoji: '☁️', label: 'غيمة بيضاء', x: 20, y: 20, soundType: 'whoosh', animation: 'bounce' }
        ]
      },
      {
        pageNumber: 3,
        text: 'طارت بسمة بسرعة ونادت رفيقاتها من خلية النحل وصديقاتها الفراشات. بنظام وتناغم عجيبين، تعاون الجميع! نقل النحل قطرات الندى الرطبة من النخيل العالي وسكبوها على الزهرة، وقامت الفراشات بتحريك الهواء بجناحيها لتخفيف الحرارة. وفجأة، انتعشت الزهرة وبدأت بتلاتها الحمراء تضحك وتتفتح من جديد!',
        illustrationType: 'bee_garden',
        educationalFact: 'هل تعلم؟ في الاتحاد قوة! بفضل التعاون والعمل الجماعي، استطاعت النحلة الصغيرة مع رفيقاتها إنجاز عمل كبير وصناعة عسل لم تكن النحلة وحدها لتقدر عليه.',
        interactiveElements: [
          { id: 'item-happy-flower', emoji: '🌹', label: 'زهرة الأمل الشابة', x: 50, y: 65, soundType: 'chime', animation: 'scale' },
          { id: 'item-butterfly', emoji: '🦋', label: 'شوشو الفراشة', x: 25, y: 35, soundType: 'sparkle', animation: 'bounce' },
          { id: 'item-honey-jar', emoji: '🍯', label: 'وعاء العسل', x: 80, y: 70, soundType: 'pop', animation: 'bounce' }
        ]
      }
    ],
    quiz: {
      question: 'ما الذي ساعد النحلة بسمة الفحلة وصديقاتها على إنقاذ زهرة الأمل الحمراء؟',
      options: [
        'الجلوس بمفردها وعدم طلب المساعدة',
        'التعاون والعمل بروح الفريق الواحد',
        'اللعب في البستان وإهمال الزهرة'
      ],
      correctAnswerIndex: 1,
      explanation: 'ممتاز! بفضل بركة التعاون والهمم العالية، استطاع الأصدقاء إنقاذ الزهرة وصناعة بيئة أجمل للجميع.'
    }
  },
  {
    id: 'story-2',
    title: 'أرنوب الشجاع ورحلة القمر',
    description: 'قصة الأرنب الفضولي أرنوب الذي يحب مراقبة النجوم ليلاً ويقرر معرفة سر تغير أشكال القمر المتنوعة.',
    category: 'الاستكشاف والعلوم',
    coverEmoji: '🌙',
    pages: [
      {
        pageNumber: 1,
        text: 'يعشق الأرنب الصغير والذكي "أرنوب" الجلوس ليلاً فوق التلة الخضراء العالية، متأملاً لمعان النجوم البعيدة. كان يصاب بالدهشة كل بضعة أيام ويتساءل بحيرة: "لماذا يتغير شكل صديقي القمر الفضي؟ أحياناً يكون رفيعاً كالموزة، وأحياناً مستديراً ككرة مضيئة ثقيلة!"',
        illustrationType: 'rabbit_moon',
        educationalFact: 'هل تعلم؟ القمر هو جارنا الأقرب في الفضاء الخارجي، وهو لا يضيء بنفسه، بل يبدو مضيئاً لأنه يعكس ضوء الشمس المتوهجة كأنها مرآة عملاقة!',
        interactiveElements: [
          { id: 'item-arnoub', emoji: '🐰', label: 'أرنوب الفضولي', x: 30, y: 70, soundType: 'boing', animation: 'bounce' },
          { id: 'item-star1', emoji: '⭐', label: 'نجمة ساطعة', x: 75, y: 20, soundType: 'sparkle', animation: 'spin' },
          { id: 'item-star2', emoji: '✨', label: 'بريق سماوي', x: 15, y: 15, soundType: 'sparkle', animation: 'bounce' }
        ]
      },
      {
        pageNumber: 2,
        text: 'مرر أرنوب بيده على فروه الناعم، وقرر اختراع "منظار فلكي عجيب" بناه من أنبوب خيزران مطلي ووضع عليه عدسات زجاجية دائرية صفراء. عندما حدّق عبره، قفز فرحاً! لقد رأى جبالاً وحفراً عملاقة لم يشاهدها من قبل، واكتشف أن شكل القمر ينقسم إلى هلال، ربيع، وبدر تام.',
        illustrationType: 'rabbit_moon',
        educationalFact: 'هل تعلم؟ يدور القمر حول كوكب الأرض الحبيب مرة واحدة كل ٢٩ يوماً ونصف تقريباً، ولهذا يظهر لنا بأشكال وزوايا ضوئية مختلفة تسمى "أطوار القمر"!',
        interactiveElements: [
          { id: 'item-telescope', emoji: '🔭', label: 'منظار أرنوب', x: 60, y: 70, soundType: 'pop', animation: 'scale' },
          { id: 'item-moon-crescent', emoji: '🌙', label: 'هلال جميل', x: 25, y: 20, soundType: 'chime', animation: 'wiggle' },
          { id: 'item-earth', emoji: '🌍', label: 'كوكب الأرض', x: 80, y: 40, soundType: 'whoosh', animation: 'spin' }
        ]
      },
      {
        pageNumber: 3,
        text: 'همس القمر المنير بصوت لطيف دافئ لأرنوب المتأمل: "أنا رفيقكم المخلص دائماً يا أرنوب، أدور حول الأرض لأوزع الضياء الهادئ وأرشد المسافرين والنباتات بنظام محكم." عاد أرنوب إلى منزله الصغير سعيداً وكتب في مذكراته الأولى: "الفضول والبحث العلمي يقوداننا إلى أجمل الأسرار!"',
        illustrationType: 'rabbit_moon',
        educationalFact: 'هل تعلم؟ حاول الليلة أن تنظر من نافذة غرفتك لتراقب القمر وتخمن طوره: هل هو هلال رفيع كابتسامة، أم بدر ينير الغرفة بالكامل؟',
        interactiveElements: [
          { id: 'item-moon-full', emoji: '🌕', label: 'البدر الكامل', x: 50, y: 20, soundType: 'chime', animation: 'scale' },
          { id: 'item-book-note', emoji: '📓', label: 'مذكرات أرنوب', x: 25, y: 75, soundType: 'pop', animation: 'wiggle' },
          { id: 'item-carrot', emoji: '🥕', label: 'جزرة العشاء', x: 80, y: 75, soundType: 'boing', animation: 'bounce' }
        ]
      }
    ],
    quiz: {
      question: 'لماذا يتغير شكل القمر الذي نراه ساطعاً في الليل من كوكبنا؟',
      options: [
        'لأن هناك غيوماً تأكله ثم تظهره من جديد',
        'بسبب دوران القمر حول الأرض وتغير انعكاس ضوء الشمس الساقط عليه',
        'لأنه يتعب وينطمس ضوؤه ليستريح'
      ],
      correctAnswerIndex: 1,
      explanation: 'رائع جداً! بسبب دوران القمر في الفضاء حول الأرض، تختلف الزاوية التي نرى منها الجزء المضاء بنور الشمس، وهو ما نعرفه بأطوار القمر الحيوية.'
    }
  },
  {
    id: 'story-3',
    title: 'قطرة الماء "قطورة" وسر الحياة',
    description: 'مغامرة قطرة الماء الفضولية قطورة من أعالي السماء إلى حقول القمح الندية لتكتشف دورة الحياة العظيمة.',
    category: 'البيئة والطبيعة',
    coverEmoji: '💧',
    pages: [
      {
        pageNumber: 1,
        text: 'عاشت قطرة الماء اللطيفة "قطورة" في قطيفة غيمة بيضاء تسرح في عباب السماء الزرقاء الشاسعة. كانت قطورة تتبادل الأحاديث الودية مع بقية صديقاتها القطرات بلهفة، قائلة: "مهمتنا عظيمة يا أصدقاء، فقد حان وقت السفر إلى الأرض العطشى لنبعث الحياة في بساتين الأطفال والسهول!"',
        illustrationType: 'water_cycle',
        educationalFact: 'هل تعلم؟ كل شيء حي على هذا الكوكب، من الفيل الضخم إلى أصغر وردة في الفناء، مليء بالماء ليتمكن من التنفس والنمو والبقاء حياً وبصحة ممتازة!',
        interactiveElements: [
          { id: 'item-droplet', emoji: '💧', label: 'قطورة', x: 45, y: 25, soundType: 'pop', animation: 'bounce' },
          { id: 'item-cloud1', emoji: '☁️', label: 'الغيمة القطنية', x: 75, y: 20, soundType: 'whoosh', animation: 'wiggle' },
          { id: 'item-shining-star', emoji: '✨', label: 'طاقة النقاء', x: 15, y: 20, soundType: 'sparkle', animation: 'scale' }
        ]
      },
      {
        pageNumber: 2,
        text: 'هطلت الأمطار الغزيرة برفق ومحبة، وهبطت قطورة على سنبلة قمح خضراء كانت قد مالت من العطش في سهل واسع. تشرّبت الجذور قطورة بعمق، لترتفع داخل السنبلة وتردد الأخيرة شاكرة: "شكراً لك والغيوم يا قطورة! دونك ودون الأخوات الماطرات لن ينمو قمحنا ولن يأكل الأطفال أرغفة الخَبز اللذيذة."',
        illustrationType: 'water_cycle',
        educationalFact: 'هل تعلم؟ المياه العذبة التي نعتمد عليها للشرب والزراعة تمثل جزءاً صغيراً جداً على كوكب الأرض، فالغالبية العظمى تكمن في البحار والمحيطات المالحة وبحيرات الجليد!',
        interactiveElements: [
          { id: 'item-wheat', emoji: '🌾', label: 'سنبلة قمح عطشى', x: 60, y: 70, soundType: 'sparkle', animation: 'wiggle' },
          { id: 'item-watering-can', emoji: '🚿', label: 'رشات المطر', x: 30, y: 35, soundType: 'whoosh', animation: 'bounce' },
          { id: 'item-green-plant', emoji: '🌱', label: 'برعم صغير', x: 15, y: 75, soundType: 'chime', animation: 'scale' }
        ]
      },
      {
        pageNumber: 3,
        text: 'بعد أيام، ومع تسلل أشعة الشمس الذهبية الدافئة، شعرت قطورة بالخفة وصعدت كبخار ماء دافئ لطيف وغير مرئي لتعود إلى غيمتها المحبوبة، مكملة دورة مائية متكاملة ومستمرة. وقبل أن تصعد، لوحت بقطراتها منبهة: "أصدقائي الصغار، أنا سر حياتكم وسر جمال الأرض، حافظوا علي دائماً ولا تسرفوا في هدر المياه!"',
        illustrationType: 'water_cycle',
        educationalFact: 'هل تعلم؟ دورة المياه تعزز كرتنا الأرضية منذ ملايين السنين بتنقية وإعادة تجميع نفس قطرات المياه عبر البخار والأمطار، فسبحان الخالق العظيم!',
        interactiveElements: [
          { id: 'item-warm-sun', emoji: '☀️', label: 'الشمس الذهبية', x: 75, y: 20, soundType: 'chime', animation: 'spin' },
          { id: 'item-rainbow', emoji: '🌈', label: 'قوس قزح البهيج', x: 25, y: 15, soundType: 'sparkle', animation: 'wiggle' },
          { id: 'item-faucet', emoji: '💧', label: 'قطرة النقاء العائدة', x: 45, y: 55, soundType: 'pop', animation: 'bounce' }
        ]
      }
    ],
    quiz: {
      question: 'ما هي الرسالة الهامة واللطيفة التي تركتها لنا قطورة في ختام مغامرتها؟',
      options: [
        'أن نلعب بخراطيم المياه طويلاً ونهدرها',
        'أن نحمي المياه ونرشد استهلاكها في حياتنا اليومية فهي شريان الحياة',
        'عدم شرب الماء والاكتفاء بالعصير الحلو'
      ],
      correctAnswerIndex: 1,
      explanation: 'أحسنتم يا أحبابنا! المحافظة على الماء واجب على كل كبير وصغير لكي نضمن حياة بيئية مستقرة ونسقي الكائنات الجميلة.'
    }
  }
];
