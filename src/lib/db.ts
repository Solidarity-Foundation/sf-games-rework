/**
 * Database functions for game analytics using Appwrite.
 * Syncs across devices and persists in the cloud.
 */

import { databases, config, ID, Query } from './appwrite';

export interface GameSessionData {
	gameId: string;
	totalQuestions: number;
	questionsAnswered: number;
	score?: number;
	level?: string;
	answers?: Array<{ questionId: number; answerIndex: number; pointsEarned: number }>;
}

export interface SessionRecord {
	id: string;
	game_id: string;
	played_at: number;
	total_questions: number;
	questions_answered: number;
	score: number | null;
	level: string | null;
}

export interface GameStat {
	game_id: string;
	attempts: number;
	avg_score: number | null;
	correct_rate: number;
}

export interface AnswerCount {
	question_id: number;
	answer_index: number;
	count: number;
}

const ALL_GAME_IDS = ['posh', 'inclusion-diversity', 'financial-literacy', 'workplace-etiquette'];

export async function saveGameSession(data: GameSessionData): Promise<void> {
	const now = Date.now();

	// Create game session document
	const session = await databases.createDocument(
		config.databaseId,
		config.gameSessionsCollectionId,
		ID.unique(),
		{
			game_id: data.gameId,
			played_at: now,
			total_questions: data.totalQuestions,
			questions_answered: data.questionsAnswered,
			score: data.score ?? null,
			level: data.level ?? null,
		}
	);

	// Create answer documents if provided
	if (data.answers && data.answers.length > 0) {
		const answerPromises = data.answers.map((ans) =>
			databases.createDocument(config.databaseId, config.gameAnswersCollectionId, ID.unique(), {
				session_id: session.$id,
				question_id: ans.questionId,
				answer_index: ans.answerIndex,
				points_earned: ans.pointsEarned,
			})
		);
		await Promise.all(answerPromises);
	}
}

export async function querySessions(filters: { gameId?: string; since?: number } = {}): Promise<SessionRecord[]> {
	const queries: string[] = [];

	if (filters.gameId) {
		queries.push(Query.equal('game_id', filters.gameId));
	}
	if (filters.since !== undefined) {
		queries.push(Query.greaterThanEqual('played_at', filters.since));
	}

	queries.push(Query.orderAsc('played_at'));
	queries.push(Query.limit(1000)); // Adjust limit as needed

	const response = await databases.listDocuments(config.databaseId, config.gameSessionsCollectionId, queries);

	return response.documents.map((doc) => ({
		id: doc.$id,
		game_id: doc.game_id,
		played_at: doc.played_at,
		total_questions: doc.total_questions,
		questions_answered: doc.questions_answered,
		score: doc.score,
		level: doc.level,
	}));
}

export async function queryAllGameStats(filters: { gameId?: string; since?: number } = {}): Promise<GameStat[]> {
	// Get all sessions
	const sessions = await querySessions(filters);

	// Get all answers for these sessions
	const sessionIds = sessions.map((s) => s.id);
	let allAnswers: any[] = [];

	if (sessionIds.length > 0) {
		// Appwrite Query.equal has a limit, so we might need to batch
		const batchSize = 100;
		for (let i = 0; i < sessionIds.length; i += batchSize) {
			const batch = sessionIds.slice(i, i + batchSize);
			const response = await databases.listDocuments(config.databaseId, config.gameAnswersCollectionId, [
				Query.equal('session_id', batch),
				Query.limit(10000),
			]);
			allAnswers = allAnswers.concat(response.documents);
		}
	}

	// Build a map of session_id -> answers
	const answersBySession: Record<string, any[]> = {};
	allAnswers.forEach((ans) => {
		if (!answersBySession[ans.session_id]) answersBySession[ans.session_id] = [];
		answersBySession[ans.session_id].push(ans);
	});

	// Group sessions by game_id
	const sessionsByGame: Record<string, SessionRecord[]> = {};
	sessions.forEach((session) => {
		if (!sessionsByGame[session.game_id]) sessionsByGame[session.game_id] = [];
		sessionsByGame[session.game_id].push(session);
	});

	// Calculate stats per game
	const stats: GameStat[] = [];
	const gameIds = filters.gameId ? [filters.gameId] : ALL_GAME_IDS;

	gameIds.forEach((gameId) => {
		const gameSessions = sessionsByGame[gameId] || [];
		const attempts = gameSessions.length;

		if (attempts === 0) {
			stats.push({ game_id: gameId, attempts: 0, avg_score: null, correct_rate: 0 });
			return;
		}

		// Calculate avg_score
		const scoredSessions = gameSessions.filter((s) => s.score !== null);
		const avg_score =
			scoredSessions.length > 0
				? Math.round((scoredSessions.reduce((sum, s) => sum + s.score!, 0) / scoredSessions.length) * 10) / 10
				: null;

		// Calculate correct_rate (% of correct answers)
		const gameAnswers = gameSessions.flatMap((s) => answersBySession[s.id] || []);
		const totalAnswers = gameAnswers.length;
		const correctAnswers = gameAnswers.filter((a) => a.points_earned > 0).length;
		const correct_rate = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 1000) / 10 : 0;

		stats.push({ game_id: gameId, attempts, avg_score, correct_rate });
	});

	return stats;
}

export async function queryAnswerCounts(gameId: string, filters: { since?: number } = {}): Promise<AnswerCount[]> {
	// Get sessions for this game
	const sessions = await querySessions({ gameId, since: filters.since });
	const sessionIds = sessions.map((s) => s.id);

	if (sessionIds.length === 0) return [];

	// Get all answers for these sessions
	let allAnswers: any[] = [];
	const batchSize = 100;
	for (let i = 0; i < sessionIds.length; i += batchSize) {
		const batch = sessionIds.slice(i, i + batchSize);
		const response = await databases.listDocuments(config.databaseId, config.gameAnswersCollectionId, [
			Query.equal('session_id', batch),
			Query.limit(10000),
		]);
		allAnswers = allAnswers.concat(response.documents);
	}

	// Count answers by (question_id, answer_index)
	const counts: Record<string, AnswerCount> = {};
	allAnswers.forEach((ans) => {
		const key = `${ans.question_id}-${ans.answer_index}`;
		if (!counts[key]) {
			counts[key] = {
				question_id: ans.question_id,
				answer_index: ans.answer_index,
				count: 0,
			};
		}
		counts[key].count++;
	});

	return Object.values(counts).sort((a, b) => {
		if (a.question_id !== b.question_id) return a.question_id - b.question_id;
		return a.answer_index - b.answer_index;
	});
}
