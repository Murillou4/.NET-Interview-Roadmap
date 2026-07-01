export type StudyStatus = 'não estudado' | 'estudando' | 'aprendido' | 'revisar';

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface StudyTerm {
  id: string; // Camelcase or lowercase string representation of the name
  name: string;
  level: 'básico' | 'intermediário' | 'avançado';
  category: string;
  simpleExplanation: string;
  interviewExplanation: string;
  practicalExample: string;
  whenToUse: string;
  commonErrors: string[];
  interviewQuestion: string;
  shortInterviewAnswer: string;
  betterInterviewAnswer: string;
  tags: string[];
  quiz: QuizQuestion;
}

export interface RoadmapStep {
  id: number;
  title: string;
  categoryName: string;
  description: string;
  recommendedDuration: string;
  termIds: string[];
}

export interface SimulatorQuestion {
  id: string;
  question: string;
  idealShortAnswer: string;
  idealCompleteAnswer: string;
  expectedPoints: string[];
  category: string;
}

export interface UserProgress {
  termStatus: Record<string, StudyStatus>;
  termConfidence: Record<string, number>; // 1 to 5
  simulatorPerformance: Record<string, 'errei' | 'mais_ou_menos' | 'acertei'>;
  simulatorDrafts: Record<string, string>;
  simulatorCurrentQuestionId: string | null;
}

