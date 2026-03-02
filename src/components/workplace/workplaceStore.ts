import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'kan';

interface WorkplaceGameState {
	gameStarted: boolean;
	currentRoomIndex: number;
	completedRooms: string[];
	answers: Record<number, number>; // questionId -> selected option index
	score: number;
	language: Language;
	savedToDb: boolean;

	startGame: () => void;
	resetGame: () => void;
	setLanguage: (lang: Language) => void;
	completeRoom: (roomId: string, questionId: number, answerIndex: number, points: number) => void;
	markSavedToDb: () => void;
}

export const useWorkplaceStore = create<WorkplaceGameState>()(
	persist(
		(set) => ({
			gameStarted: false,
			currentRoomIndex: 0,
			completedRooms: [],
			answers: {},
			score: 10,
			language: 'en',
			savedToDb: false,

			startGame: () =>
				set({
					gameStarted: true,
					currentRoomIndex: 0,
					completedRooms: [],
					answers: {},
					score: 10,
					savedToDb: false,
				}),

			resetGame: () =>
				set({
					gameStarted: false,
					currentRoomIndex: 0,
					completedRooms: [],
					answers: {},
					score: 10,
					savedToDb: false,
				}),

			setLanguage: (lang) => set({ language: lang }),

			completeRoom: (roomId, questionId, answerIndex, points) =>
				set((state) => ({
					completedRooms: [...state.completedRooms, roomId],
					answers: { ...state.answers, [questionId]: answerIndex },
					score: state.score + (points > 0 ? 1 : -1),
					currentRoomIndex: state.currentRoomIndex + 1,
				})),

			markSavedToDb: () => set({ savedToDb: true }),
		}),
		{
			name: 'workplace-etiquette-game',
			partialize: (state) => ({
				gameStarted: state.gameStarted,
				currentRoomIndex: state.currentRoomIndex,
				completedRooms: state.completedRooms,
				answers: state.answers,
				score: state.score,
				language: state.language,
				savedToDb: state.savedToDb,
			}),
		},
	),
);
