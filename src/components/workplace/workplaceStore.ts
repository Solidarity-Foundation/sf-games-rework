import { create } from 'zustand';

export type Language = 'en' | 'kan';

interface WorkplaceGameState {
  gameStarted: boolean;
  currentRoomIndex: number;
  completedRooms: string[];
  answers: Record<number, number>; // questionId -> selected option index
  score: number;
  language: Language;

  startGame: () => void;
  resetGame: () => void;
  setLanguage: (lang: Language) => void;
  completeRoom: (roomId: string, questionId: number, answerIndex: number, points: number) => void;
}

export const useWorkplaceStore = create<WorkplaceGameState>((set) => ({
  gameStarted: false,
  currentRoomIndex: 0,
  completedRooms: [],
  answers: {},
  score: 10,
  language: 'en',

  startGame: () =>
    set({
      gameStarted: true,
      currentRoomIndex: 0,
      completedRooms: [],
      answers: {},
      score: 10,
    }),

  resetGame: () =>
    set({
      gameStarted: false,
      currentRoomIndex: 0,
      completedRooms: [],
      answers: {},
      score: 10,
    }),

  setLanguage: (lang) => set({ language: lang }),

  completeRoom: (roomId, questionId, answerIndex, points) =>
    set((state) => ({
      completedRooms: [...state.completedRooms, roomId],
      answers: { ...state.answers, [questionId]: answerIndex },
      score: state.score + points,
      currentRoomIndex: state.currentRoomIndex + 1,
    })),
}));
