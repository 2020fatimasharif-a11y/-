import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI client with server secret
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Gemini Story Generation Endpoint
app.post("/api/stories/generate", async (req, res) => {
  try {
    const { childName, topic, companion } = req.body;

    const name = childName ? childName.trim() : "الصغير";
    const storyTopic = topic || "التعاون";
    const storyCompanion = companion || "أرنوب";

    const prompt = `أريدك أن تؤلف قصة تفاعلية ممتازة للأطفال باللغة العربية الفصحى المبسطة والمعكولة بالحركات (تشكيل بسيط للحروف ليسهل القراءة)، بطلها الطفل/الطفلة اسمه "${name}" بمساعدة مرافقه اللطيف وسيكون "${storyCompanion}".
الموضوع أو العبرة التعليمية للقصة: "${storyTopic}".

يجب أن تتكون القصة من ٣ صفحات بالضبط. كل صفحة تتناول جزءاً مشوقاً تزداد فيه التفاصيل بشكل بسيط وينتهي بنصيحة أو معلومة مضحكة ومثقفة للأطفال، مع الحرص على أن ينتهي كل شيء بسؤال تقييمي (quiz) في نهاية القصة يناسب عقول الأطفال الصغار (أعمار 4-9 سنوات) مع إجابة صحيحة وتفسير تشجيعي بابتسامة.`;

    const systemInstruction = 
      "أنت مؤلف قصص معتمد ومختص بكتب الأطفال الرقمية التفاعلية. تؤلف قصصاً تعليمية مشوقة جداً باللغة العربية بأسلوب مبهج وصديق للطفل. تلتزم تماماً بالقالب اللغوي المهذب والمفعم بالتشجيع، وتستخدم تعابير مضحكة أحياناً لجلب الانتباه. تهتم بالجانب الفكري والمعرفي والتطوري لعقلية الصغير.";

    const schema = {
      type: Type.OBJECT,
      properties: {
        title: { 
          type: Type.STRING, 
          description: "عنوان القصة المشوق والبارز واللطيف ومعه إيموجي مميز." 
        },
        description: { 
          type: Type.STRING, 
          description: "ملخص مبهج وبسيط للقصة محبوك في سطر أو سطرين لمساعدة الأهل في قراءته للطفل." 
        },
        category: { 
          type: Type.STRING, 
          description: "العبرة أو التصنيف التعليمي الرئيسي للقصة في كلمتين كحد أقصى (مثال: التعاون، الصدق)." 
        },
        coverEmoji: { 
          type: Type.STRING, 
          description: "إيموجي واحد فائق التعبير لغلاف القصة يمثل البطل أو مغامرته الكبرى." 
        },
        pages: {
          type: Type.ARRAY,
          description: "قائمة تحتوي على ٣ صفحات بالضبط دون زيادة أو نقصان.",
          items: {
            type: Type.OBJECT,
            properties: {
              pageNumber: { type: Type.INTEGER },
              text: { 
                type: Type.STRING, 
                description: "فقرة السرد الخاصة بالصفحة، تستخدم جملاً قصيرة جداً ومريحة ومضبوطة بالشكل البسيط للأطفال الصغار." 
              },
              illustrationType: { 
                type: Type.STRING, 
                description: "يجب اختيار أحد الخلفيات البصرية المناسبة تماماً للمشهد من هذه القائمة الحصرية فقط: 'forest' (غابة), 'desert' (صحراء), 'space' (فضاء), 'sea_deep' (أعماق البحر)." 
              },
              educationalFact: { 
                type: Type.STRING, 
                description: "حقيقة ممتعة جداً أو فكرة 'هل تعلم؟' تبدأ بعبارة 'هل تعلم؟...' مرتبطة بموضوع الصفحة تجعل الطفل ذكياً ومندهشاً." 
              },
              interactiveElements: {
                type: Type.ARRAY,
                description: "قائمة تحتوي على ٣ عناصر تفاعلية بالضبط موزعة جغرافياً في الصفحة ليضغط عليها الطفل فتصدر أصواتاً وحركات مبهجة.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    emoji: { 
                      type: Type.STRING, 
                      description: "إيموجي معبّر تماماً للجسم أو الرمز التفاعلي (مثال: 🍎, 🧸, 🦉, 🌟)." 
                    },
                    label: { 
                      type: Type.STRING, 
                      description: "اسم العنصر الصوتي بالعربية المبسطة لكي يربط الطفل السمع بالبصري (مثال: 'النجم الدوار'، 'شجرة تفاح')." 
                    },
                    x: { 
                      type: Type.INTEGER, 
                      description: "نسبة التموضع الأفقي من اليسار وتكون رقماً عشوائياً بين 15 و 85." 
                    },
                    y: { 
                      type: Type.INTEGER, 
                      description: "نسبة التموضع العمودي من الأعلى وتكون رقماً عشوائياً بين 20 و 75 لكي لا يتراكب مع العناصر الأخرى." 
                    },
                    soundType: { 
                      type: Type.STRING, 
                      description: "يجب اختيار أحد المؤثرات الصوتية الحصرية المناسبة: 'pop', 'chime', 'boing', 'sparkle', 'whoosh'." 
                    },
                    animation: { 
                      type: Type.STRING, 
                      description: "يجب اختيار أحد الحركات الحصرية للعنصر: 'bounce', 'spin', 'wiggle', 'scale'." 
                    }
                  },
                  required: ["id", "emoji", "label", "x", "y", "soundType", "animation"]
                }
              }
            },
            required: ["pageNumber", "text", "illustrationType", "educationalFact", "interactiveElements"]
          }
        },
        quiz: {
          type: Type.OBJECT,
          properties: {
            question: { 
              type: Type.STRING, 
              description: "سؤال تفاعلي لطيف وذكي يتعلق بالعبرة الأخلاقية أو العلمية المذكورة بالقصة." 
            },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "٣ خيارات بالضبط للحل، أحدها خيار حقيقي وصائب وخياران مضحكان أو خاطئان بطريقة مرحة."
            },
            correctAnswerIndex: { 
              type: Type.INTEGER, 
              description: "رقم الفهرس الصحيح للحل ويكون إما 0 أو 1 أو 2." 
            },
            explanation: { 
              type: Type.STRING, 
              description: "تحفيز صوتي وبصري مبهج في حال اختيار الإجابة الصحيحة لتشجيع الصغير والتأكيد على المعلومة." 
            }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      },
      required: ["title", "description", "category", "coverEmoji", "pages", "quiz"]
    };

    // Call server-side Gemini API generateContent
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 1.0,
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("No output received from Gemini API");
    }

    const generatedStory = JSON.parse(outputText.trim());
    
    // Inject a unique random ID and AI flag
    generatedStory.id = `story-ai-${Date.now()}`;
    generatedStory.isAiGenerated = true;

    res.json(generatedStory);
  } catch (error: any) {
    console.error("Gemini Story Generation Failed:", error);
    res.status(500).json({ 
      error: "فشل توليد القصة السحرية", 
      details: error.message || error 
    });
  }
});

// Configure Vite or Production Static Serving
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server runs gracefully at http://0.0.0.0:${PORT}`);
  });
}

boot();
