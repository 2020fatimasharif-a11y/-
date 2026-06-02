export interface ClickableElement {
  id: string;
  emoji: string;
  label: string;
  x: number; // percentage from left
  y: number; // percentage from top
  soundType: 'pop' | 'chime' | 'boing' | 'sparkle' | 'whoosh';
  animation: 'bounce' | 'spin' | 'wiggle' | 'scale';
}

export interface Page {
  pageNumber: number;
  text: string;
  illustrationType: 'bee_garden' | 'rabbit_moon' | 'water_cycle' | 'custom_adventure' | 'forest' | 'desert' | 'space' | 'sea_deep';
  interactiveElements: ClickableElement[];
  educationalFact?: string; // a small "did you know?" tip on the page
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  category: string; // e.g., "التعاون", "العلوم", "الأخلاق", "البيئة"
  coverEmoji: string;
  pages: Page[];
  quiz: Quiz;
  isAiGenerated?: boolean;
}
